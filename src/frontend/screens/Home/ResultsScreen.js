import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../../backend/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';


const ResultsScreen = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { diseaseType } = route.params; // 'cancers' ou 'rareDiseases'


  useEffect(() => {
    if (searchTerm.trim()) {
      searchUsers();
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm]);


  const searchUsers = async () => {
    setLoading(true);
    const usersRef = collection(db, 'users');
    const normalizedSearchTerm = searchTerm.toLowerCase(); // Normaliser la recherche pour éviter les erreurs de casse


    console.log('Searching for term:', normalizedSearchTerm);  // Vérifier le terme de recherche


    // Récupérer tous les utilisateurs de Firestore
    try {
      const querySnapshot = await getDocs(usersRef);
      const users = querySnapshot.docs.map(doc => doc.data());
     
      // Filtrer les utilisateurs manuellement en fonction de la recherche
      const filtered = users.filter(user => {
        const cancers = user.cancers || []; // Liste des cancers de l'utilisateur
        const rareDiseases = user.rareDiseases || []; // Liste des maladies rares de l'utilisateur


        // Vérifier si l'un des tableaux contient un terme de recherche
        const hasMatchingCancer = cancers.some(disease => disease.toLowerCase().includes(normalizedSearchTerm));
        const hasMatchingRareDisease = rareDiseases.some(disease => disease.toLowerCase().includes(normalizedSearchTerm));


        // Vérifier si l'utilisateur a un cancer ou une maladie rare correspondant à la recherche
        return hasMatchingCancer || hasMatchingRareDisease;
      });


      console.log('Utilisateurs trouvés:', filtered);  // Vérifier les utilisateurs filtrés
      setFilteredUsers(filtered);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleUserPress = (user) => {
    // Naviguer vers le profil de l'utilisateur avec toutes les données nécessaires
    navigation.navigate('FriendScreen', { user });
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userCard}>
              <View style={styles.userHeader}>
                <Ionicons name="person-circle" size={40} color="#4b8b3b" />
                <Text style={styles.userName}>{item.name || 'Unnamed User'}</Text>
              </View>
              <View style={styles.userInfoSection}>
                {/* Affichage des cancers */}
                {item.cancers && item.cancers.length > 0 ? (
                  <View style={styles.diseaseCard}>
                    <Text style={[styles.diseaseText, styles.cancerText]}>
                      Cancers:
                    </Text>
                    <Text style={styles.diseaseDescription}>{item.cancers.join(', ')}</Text>
                  </View>
                ) : (
                  <Text style={styles.noDiseaseText}>No cancers reported</Text>
                )}


                {/* Affichage des maladies rares */}
                {item.rareDiseases && item.rareDiseases.length > 0 ? (
                  <View style={styles.diseaseCard}>
                    <Text style={[styles.diseaseText, styles.rareDiseaseText]}>
                      Rare Diseases:
                    </Text>
                    <Text style={styles.diseaseDescription}>{item.rareDiseases.join(', ')}</Text>
                  </View>
                ) : (
                  <Text style={styles.noDiseaseText}>No rare diseases reported</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 20,
    height: 50,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
  },
  userInfoSection: {
    marginTop: 10,
  },
  diseaseCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  diseaseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancerText: {
    color: '#FF87A0',  // Rouge pour les cancers
  },
  rareDiseaseText: {
    color: '#37CDFF',  // Bleu pour les maladies rares
  },
  diseaseDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  noDiseaseText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
});


export default ResultsScreen;



