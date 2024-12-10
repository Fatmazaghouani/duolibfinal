import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, addDoc, collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../backend/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import de FontAwesome5 pour l'icône de message
import * as ImagePicker from 'expo-image-picker'; // Pour choisir une image depuis la galerie
import { format, parse } from 'date-fns'; // Import de date-fns
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [showIntro, setShowIntro] = useState(true); // Gestion de l'affichage de la partie INTRO
  const [showMaladie, setShowMaladie] = useState(false);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userBio, setUserBio] = useState({
    city: '',
    country: '',
    dateOfBirth: '',
    gender: '',
    diseases: [],
  });
  const [userName, setUserName] = useState(''); // Nouveau state pour stocker le nom de l'utilisateur
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
  if (userId) {
    const userRef = doc(db, 'users', userId);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserEmail(auth.currentUser?.email);
          setUserName(userData.name || 'Utilisateur Anonyme'); // Utilise 'Utilisateur Anonyme' si 'name' est vide ou inexistant

          setUserBio({
  
            city: userData.city || 'Non renseignée',
            country: userData.country || 'Non renseigné',
            dateOfBirth: userData.dateOfBirth || 'Non renseignée',
            diseases: Object.keys(userData.diseaseData).filter((key) => userData.diseaseData[key] === true),
            gender: userData.gender || 'Non renseigné',
            duo: userData.duo || null, // Si le champ 'duo' n'existe pas, on met 'null'
            bio: userData.bio || 'Aucune description renseignée',  
          });
        } else {
          console.log('Utilisateur non trouvé !');
        }
      })
      .catch((error) => console.error('Erreur lors de la récupération des données utilisateur:', error));
  }
}, [userId]);

useEffect(() => {
  if (userId) {
    const q = query(
      collection(db, 'posts'), 
      where('userId', '==', userId), // Filtrer les posts par userId
      orderBy('timestamp', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe; // Cleanup
  }
}, [userId]);



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


  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) setImageUri(result.uri);
    }
  };

  const handleFeeling = (feeling) => setFeeling(feeling);

  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';
  const handleNext = () => {
    setShowIntro(false);
    setShowMaladie(true);
  };

  const handleBack = () => {
    setShowIntro(true);
    setShowMaladie(false); };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Barre de recherche avec logo et icône des messages */}
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
          <FontAwesome5 name="comments" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Image 109 et bulle avec la première lettre de l'utilisateur */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/image 109.png')} // Ton image 109
          style={styles.image109Icon}
        />
        <View style={styles.initialCircle}>
          <Text style={styles.initialText}>{firstLetter}</Text>
        </View>
      </View>

      {/* Bio Section */}
      // Bio Section
<View style={styles.bioContainer}>
  <View style={styles.nameContainer}>
    <Text style={styles.nameText}>{userName}</Text>
    <Text style={styles.bioText}>{userBio.bio}</Text>

  </View>
{/* Nouveau texte "INTRO" */}
  <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* Partie INTRO */}
      {showIntro && (
        <>
          <Text style={styles.introText}>INTRO</Text>

          {/* Affichage des informations avec des icônes */}
          <View style={styles.bioItem}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#000" />
            <Text style={styles.bioText}> {userBio.country || 'Non renseigné'}</Text>
          </View>

          <View style={styles.bioItem}>
            <FontAwesome5 name="venus-mars" size={20} color="#000" />
            <Text style={styles.bioText}> {userBio.gender || 'Non renseigné'}</Text>
          </View>

          <View style={styles.bioItem}>
            <FontAwesome5 name="calendar-alt" size={20} color="#000" />
            <Text style={styles.bioText}> {userBio.dateOfBirth || 'Non renseignée'}</Text>
          </View>

          {userBio.duo && userBio.duo !== '' ? (
            <View style={styles.bioItem}>
              <FontAwesome5 name="users" size={20} color="#000" />
              <Text style={styles.bioText}>With a Duo</Text>
            </View>
          ) : null}

          <View style={styles.bioItem}>
            <FontAwesome5 name="heartbeat" size={20} color="#000" />
            <Text style={styles.bioText}>
              {userBio.diseases.length > 0 ? userBio.diseases.join(', ') : 'Aucune maladie enregistrée'}
            </Text>
          </View>
        </>
      )}

      {/* Partie MALADIE */}
      {showMaladie && (
        <View style={styles.maladieSection}>
          <Text style={styles.maladieText}>Maladie</Text>
        </View>
      )}

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        {showIntro ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleBack}>
            <Text style={styles.nextButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditPro')}>
          <Text style={styles.editButtonText}>Edit details</Text>
        </TouchableOpacity>
      </View>
    </View>
</View>


      {/* Publication de message */}
      <View style={styles.createPostContainer}>
  <View style={styles.inputWithCircle}>
    <TextInput
      style={styles.input}
      placeholder="What's happening?"
      value={text}
      onChangeText={setText}
    />
    
  </View>

 <View style={styles.actionsContainer}>
  {/* Photo et Feeling sur la même ligne */}
  <View style={styles.iconWithLabelRow}>
    <View style={styles.iconWithLabel}>
      <TouchableOpacity onPress={handlePickImage} style={styles.iconContainer}>
        <FontAwesome5 name="image" size={25} color="#888" />
      </TouchableOpacity>
      <Text style={styles.iconLabel}>Photo</Text>
    </View>

    <View style={styles.iconWithLabel}>
      <TouchableOpacity onPress={() => handleFeeling('Happy')} style={styles.iconContainer}>
        <FontAwesome5 name="smile" size={25} color={feeling === 'Happy' ? '#0078D4' : '#888'} />
      </TouchableOpacity>
      <Text style={styles.iconLabel}>Feeling</Text>
    </View>
  </View>

  {/* Bouton Publier */}
  <TouchableOpacity onPress={handlePost} style={styles.publishButton}>
    <Text style={styles.publishButtonText}>Post</Text>
  </TouchableOpacity>
</View>

</View>



      <Text style={styles.latestPosts}>My last posts</Text>

{posts.length > 0 ? (
  
        posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Nom de l'utilisateur */}
            <Text style={styles.postAuthor}>{userName}</Text>

            {/* Date et heure */}
            <Text style={styles.postTimestamp}>
              {new Date(post.timestamp?.toDate()).toLocaleString()}
            </Text>

            {/* Contenu du message */}
            <Text style={styles.postText}>{post.message}</Text>

            {/* Action Likes, Share, Comment */}
            <View style={styles.postActions}>
  {/* Bouton Like */}
  <TouchableOpacity style={styles.actionItem}>
    <FontAwesome name="thumbs-up" size={24} color="#377DFF" />
    <Text style={styles.iconLabel}>Like</Text>
  </TouchableOpacity>

  {/* Bouton Share */}
  <TouchableOpacity style={styles.actionItem}>
    <FontAwesome name="share" size={24} color="#377DFF" />
    <Text style={styles.iconLabel}>Share</Text>
  </TouchableOpacity>

  {/* Bouton Comment */}
  <TouchableOpacity style={styles.actionItem}>
    <FontAwesome name="comment" size={24} color="#377DFF" />
    <Text style={styles.iconLabel}>Comment</Text>
  </TouchableOpacity>

  {/* Bouton Send */}
  <TouchableOpacity style={styles.actionItem}>
    <FontAwesome name="send" size={24} color="#377DFF" />
    <Text style={styles.iconLabel}>Send</Text>
  </TouchableOpacity>
</View>




            
          </View>
        ))
      ) : (
        <Text>Aucun message à afficher.</Text>
      )}
      </ScrollView>

      
    
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Permet de faire défiler tout le contenu sans coupure
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
 
