import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../backend/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import d'icônes
import * as ImagePicker from 'expo-image-picker';  // Pour choisir une image depuis la galerie

const ProfileScreen = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);  // Pour la photo
  const [feeling, setFeeling] = useState(null);  // Pour l'émotion sélectionnée
  const [likes, setLikes] = useState([]);  // Pour les likes
  const userId = auth.currentUser?.uid;
  const [searchQuery, setSearchQuery] = useState(''); // Requête de recherche
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [userDiseaseType, setUserDiseaseType] = useState('');
  const [userBIO, setUserBIO] = useState('');
  

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserEmail(auth.currentUser?.email);
            setUserName(userData.name || 'Anonymous'); // Récupère le nom ou met 'Anonymous' par défaut
            setUserCountry(userData.pays || 'Non défini');
            setUserGender(userData.genre || 'Non défini');
            setUserDOB(userData.dob || 'Non défini');
            setUserDiseaseType(userData.diseaseType || 'Non défini');
            setUserBIO(userData.bio || 'écrire un bio');




          } else {
            console.log('No such user!');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });

      const q = query(collection(db, 'users', userId, 'messages'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        setPosts(messages);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  const handlePost = async () => {
    if (text.trim()) {
      try {
        await addDoc(collection(db, 'users', userId, 'messages'), {
          message: text,
          feeling,
          imageUri,
          timestamp: new Date(),
          likes: 0,  // Initial like count
          email: userEmail || 'Anonymous',
        });
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

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.uri);  // On récupère l'image choisie
      }
    }
  };

  const handleFeeling = (feeling) => {
    setFeeling(feeling);  // On assigne l'émotion sélectionnée
  };

  const handleLike = (postId) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      if (newLikes[postId]) {
        newLikes[postId]++;
      } else {
        newLikes[postId] = 1;
      }
      return newLikes;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* En-tête contenant le logo, la barre de recherche et l'icône de message */}
      <View style={styles.header}>
        <Image 
          source={require('../../images/logo.png')} 
          style={styles.logo} 
        />
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
          <Icon name="envelope" size={24} color="#0078D4" style={styles.messageIcon} />
        </TouchableOpacity>
      </View>

      <ImageBackground source={require('../../images/leaf-background.png')} style={styles.coverImage}></ImageBackground>

      <View style={styles.infoSection}>
  {/* Informations utilisateur */}
  <Text style={styles.infoTitle}>Mon profil</Text>

  <View style={styles.infoItem}>
  <Icon name="globe" size={20} color="#0078D4" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>Pays:</Text>
    <Text style={styles.infoValue}>{userCountry || 'Non défini'}</Text>
  </View>
  <View style={styles.infoItem}>
  <Icon name="venus-mars" size={20} color="#0078D4" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>Genre:</Text>
    <Text style={styles.infoValue}>{userGender || 'Non défini'}</Text>
  </View>
  <View style={styles.infoItem}>
  <Icon name="calendar" size={20} color="#0078D4" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>Date de naissance:</Text>
    <Text style={styles.infoValue}>{userDOB || 'Non défini'}</Text>
  </View>
  <View style={styles.infoItem}>
  <Icon name="heartbeat" size={20} color="#0078D4" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>Maladie:</Text>
    <Text style={styles.infoValue}>{userDiseaseType || 'Non défini'}</Text>
  </View>
  <View style={styles.infoItem}>
  <Icon name="user" size={20} color="#0078D4" style={styles.infoIcon} />
    <Text style={styles.infoLabel}>Mon BIO:</Text>
    <Text style={styles.infoValue}>{userBIO || 'Friendly Person'}</Text>
  </View>
  




  {/* Bouton Edit Profile */}
  
  <TouchableOpacity 
    style={styles.editProfileButton} 
    onPress={() => navigation.navigate('EditProfileScreen')}>
    <Text style={styles.buttonText}>Modifier le profil</Text>
  </TouchableOpacity>
  


</View>

      <View style={styles.createPostContainer}>
        <View style={styles.profilePicContainer}>
          <Text style={styles.profilePicText}>{userEmail ? userEmail.charAt(0).toUpperCase() : ''}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Quoi de neuf ?"
          value={text}
          onChangeText={setText}
        />
      </View>

      {/* Conteneur pour l'icône d'image, les emojis et le bouton "Publier" */}
      <View style={styles.actionsContainer}>
        {/* Icône d'image */}
        <TouchableOpacity onPress={handlePickImage} style={styles.iconContainer}>
          <Icon name="image" size={30} color="#0078D4" />
        </TouchableOpacity>

        {/* Emojis de feelings */}
        <View style={styles.feelingsContainer}>
          <TouchableOpacity onPress={() => handleFeeling('Happy')}>
            <Icon name="smile-o" size={30} color={feeling === 'Happy' ? '#0078D4' : '#888'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeeling('Sad')}>
            <Icon name="frown-o" size={30} color={feeling === 'Sad' ? '#0078D4' : '#888'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeeling('Neutral')}>
            <Icon name="meh-o" size={30} color={feeling === 'Neutral' ? '#0078D4' : '#888'} />
          </TouchableOpacity>
        </View>

        {/* Bouton Publier */}
        <Button title="Publier" onPress={handlePost} color="#4CAF50" />
      </View>

      {message && <Text style={styles.message}>{message}</Text>}

      <Text style={styles.latestPosts}>My Latest Posts</Text>

      <ScrollView style={styles.postsContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Black_circles.svg' }}
                  style={styles.avatar}
                />
                <Text style={styles.postUser}>
                  {userName ? `${userName} posted via DuoLib` : 'Anonymous posted via DuoLib'}
                </Text>
              </View>
              <View style={styles.bubble}>
                <Text style={styles.postText}>{post.message}</Text>
                {post.imageUri && <Image source={{ uri: post.imageUri }} style={styles.postImage} />}
              </View>
              {post.feeling && (
                <Text style={styles.feelingText}>
                  Feeling: <Icon name="smile-o" size={20} color="#0078D4" /> {post.feeling}
                </Text>
              )}
              <Text style={styles.timestamp}>
                {new Date(post.timestamp.seconds * 1000).toLocaleString()}
              </Text>

              {/* Like, Comment, Share buttons */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleLike(post.id)}>
                  <Icon name="thumbs-up" size={20} color="#0078D4" />
                  <Text>{likes[post.id] || 0} Like(s)</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Comments', { postId: post.id })}>
                  <Icon name="comment" size={20} color="#0078D4" />
                  <Text>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log('Share post')}>
                  <Icon name="share" size={20} color="#0078D4" />
                  <Text>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>Aucun message à afficher.</Text>
        )}
      </ScrollView>

      {/* Bouton pour voir les autres profils */}
      <TouchableOpacity style={styles.otherProfilesButton} onPress={() => navigation.navigate('OtherProfilesScreen')}>
        <Text style={styles.buttonText}>Ma liste d'amis </Text>
      </TouchableOpacity>

     

      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Permet de faire grandir le container pour occuper toute la hauteur disponible
    padding: 20,
  },
  



  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    paddingLeft: 8,
    height: 40,
    borderRadius: 20,
  },
  messageIcon: {
    marginLeft: 16,
  },
  coverImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  publishButton: {
    backgroundColor: '#4CAF50',  // Vert
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',  // Ombre légère
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,  // Ombre pour Android
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Boutons de réaction (Like, Commentaire, Partage)
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#0078D4', // Bleu
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Bouton d'icône image
  iconContainer: {
    marginRight: 20,
    padding: 12,
    backgroundColor: '#0078D4',  // Bleu
    borderRadius: 50,  // Rond
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  // Bouton pour voir les autres profils
  otherProfilesButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  createPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0078D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profilePicText: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 20,
    padding: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 20,
  },
  feelingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feelingText: {
    fontSize: 14,
    color: '#888',
  },
  postsContainer: {
    marginTop: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontWeight: 'bold',
  },
  bubble: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  postText: {
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',

  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 150,
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
  },
  editProfileButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  latestPosts: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  message: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  editProfileButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default ProfileScreen;