import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../../../backend/firebaseConfig';
import { collection, query, where, onSnapshot, orderBy, getDoc, doc } from '@firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';  // Importer FontAwesome5

const MessagesScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('senderId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const users = new Set();
      snapshot.docs.forEach((doc) => {
        const { receiverId } = doc.data();
        if (receiverId !== currentUser.uid) {
          users.add(receiverId);
        }
      });

      const userList = [];
      for (let userId of users) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          userList.push({ _id: userId, ...userDoc.data() });
        }
      }

      setConversations(userList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Fonction pour filtrer les conversations en fonction de la recherche
  const filteredConversations = conversations.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <FontAwesome5 name="search" size={18} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery} // Mettre à jour l'état de la recherche
        />
      </View>
      <Text style={styles.title}>Conversations</Text>
      <FlatList
        data={filteredConversations} // Utiliser les conversations filtrées
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => navigation.navigate('Chat', { user: item })}
          >
            <View style={[styles.avatar, { backgroundColor: getRandomColor() }]}>
              <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
            </View>
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Fonction pour générer les initiales
const getInitials = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
};

// Fonction pour générer une couleur aléatoire
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;