import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import { db, auth } from '../../../backend/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, orderBy, doc, getDoc } from '@firebase/firestore';

const ChatScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !user) return;

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
      await addDoc(collection(db, 'messages'), {
        _id: msg._id,
        text: msg.text,
        createdAt: new Date(),
        senderId: currentUser.uid,
        receiverId: user._id,
        user: {
          _id: currentUser.uid,
          name: senderName,
        },
      });
    });

    await Promise.all(writes);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
          <FontAwesome5 name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={[styles.bubble, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.bubbleText}>
              {getInitials(user.name)}
            </Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

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
            <View style={[styles.avatar, { backgroundColor: getRandomColor() }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          );
        }}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.bottomText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Duo')}>
          <FontAwesome5 name="users" size={20} color="#000" />
          <Text style={styles.bottomText}>Duo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="globe" size={20} color="#000" />
          <Text style={styles.bottomText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Forum')}>
          <FontAwesome5 name="comments" size={20} color="#000" />
          <Text style={styles.bottomText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome5 name="bell" size={20} color="#000" />
          <Text style={styles.bottomText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Profile')}>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  arrowContainer: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#000',
  },
});

export default ChatScreen;