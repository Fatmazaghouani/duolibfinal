import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { db, auth } from '../../../backend/firebaseConfig';
import { collection, onSnapshot, getDoc, doc, updateDoc, setDoc } from '@firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';


const MessagesScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
   const [birthdayUsers, setBirthdayUsers] = useState([]);


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const currentUser = auth.currentUser;


  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const favouriteRef = collection(db, 'favourite');
    const usersRef = collection(db, 'users');


    // Fetch users for modal
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
 // Check for birthdays
      const today = new Date();
      const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`;


      const birthdayList = userList.filter(
        (user) =>
          user.dateOfBirth &&
          user.dateOfBirth.split('/').slice(0, 2).join('/') === todayFormatted
      );


      setBirthdayUsers(birthdayList);
    });








    // Fetch conversations
    const unsubscribeMessages = onSnapshot(messagesRef, async (snapshot) => {
      const conversationsMap = new Map();


      snapshot.docs.forEach((doc) => {
        const { senderId, receiverId, text, createdAt, isRead } = doc.data();


        if (senderId === currentUser.uid || receiverId === currentUser.uid) {
          const contactId = senderId !== currentUser.uid ? senderId : receiverId;


          if (!conversationsMap.has(contactId)) {
            conversationsMap.set(contactId, {
              text,
              createdAt,
              senderId,
              receiverId,
              isRead,
              newMessagesCount: 0,
            });
          }


          const currentConv = conversationsMap.get(contactId);


          if (receiverId === currentUser.uid && !isRead) {
            currentConv.newMessagesCount += 1;
          }


          if (createdAt > currentConv.createdAt) {
            currentConv.text = text;
            currentConv.createdAt = createdAt;
          }


          conversationsMap.set(contactId, currentConv);
        }
      });


      const userList = [];
      for (let [userId, lastMessage] of conversationsMap) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const messagePrefix = lastMessage.senderId === currentUser.uid ? 'You: ' : `${userData.name}: `;


          const favDoc = await getDoc(doc(favouriteRef, `${currentUser.uid}_${userId}`));

          const isFavourite = favDoc.exists() && favDoc.data().isMyFav;


          userList.push({
            _id: userId,
            ...userData,
            lastMessage: lastMessage.text ? messagePrefix + lastMessage.text : 'No message',
            lastMessageTime: lastMessage.createdAt,
            isFavourite: isFavourite,
            newMessagesCount: lastMessage.newMessagesCount || 0,
          });
        }
      }


      userList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);


      setConversations(userList);
      setLoading(false);
    });


    return () => {
      unsubscribeMessages();
      unsubscribeUsers();
    };
  }, [currentUser]);


  const toggleFavourite = async (receiverId) => {
    const favDocRef = doc(db, 'favourite', `${currentUser.uid}_${receiverId}`);

    const favDoc = await getDoc(favDocRef);


    if (favDoc.exists()) {
      await updateDoc(favDocRef, {
        isMyFav: !favDoc.data().isMyFav,
      });
    } else {
      await setDoc(favDocRef, {
        senderId: currentUser.uid,
        receiverId: receiverId,
        isMyFav: true,
      });
    }


    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv._id === receiverId
          ? { ...conv, isFavourite: !conv.isFavourite }
          : conv
      )
    );
  };


  const filteredConversations = showFavorites
    ? conversations.filter((conv) => conv.isFavourite)
    : conversations;


  const searchedConversations = filteredConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchText.toLowerCase())
  );


  const renderBirthdayUser = ({ item }) => (
    <TouchableOpacity
      style={styles.birthdayBubble}
      onPress={() => navigation.navigate('Chat', { user: item })}
    >
      <View style={[styles.avatar, { backgroundColor: item.color  || '#D3D3D3'  }]}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      <Text style={styles.userName}>🎉 {item.name}</Text>
    </TouchableOpacity>
  );


  const renderUserBubble = ({ item }) => (
    <TouchableOpacity
      style={styles.userBubble}
      onPress={() => {
        setShowModal(false);
        navigation.navigate('Chat', { user: item });
      }}
    >
      <View style={[styles.avatar, { backgroundColor: item.color  || '#D3D3D3'  }]}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );


  if (loading) {
    return <Text>Loading...</Text>;
  }


  return (
    <View style={styles.container}>
       <View style={styles.searchBar}>
        <FontAwesome5 name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
  {/* Birthday Section */}
      {birthdayUsers.length > 0 && (
        <View style={styles.birthdaySection}>
          <Text style={styles.birthdayTitle}>Today's Birthdays 🎂</Text>
          <FlatList
            data={birthdayUsers}
            keyExtractor={(item) => item._id}
            renderItem={renderBirthdayUser}
            horizontal
          />
        </View>
      )}


     
      <View style={styles.header}>
        <Text style={styles.title}>Conversations</Text>
        <TouchableOpacity
          style={styles.showFavoritesButton}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <Text style={styles.showFavoritesText}>
            {showFavorites ? 'Show All' : 'Show Favourites'}
          </Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={searchedConversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => {
              navigation.navigate('Chat', { user: item });
            }}
          >
            <View style={[styles.avatar, { backgroundColor: item.color  || '#D3D3D3'  }]}>
              <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
            </View>
            <View style={styles.conversationDetails}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={[styles.lastMessage, item.newMessagesCount > 0 && { fontWeight: 'bold' }]}>
                {item.lastMessage || 'No message'}
              </Text>
              {item.newMessagesCount > 0 && (
                <Text style={styles.newMessagesText}>{item.newMessagesCount} new messages</Text>
              )}
              <Text style={styles.messageTime}>
                {formatDate(item.lastMessageTime.seconds * 1000)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavourite(item._id)}>
              <FontAwesome5
                name={item.isFavourite ? 'star' : 'star-half-alt'}
                size={22}
                color={item.isFavourite ? '#FFD700' : '#ccc'}
                solid
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />


      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowModal(true)}
      >
        <FontAwesome5 name="envelope" size={24} color="#fff" />
      </TouchableOpacity>


      {/* Modal for User Selection */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a User</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={renderUserBubble}
          />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


// Helper functions
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const day = date.toLocaleDateString('fr-FR', options);
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${day}, ${time}`;

};


const getInitials = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
};





// Styles
const styles = StyleSheet.create({


  birthdaySection: {
    marginBottom: 20,
  },
  birthdayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 10,
  },
  birthdayBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },






  // Screen styles
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    padding: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  showFavoritesButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1E90FF',
    borderRadius: 25,
  },
  showFavoritesText: {
    fontSize: 14,
    color: '#fff',
  },
  // Floating button styles
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  // Conversation item
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  newMessagesText: {
    fontSize: 12,
    color: '#FF6347',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  conversationDetails: {
    flex: 1,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  userBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
  },
  closeModalButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6347',
    borderRadius: 25,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});


export default MessagesScreen;