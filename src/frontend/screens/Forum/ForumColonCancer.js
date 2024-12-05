import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

// Initialiser Firestore
const db = getFirestore();

const ForumColonCancer = () => {
  const [message, setMessage] = useState('');
  const [forumColon, setForumColon] = useState([]); // Changer ici de posts en forumColon
  const [currentUser, setCurrentUser] = useState(null);
  const [replyTo, setReplyTo] = useState(null); // Message being replied to

  // Récupérer les posts à partir de Firestore
  const fetchPosts = () => {
    const postsCollection = collection(db, 'ForumColon'); // Utilisation de la collection ForumColon
    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedPosts.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      setForumColon(fetchedPosts); // Mettre à jour l'état avec les posts récupérés
    });
    return unsubscribe;
  };

  // Récupérer l'utilisateur courant
  const fetchCurrentUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    setCurrentUser(user);
  };

  // Fonction pour publier un message
  const handlePost = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const username = user ? user.displayName || user.email : 'Anonymous';

    if (message.trim() !== '') {
      await addDoc(collection(db, 'ForumColon'), { // Ajouter le message à la collection ForumColon
        text: message,
        username: username,
        timestamp: serverTimestamp(),
        replyTo: replyTo ? replyTo.id : null, // Lier au message auquel on répond
      });
      setMessage('');
      setReplyTo(null); // Réinitialiser après publication
    }
  };

  // Fonction pour répondre à un message
  const handleReply = (post) => {
    setReplyTo(post); // Définir le message auquel répondre
    setMessage(`@${post.username} `); // Ajouter le tag dans le champ de texte
  };

  // Générer une couleur unique pour chaque utilisateur
  const generateUserColor = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 50%)`; // Générer une couleur basée sur le nom
  };

  // Récupérer l'utilisateur courant et les posts au chargement
  useEffect(() => {
    fetchCurrentUser();
    const unsubscribe = fetchPosts();
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Colon Cancer Forum</Text>

      <FlatList
        data={forumColon} // Utiliser l'état forumColon pour afficher les messages
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const timeAgo = item.timestamp?.seconds
            ? formatDistanceToNow(new Date(item.timestamp.seconds * 1000), { addSuffix: true })
            : 'Unknown time';
          const userColor = generateUserColor(item.username);
          const isCurrentUser = currentUser && (item.username === currentUser.displayName || item.username === currentUser.email);

          return (
            <View style={[styles.postContainer, isCurrentUser ? styles.currentUserPost : styles.otherUserPost]}>
              <View style={[styles.bubble, { backgroundColor: userColor }]}>
                <Text style={styles.bubbleText}>{item.username[0].toUpperCase()}</Text>
              </View>
              <View style={[styles.messageContent, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
                {item.replyTo && (
                  <Text style={styles.replyToText}>
                    Replying to: @{forumColon.find((p) => p.id === item.replyTo)?.username || 'Unknown message'}
                  </Text>
                )}
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.postText}>{item.text}</Text>
                <Text style={styles.timestamp}>{timeAgo}</Text>
                {!isCurrentUser && (
                  <TouchableOpacity onPress={() => handleReply(item)}>
                    <Text style={styles.replyButton}>Reply</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />

      {replyTo && (
        <Text style={styles.replyIndicator}>
          You are replying to @{replyTo.username}. <Text onPress={() => setReplyTo(null)} style={styles.cancelReply}>Cancel</Text>
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write your message..."
        value={message}
        onChangeText={setMessage}
        multiline={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#2c3e50' },
  postContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  currentUserPost: { flexDirection: 'row-reverse' },
  otherUserPost: { flexDirection: 'row' },
  bubble: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  bubbleText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  messageContent: { flex: 1, maxWidth: '80%', padding: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  currentUserMessage: { backgroundColor: '#d1f7c4', alignSelf: 'flex-end' },
  otherUserMessage: { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  username: { fontWeight: 'bold', color: '#2980b9', marginBottom: 5 },
  postText: { fontSize: 16, color: '#34495e' },
  timestamp: { marginTop: 5, fontSize: 12, color: '#7f8c8d', fontStyle: 'italic', alignSelf: 'flex-end' },
  input: { backgroundColor: '#ffffff', borderRadius: 8, padding: 10, marginBottom: 20, borderColor: '#ccc', borderWidth: 1, height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2980b9', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  replyToText: { fontStyle: 'italic', color: '#7f8c8d', marginBottom: 5 },
  replyButton: { color: '#2980b9', marginTop: 5, fontWeight: 'bold' },
  replyIndicator: { backgroundColor: '#dfe6e9', padding: 8, borderRadius: 5, marginBottom: 10 },
  cancelReply: { color: '#e74c3c', fontWeight: 'bold' },
});

export default ForumColonCancer;
