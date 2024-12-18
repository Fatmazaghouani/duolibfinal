import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../../backend/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import BottomBar from '../BottomBar';



// Fonction pour calculer l'âge
const calculateAge = (birthDate) => {
  const birth = new Date(birthDate.split('/').reverse().join('-'));
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const DuoSuggestions = ({ route }) => {
  const { preferences } = route.params;
  const [duoResults, setDuoResults] = useState([]);
  const navigation = useNavigation();
  const [userCountry, setUserCountry] = useState('');
  const [userId, setUserId] = useState('');
  const [userAge, setUserAge] = useState(0);
  const [userDiseases, setUserDiseases] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const db = getFirestore(firebaseApp);
          const userDoc = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const age = calculateAge(userData.dateOfBirth);
            setUserCountry(userData.country);
            setUserId(user.uid);
            setUserAge(age);
            setUserDiseases(userData.diseaseData || {}); // Stocker les données de maladie

            if (preferences.acceptDuo === 'yes') {
              // Filtrage selon les préférences de l'utilisateur
              if (preferences.similarAge === 'yes' && preferences.sameCountry === 'yes' && preferences.sameDisease === 'yes') {
                fetchUsersByAgeAndDisease(userData.dateOfBirth, user.uid, userData.diseaseData);
              } else if (preferences.sameCountry === 'yes' && preferences.sameDisease === 'yes') {
                fetchUsersInSameCountryAndDisease(userData.country, user.uid, userData.diseaseData);
              } else if (preferences.similarAge === 'yes' && preferences.sameDisease === 'yes') {
                fetchUsersByAgeAndDisease(userData.dateOfBirth, user.uid, userData.diseaseData);
              } else if (preferences.sameCountry === 'yes') {
                fetchUsersInSameCountry(userData.country, user.uid, userData.dateOfBirth);
              } else if (preferences.similarAge === 'yes') {
                fetchUsersByAge(userData.dateOfBirth, user.uid);
              } else if (preferences.sameDisease === 'yes') {
                fetchUsersWithSameDisease(userData.diseaseData, user.uid);
              }
            } else {
              setShowMessage(true); // Afficher un message si acceptDuo est 'non'
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [preferences]);

  // Fonction ajoutée : Récupérer les utilisateurs par âge et maladie
  const fetchUsersByAgeAndDisease = async (currentUserBirthDate, currentUserId, currentUserDiseases) => {
    try {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      const users = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter((user) => {
          if (user.uid === currentUserId) return false;

          const userAge = calculateAge(user.dateOfBirth);
          const currentUserAge = calculateAge(currentUserBirthDate);
          const ageDiff = Math.abs(userAge - currentUserAge);

          const diseasesMatch = (user.diseaseData && currentUserDiseases) ? 
            (user.diseaseData.cancer && currentUserDiseases.cancer ||
             user.diseaseData.curedCancer && currentUserDiseases.curedCancer ||
             user.diseaseData.metastasisCancer && currentUserDiseases.metastasisCancer ||
             user.diseaseData.rareDisease && currentUserDiseases.rareDisease) : true;

          return ageDiff <= 30 && diseasesMatch;
        });

      setDuoResults(users);
    } catch (error) {
      console.error('Error fetching users by age and disease:', error);
    }
  };

  // Récupérer les utilisateurs dans le même pays et ayant la même maladie
  const fetchUsersInSameCountryAndDisease = async (country, currentUserId, currentUserDiseases) => {
    try {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('country', '==', country));

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter((user) => {
          if (user.uid === currentUserId) return false;

          const diseasesMatch = (user.diseaseData && currentUserDiseases) ? 
            (user.diseaseData.cancer && currentUserDiseases.cancer ||
             user.diseaseData.curedCancer && currentUserDiseases.curedCancer ||
             user.diseaseData.metastasisCancer && currentUserDiseases.metastasisCancer ||
             user.diseaseData.rareDisease && currentUserDiseases.rareDisease) : true;

          return user.country === country && diseasesMatch;
        });

      setDuoResults(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Récupérer les utilisateurs ayant la même maladie
  const fetchUsersWithSameDisease = async (currentUserDiseases, currentUserId) => {
    try {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      const users = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter((user) => {
          if (user.uid === currentUserId) return false;

          const diseasesMatch = (user.diseaseData && currentUserDiseases) ? 
            (user.diseaseData.cancer && currentUserDiseases.cancer ||
             user.diseaseData.curedCancer && currentUserDiseases.curedCancer ||
             user.diseaseData.metastasisCancer && currentUserDiseases.metastasisCancer ||
             user.diseaseData.rareDisease && currentUserDiseases.rareDisease) : true;

          return diseasesMatch;
        });

      setDuoResults(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Récupérer les utilisateurs par âge
  const fetchUsersByAge = async (currentUserBirthDate, currentUserId) => {
    try {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      const users = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter((user) => {
          if (user.uid === currentUserId) return false;

          const userAge = calculateAge(user.dateOfBirth);
          const currentUserAge = calculateAge(currentUserBirthDate);
          const ageDiff = Math.abs(userAge - currentUserAge);

          return ageDiff <= 30;
        });

      setDuoResults(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Récupérer les utilisateurs dans le même pays
  const fetchUsersInSameCountry = async (country, currentUserId, currentUserBirthDate) => {
    try {
      const db = getFirestore(firebaseApp);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('country', '==', country));

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), uid: doc.id }))
        .filter((user) => {
          if (user.uid === currentUserId) return false;

          const userAge = calculateAge(user.dateOfBirth);
          const currentUserAge = calculateAge(currentUserBirthDate);
          const ageDiff = Math.abs(userAge - currentUserAge);

          return ageDiff <= 30;
        });

      setDuoResults(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const renderNoDuoMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          ⚠️ You should accept to have a duo so we can suggest one for you.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      {showMessage ? renderNoDuoMessage() : null}

      {duoResults.length > 0 ? (
        duoResults.map((user) => (
          <View key={user.uid} style={styles.userCard}>
            <Text style={styles.userNameText}>{user.name}</Text>
            <Text>Country: {user.country}</Text>
            <Text>Age: {calculateAge(user.dateOfBirth)}</Text>
            
            <View style={[styles.diseaseContainer, { flexDirection: 'row', alignItems: 'center' }]}>
  <Text>Diseases: </Text>
  {user.diseaseData && user.diseaseData.cancer && (
    <Text style={styles.diseaseText}>Cancer, </Text>
  )}
  {user.diseaseData && user.diseaseData.curedCancer && (
    <Text style={styles.diseaseText}>Cured Cancer, </Text>
  )}
  {user.diseaseData && user.diseaseData.metastasisCancer && (
    <Text style={styles.diseaseText}>Metastasis Cancer, </Text>
  )}
  {user.diseaseData && user.diseaseData.rareDisease && (
    <Text style={styles.diseaseText}>Rare Disease</Text>
  )}
</View>



            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() => navigation.navigate('UnderConstructionScreen')}
                
              >
                <Text style={styles.viewProfileButtonText}>View Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
  style={styles.chooseAsDuoButton}
  onPress={async () => {
    try {
      // Récupérer l'utilisateur authentifié
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // L'utilisateur choisi (celui sur lequel on clique)
        const chosenUserId = user.uid;
        const chosenUserName = user.name; // Nom de l'utilisateur choisi
        const chosenUserCountry = user.country; // Pays de l'utilisateur choisi
        const chosenUserAge = calculateAge(user.dateOfBirth); // Âge de l'utilisateur choisi
        const chosenUserDiseases = user.diseaseData || {}; // Maladies de l'utilisateur choisi

        // Mettre à jour le champ 'duo' dans le document de l'utilisateur authentifié
        const db = getFirestore(firebaseApp);
        const userDoc = doc(db, 'users', currentUser.uid);

        // On met à jour le champ duo dans le document de l'utilisateur authentifié
        await updateDoc(userDoc, {
          duo: {
            duoId: chosenUserId,  // UID de l'utilisateur choisi
            duoName: chosenUserName,  // Nom de l'utilisateur choisi
            duoCountry: chosenUserCountry,  // Pays de l'utilisateur choisi
            duoAge: chosenUserAge,  // Âge de l'utilisateur choisi
            duoDiseases: chosenUserDiseases,  // Maladies de l'utilisateur choisi
          },
        });

        // Naviguer vers la page DuoDone avec les informations du duo
        navigation.navigate('DuoDone', {
          userId: chosenUserId,
          userName: chosenUserName,
          userCountry: chosenUserCountry,
          userAge: chosenUserAge,
          userDiseases: chosenUserDiseases, // Passer les données de maladie
        });
      }
    } catch (error) {
      console.error('Error updating duo:', error);
    }
  }}
>
  <Text style={styles.chooseAsDuoButtonText}>Choose as Duo</Text>
</TouchableOpacity>


            </View>
          </View>
        ))
      ) : <View style={styles.erreur}>
      <Text style={styles.message}>Sorry..No users found matching your preferences.</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} color="#007BFF" />
    </View>}
    </ScrollView>
    {/* Bottom Bar */}
    
    <View style={styles.bottomBarContainer}>
      <BottomBar />
    </View>
  </View>
    
  );
  
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 700, // Ajout de padding au bas pour éviter que le contenu soit caché par la BottomBar
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flex: 1,  // Pour s'assurer que le contenu occupe toute la hauteur de l'écran
  },
  erreur: {
    flex: 1, // Occupe tout l'espace
    justifyContent: "flex-start", // Aligne le contenu vers le haut pour personnaliser le décalage
    alignItems: "center", // Centre horizontalement
    paddingTop: 200, // Décale le contenu vers le bas
    backgroundColor: "#f8f8f8", // Couleur de fond
  },
  message: {
    fontSize: 18, // Taille du texte
    textAlign: "center", // Centre le texte
    color: "#555", // Couleur du texte
    marginBottom: 20, // Espacement entre le texte et le bouton
  },
  
  userCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10, // Rapprocher les boutons
    marginTop: 10,
  },
  viewProfileButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15, // Bords plus arrondis
  },
  viewProfileButtonText: {
    color: 'black',
    fontWeight: 'bold',  // Texte en gras
  },
  chooseAsDuoButton: {
    backgroundColor: '#00ADEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15, // Bords plus arrondis
  },
  chooseAsDuoButtonText: {
    color: 'white',
    fontWeight: 'bold',  // Texte en gras
  },
  messageContainer: {
    padding: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    marginTop: 20,
  },
  messageText: {
    color: '#721c24',
    fontSize: 16,
  },
  userNameText: {
    fontWeight: 'bold',  // Nom en gras
    fontSize: 18,
  },
});

export default DuoSuggestions;
