import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import BottomBar from '../BottomBar';  // Import du BottomBar

const FriendScreen = ({ route }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showMaladie, setShowMaladie] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [color, setColor] = useState('#D3D3D3');
  const [userBio, setUserBio] = useState({
    city: '',
    country: '',
    dateOfBirth: '',
    gender: '',
    diseases: [],
    duo: null,
    bio: '',
    rareDiseases: [],
    cancers: [],
  });
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  // Récupérer les données de l'ami depuis la navigation
  const { user } = route.params; // user est l'objet passé depuis la page précédente

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || 'Non renseigné');
      setUserName(user.name || 'Utilisateur Anonyme');
      setUserBio({
        city: user.city || 'Non renseignée',
        country: user.country || 'Non renseigné',
        dateOfBirth: user.dateOfBirth || 'Non renseignée',
        gender: user.gender || 'Non renseigné',
        diseases: Object.keys(user.diseaseData || {}).filter((key) => user.diseaseData[key] === true),
        duo: user.duo || null,
        bio: user.bio || 'No Bio Mentionned',
        rareDiseases: user.rareDiseases || [],
        cancers: user.cancers || [],
      });
      setColor(user.color  || '#D3D3D3');
    }
  }, [user]);

  // Récupérer les posts de l'utilisateur
  useEffect(() => {
    if (user && user._id) {
      const q = query(collection(db, 'posts'), where('userId', '==', user._id), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return unsubscribe;
    }
  }, [user]);

  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  const handleNext = () => {
    setShowIntro(false);
    setShowMaladie(true);
  };

  const handleBack = () => {
    setShowIntro(true);
    setShowMaladie(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Votre contenu principal ici */}

        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={require('../../images/smalllogo.png')} style={styles.logo} />
          </TouchableOpacity>

          <TextInput style={styles.searchInput} placeholder="🔍 Search for something here..." placeholderTextColor="#000" />

          <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
            <FontAwesome5 name="comments" size={30} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../../images/image 109.png')} style={styles.image109Icon} />
          <View style={[styles.initialCircle, { backgroundColor: color   }]}>
            <Text style={styles.initialText}>{firstLetter}</Text>
          </View>
        </View>

        <View style={styles.bioContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{userName} {user.surname || ''}</Text>
            <Text style={styles.bioText}>{userBio.bio}</Text>
          </View>

          <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
            {showIntro && (
              <>
                <Text style={styles.introText}>INTRO</Text>
                <View style={styles.bioItem}>
                  <FontAwesome5 name="map-marker-alt" size={20} color="#000" />
                  <Text style={styles.bioText}>{userBio.country || 'Non renseigné'}</Text>
                </View>

                <View style={styles.bioItem}>
                  <FontAwesome5 name="venus-mars" size={20} color="#000" />
                  <Text style={styles.bioText}>{userBio.gender || 'Non renseigné'}</Text>
                </View>

                <View style={styles.bioItem}>
                  <FontAwesome5 name="calendar-alt" size={20} color="#000" />
                  <Text style={styles.bioText}>{userBio.dateOfBirth || 'Non renseignée'}</Text>
                </View>

                {userBio.duo && userBio.duo !== '' && (
                  <View style={styles.bioItem}>
                    <FontAwesome5 name="users" size={20} color="#000" />
                    <Text style={styles.bioText}>With a Duo</Text>
                  </View>
                )}

                <View style={styles.bioItem}>
                  <FontAwesome5 name="heartbeat" size={20} color="#000" />
                  <Text style={styles.bioText}>
                    {userBio.diseases.length > 0 ? userBio.diseases.join(', ') : 'Aucune maladie enregistrée'}
                  </Text>
                </View>
              </>
            )}

            {showMaladie && (
              <View style={styles.maladieSection}>
                <View style={styles.iconWithLabel}>
                  <Image source={require('../../images/can.png')} style={styles.icon} />
                  <Text style={styles.maladieText}>Cancers</Text>
                </View>
                {userBio.cancers.length > 0 ? (
                  userBio.cancers.map((cancer, index) => (
                    <Text key={index} style={styles.diseaseItem}>{cancer}</Text>
                  ))
                ) : (
                  <Text style={styles.noDataText}>Aucun cancer renseigné</Text>
                )}

                <View style={styles.iconWithLabel}>
                  <Image source={require('../../images/rare.png')} style={styles.icon} />
                  <Text style={styles.maladieText}>Rare Diseases</Text>
                </View>
                {userBio.rareDiseases.length > 0 ? (
                  userBio.rareDiseases.map((disease, index) => (
                    <Text key={index} style={styles.diseaseItem}>{disease}</Text>
                  ))
                ) : (
                  <Text style={styles.noDataText}>No Rare diseases mentioned</Text>
                )}
              </View>
            )}

            <View style={styles.buttonContainer}>
              {showIntro ? (
                <>
                  <TouchableOpacity style={[styles.nextButton, { backgroundColor: color   }]} onPress={handleNext}>



                    <Text style={styles.nextButtonText}>Next</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => navigation.navigate('Chat', { user: user })}
                  >
                    <Text style={styles.nextButtonText}>Contact</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: color   }]} onPress={handleBack}>
                  <Text style={styles.nextButtonText}>Back</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.latestPosts}>{userName}'s Latest Posts</Text>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postAuthor}>{userName} {user.surname || ''}</Text>
              <Text style={styles.postTimestamp}>{new Date(post.timestamp?.toDate()).toLocaleString()}</Text>
              <Text style={styles.postText}>{post.message}</Text>

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionItem}>
                  <FontAwesome5 name="thumbs-up" size={24} color="#377DFF" />
                  <Text style={styles.iconLabel}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <FontAwesome5 name="comment" size={24} color="#377DFF" />
                  <Text style={styles.iconLabel}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <FontAwesome5 name="share" size={24} color="#377DFF" />
                  <Text style={styles.iconLabel}>Share</Text>
                </TouchableOpacity>
                
              
              </View>
            </View>
          ))
        ) : (
          <Text>No posts yet.</Text>
        )}

        {/* Ajouter le BottomBar ici */}
      </ScrollView>
      <View style={styles.bottomBarContainer}>
        <BottomBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingBottom: 20,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bioContainer: {
    paddingHorizontal: 20,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
  },
  introText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37CDFF',
    marginBottom: 10,
  },
  
  bioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  maladieSection: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 20,
  },
  iconWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  maladieText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  diseaseItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',        // Ajout de flexDirection: 'row' pour aligner les éléments horizontalement
    justifyContent: 'space-between',  // Espace entre les boutons
    width: '100%',              // S'assurer que l'espace est utilisé correctement
    paddingHorizontal: 20,      // Un petit espacement sur les côtés
    alignItems: 'center',       // Alignement vertical centré
  },
  
  nextButton: {
    backgroundColor: '#FF87A0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#FF87A0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  latestPosts: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#37CDFF',
    marginBottom: 10,
    marginLeft: 20,
  },
  postCard: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLabel: {
    fontSize: 12,
    color: '#377DFF',
    marginLeft: 5,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',      // Rendre le nom en gras
    color: '#333',           // Couleur sombre pour une bonne lisibilité
    marginBottom: 5,         // Espacement en dessous du nom
    textAlign: 'left',       // Alignement à gauche
    letterSpacing: 0.5,      // Espacement léger entre les lettres
  },
  postTimestamp: {
    fontSize: 12,            // Taille de police petite pour une date discrète
    color: '#888',           // Couleur gris clair pour un effet subtil
    marginBottom: 10,        // Un petit espace sous la date
    fontStyle: 'italic',     // Texte en italique pour un effet visuel distinct
  },
  postText: {
    fontSize: 16,             // Taille de police confortable pour le texte principal
    color: '#555',            // Une couleur de texte gris foncé, facile à lire
    marginBottom: 10,         // Un petit espace sous le texte pour séparer les éléments
    lineHeight: 22,           // Un interligne plus large pour améliorer la lisibilité
    fontFamily: 'Arial',      // Choix de police simple et claire
  }
  


  
  
});

export default FriendScreen;