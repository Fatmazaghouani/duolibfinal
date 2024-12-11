import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native'; 
import { db, auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, addDoc, collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

const Feed = ({ navigation }) => {
  const [userName, setUserName] = useState(''); // Nouveau state pour stocker le nom de l'utilisateur
  const [users, setUsers] = useState([]);
  const userId = auth.currentUser?.uid;
  const [posts, setPosts] = useState([]); // Nouveau state pour les posts
  const currentUser = auth.currentUser; // Utilisateur actuellement connecté
  const [unreadDiscussionsCount, setUnreadDiscussionsCount] = useState(0); // Compteur de messages non lus
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs
        .map((doc) => ({ ...doc.data(), _id: doc.id })) // Inclure _id pour chaque utilisateur
        .filter((user) => user._id !== currentUser.uid); // Exclure l'utilisateur connecté
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return unsubscribe; // Cleanup
    }
  }, [userId]);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      where('receiverId', '==', currentUser.uid),  // Filtrer les messages destinés à l'utilisateur connecté
      where('isRead', '==', false)  // Filtrer ceux qui ne sont pas lus
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const unreadUserIds = new Set();

      snapshot.docs.forEach((doc) => {
        const senderId = doc.data().senderId; // ID de l'expéditeur
        unreadUserIds.add(senderId); // Ajouter l'ID de l'expéditeur
      });

      setUnreadDiscussionsCount(unreadUserIds.size); // Le nombre de discussions distinctes avec des messages non lus
    });

    return () => unsubscribeMessages();
  }, []);

  // Fonction pour générer une couleur aléatoire
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handlePost = async () => {
    if (text.trim()) {
      try {
        // Ajouter le message à Firestore
        await addDoc(collection(db, 'posts'), {
          message: text,
          feeling,
          likes: 0,
          timestamp: new Date(),
          userId: userId,
          email: userEmail || 'Anonymous',
        });

        // Mettre à jour l'état des posts après avoir ajouté un message
        const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(postsQuery);
        const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);

        setMessage('Message ajouté avec succès !');
        setText('');
        setFeeling(null);
        setImageUri(null);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Erreur : ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche avec l'image smalllogo.png et l'icône des messages */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image 
            source={require('../../images/smalllogo.png')} // Chemin vers ton image
            style={styles.logo} 
          />
        </TouchableOpacity>

        {/* Barre de recherche */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search for something here..."
          placeholderTextColor="#000"
        />

        {/* Icône de messagerie */}
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <View style={styles.messageIconContainer}>
            <FontAwesome5 name="comment-dots" size={20} color="#000" style={styles.messageIcon} />
            {unreadDiscussionsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadDiscussionsCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.friendsSuggestion}>Friends suggestion</Text>

      {/* Liste des utilisateurs */}
      <FlatList
        data={users}
        horizontal
        keyExtractor={(item) => item._id}  // Utilisation de _id comme clé unique
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { user: item })}>
            <View style={styles.userCard}>
              {/* Bulle colorée avec la première lettre de l'utilisateur */}
              <View style={[styles.bubble, { backgroundColor: getRandomColor() }]}>
                <Text style={styles.bubbleText}>
                  {item.name ? item.name.charAt(0).toUpperCase() : 'A'}  {/* Majuscule et première lettre */}
                </Text>
              </View>
              <Text style={styles.userName}>{item.name || 'Unnamed User'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Liste des posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}  // Utilisation de 'id' comme clé unique
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postAuthor}>{item.authorName || 'Anonymous'}</Text>
            <Text style={styles.postContent}>{item.message}</Text> {/* Assure-toi d'utiliser le bon champ */}
          </View>
        )}
      />

      {/* Barre de navigation en bas */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.bottomText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('DuoStart')}>
          <FontAwesome5 name="users" size={20} color="#000" />
          <Text style={styles.bottomText}>Duo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('MyCommunityScreen')}>
          <FontAwesome5 name="globe" size={20} color="#000" />
          <Text style={styles.bottomText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ForumScreen')}>
          <FontAwesome5 name="comments" size={20} color="#000" />
          <Text style={styles.bottomText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome5 name="bell" size={20} color="#000" />
          <Text style={styles.bottomText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user" size={20} color="#000" />
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome5 name="cogs" size={20} color="#000" />
          <Text style={styles.bottomText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',  // Fond blanc partout
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 30,
    height: 30, // Taille de l'image
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginHorizontal: 10,
  },
  messageIconContainer: {
    position: 'relative',
  },
  messageIcon: {
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  friendsSuggestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  userCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userName: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  postCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  postAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 15,
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#000',
  },
});

export default Feed;
