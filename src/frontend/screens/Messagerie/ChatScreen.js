import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import { db, auth } from '../../../backend/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, orderBy, doc, getDoc, updateDoc } from '@firebase/firestore';
import * as Notifications from 'expo-notifications';

const ChatScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [userColors, setUserColors] = useState({}); // pour stocker les couleurs des utilisateurs
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !user) return;

    // Fonction pour récupérer la couleur de l'utilisateur
    const getUserColor = async (userId) => {
      const userDoc = doc(db, 'users', userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        return docSnap.data().color; // On suppose que chaque utilisateur a un champ 'color'
      } else {
        return '#000'; // Par défaut si pas de couleur trouvée
      }
    };

    // Chargement de la couleur du destinataire (user)
    const fetchUserColor = async () => {
      const color = await getUserColor(user._id);
      setUserColors((prevState) => ({
        ...prevState,
        [user._id]: color,
      }));
    };

    fetchUserColor();

    const q = query(
      collection(db, 'messages'),
      where('receiverId', 'in', [currentUser.uid, user._id]),
      where('senderId', 'in', [currentUser.uid, user._id]),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(messagesData);

      snapshot.docs.forEach(async (doc) => {
        const messageData = doc.data();
        if (!messageData.isRead && messageData.receiverId === currentUser.uid && messageData.senderId !== currentUser.uid) {
          await updateDoc(doc.ref, { isRead: true });
        }
      });
    });

    return () => unsubscribe();
  }, [currentUser, user]);

  const getUserName = async (userId) => {
    const userDoc = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      return 'User';
    }
  };

  const handleSend = async (newMessages) => {
    const writes = newMessages.map(async (msg) => {
      const senderName = await getUserName(currentUser.uid);
      const messageRef = await addDoc(collection(db, 'messages'), {
        _id: msg._id,
        text: msg.text,
        createdAt: new Date(),
        senderId: currentUser.uid,
        receiverId: user._id,
        replyTo: replyTo ? { text: replyTo.text, userName: replyTo.user.name } : null,
        user: {
          _id: currentUser.uid,
          name: senderName,
        },
        isRead: false,
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Nouveau message de ${senderName}`,
          body: msg.text,
        },
        trigger: null,
      });
    });

    setReplyTo(null);
    await Promise.all(writes);
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const renderReplyBar = () => {
    if (!replyTo) return null;

    return (
      <View style={styles.replyBar}>
        <View style={styles.replyPreview}>
          <Text style={styles.replyUserName}>
            Replying to: @{replyTo.user.name}
          </Text>
          <Text style={styles.replyText}>{replyTo.text}</Text>
        </View>
        <TouchableOpacity onPress={() => setReplyTo(null)} style={styles.closeReplyButton}>
          <FontAwesome5 name="times" size={16} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessageText = (props) => {
    const { currentMessage } = props;

    return (
      <View style={{ marginBottom: 10 }}>
        {currentMessage.replyTo && (
          <View style={styles.replyContainer}>
            <Text style={styles.replyUserName}>
              @{currentMessage.replyTo.userName}
            </Text>
            <Text style={styles.replyText}>{currentMessage.replyTo.text}</Text>
          </View>
        )}
        <Text style={styles.messageText}>{currentMessage.text}</Text>
      </View>
    );
  };

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
          <FontAwesome5 name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={[styles.bubble, { backgroundColor: userColors[user._id]  || '#D3D3D3' }]}>
            <Text style={styles.bubbleText}>
              {getInitials(user.name)}
            </Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

      {renderReplyBar()}

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: currentUser.uid,
          name: currentUser.displayName || 'User',
        }}
        renderAvatar={(props) => {
          const { name } = props.currentMessage.user;
          const initials = getInitials(name);
          return (
            <View style={[styles.avatar, { backgroundColor: userColors[props.currentMessage.user._id] || '#000' }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          );
        }}
        renderMessageText={renderMessageText}
        onLongPress={(context, message) => handleReply(message)}
      />

      <View style={styles.bottomBar}>
        {/* Your bottom navigation icons */}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Fond très léger et doux
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  arrowContainer: {
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubble: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB5B5', // Couleur douce pastel
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  bubbleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '600',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB5B5',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#4C6A92',
    marginTop: 6,
  },
  messageText: {
    fontSize: 14, // Réduit la taille du texte pour occuper moins d'espace
    color: '#333',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  outgoingMessage: {
    backgroundColor: '#4C6A92', // Fond bleu pour le message sortant
    marginRight: 18,
    marginLeft: 50,
    paddingVertical: 6, // Réduit l'espace vertical
    paddingHorizontal: 12, // Réduit l'espace horizontal
    borderRadius: 14, // Réduit le rayon pour un message plus petit
    maxWidth: '65%', // Réduit la largeur maximale du message
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  outgoingMessageText: {
    color: '#fff', // Texte blanc sur fond bleu
    fontSize: 14, // Taille du texte
  },
  replyBar: {
    backgroundColor: '#E6F4FF', // Fond doux pour la réponse
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B3CCE6',
    marginBottom: 16,
  },
  replyPreview: {
    flex: 1,
    marginRight: 16,
  },
  replyUserName: {
    fontWeight: 'bold',
    color: '#4C6A92',
    fontSize: 14,
  },
  replyText: {
    color: '#777',
    fontSize: 14,
  },
  closeReplyButton: {
    marginLeft: 18,
    padding: 8,
  },
  replyContainer: {
    marginBottom: 16,
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4C6A92',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});


export default ChatScreen;