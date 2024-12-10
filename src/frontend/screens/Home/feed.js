import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button, TextInput } from 'react-native'; 
import { db, auth } from '../../../backend/firebaseConfig';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { signOut } from '@firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons'; // L'icône des autres boutons, reste inchangé

const Feed = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser; // Utilisateur actuellement connecté

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs
        .map((doc) => ({ ...doc.data(), _id: doc.id })) // Inclure _id pour chaque utilisateur
        .filter((user) => user._id !== currentUser.uid); // Exclure l'utilisateur connecté
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Auth'); // Naviguer vers l'écran de connexion après déconnexion
    } catch (error) {
      console.error('Sign Out error:', error.message);
    }
  };
  useEffect(() => {
  const messagesQuery = query(
    collection(db, 'messages'), 
    where('receiverId', '==', currentUser.uid),  // Filtrer les messages destinés à l'utilisateur connecté
    where('isRead', '==', false)  // Filtrer ceux qui ne sont pas lus
  );

  const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
    // Récupérer les IDs des utilisateurs avec des messages non lus
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
  const [unreadDiscussionsCount, setUnreadDiscussionsCount] = useState(0);
  


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
        keyExtractor={(item) => item._id}
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
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Community')}>
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
    paddingLeft: 15,
    marginHorizontal: 10,
  },
  friendsSuggestion: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    color: "#000",  // Texte noir
    textAlign: "left",
    marginBottom: 20,
  },
  userCard: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  bubbleText: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  userName: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#000',
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
    textAlign: 'center',
  },
  badge: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: 'red',
  borderRadius: 10,
  width: 18,
  height: 18,
  justifyContent: 'center',
  alignItems: 'center',
},
badgeText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
},
});

export default Feed;