introText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Par exemple, une couleur bleue
    marginBottom: 10,  // Ajoute un espace en dessous de l'intro
  },
  bioContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    marginLeft: 10, // Espace entre l'icône et le texte
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    height: 30,
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
  imageContainer: {
    position: 'relative',
    marginTop: 20,
    alignItems: 'center',
  },
  image109Icon: {
    width: '100%',
    height: 112,
  },
  initialCircle: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    backgroundColor: '#377DFF',
    width: 70, // Augmentez la largeur de la bulle
    height: 70, // Augmentez la hauteur de la bulle
    borderRadius: 35, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bioContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 16,
    marginVertical: 5,
  },
  createPostContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 20,
  },
  latestPosts: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  postsContainer: {
    marginTop: 10,
  },
  postCard: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#000',
  },
  nameContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#888',  // Gris pour la description
  },
  editButton: {
    backgroundColor: '#ddd',  // Couleur de fond bleu
    borderRadius: 6,
    width: '100%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#888',
    textAlign: 'center',
  },
   buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  // Style du bouton "Next"
  nextButton: {
    backgroundColor: '#377DFF',  // Bleu
    borderRadius: 6,
    width: '48%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  // Style du bouton "Edit details"
  editButton: {
    backgroundColor: '#ddd',  // Gris
    borderRadius: 6,
    width: '48%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#888',
    textAlign: 'center',
  },
  actionsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

iconWithLabel: {
  alignItems: 'center',  // Centre l'icône et l'étiquette
  justifyContent: 'center',
},

iconLabel: {
  marginTop: 5,
  fontSize: 14,
  color: '#777',
},
 actionsContainer: {
    marginVertical: 10,
    padding: 10,
  },
  iconWithLabelRow: {
    flexDirection: 'row', // Affiche les icônes et leurs labels sur la même ligne
    justifyContent: 'space-between', // Espacement entre les éléments
    alignItems: 'center', // Aligne verticalement
    marginBottom: 10, // Espacement entre la ligne d'icônes et le bouton
  },
  iconWithLabel: {
    alignItems: 'center', // Centrer chaque icône et son label sous l'icône
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50, // Arrondir les icônes
    padding: 10,
    marginBottom: 5, // Espacement entre l'icône et le label
  },
  iconLabel: {
    fontSize: 12,
    color: '#555',
  },
  publishButton: {
    backgroundColor: '#377DFF', // Fond bleu
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5, // Bord arrondi
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff', // Texte en blanc
    fontSize: 16,
  },
  postCard: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  postText: {
    fontSize: 16,
    marginTop: 10,
  },
   iconWithLabel: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: '#555',
  },
  commentContainer: {
    marginTop: 10,
  },
  postActions: {
  flexDirection: 'row', // Aligne les éléments horizontalement
  justifyContent: 'space-around', // Distribution uniforme des actions
  alignItems: 'center', // Centre verticalement les icônes et labels
  marginTop: 10,
  paddingHorizontal: 10,
},
actionItem: {
  flexDirection: 'row', // Place l'icône et le texte côte à côte
  alignItems: 'center', // Centre verticalement l'icône et le texte
  padding: 5,
},
iconLabel: {
  fontSize: 14,
  color: '#555',
  marginLeft: 5, // Espace entre l'icône et le texte
},

 
});

export default ProfileScreen;
