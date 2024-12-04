import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../backend/firebaseConfig'; // Assurez-vous que firebaseConfig est configuré correctement

const cancerOptions = [
  'Acute lymphocytic leukemia (ALL)',
  'Acute lymphocytic leukemia (ALL) - childhood',
  'Acute myelogenous leukemia (AML)',
  'Acute myelogenous leukemia (AML) - childhood',
  // ... autres options de cancer
];

const metastasisOptions = ['I have metastasis', "I don't have metastasis"];

const rareDiseaseOptions = ['Degos disease', 'Duchenne muscular dystrophy', 'Ectodermal dysplasia', 'Fabry disease', 'Familial Mediterranean fever', 'Farber disease'];

const PersonWithDisease = ({ navigation }) => {
  const [selectedCancers, setSelectedCancers] = useState([]);
  const [showCancerDropdown, setShowCancerDropdown] = useState(false);

  const [selectedMetastasis, setSelectedMetastasis] = useState('');
  const [showMetastasisDropdown, setShowMetastasisDropdown] = useState(false);

  const [selectedRareDiseases, setSelectedRareDiseases] = useState([]);
  const [showRareDiseaseDropdown, setShowRareDiseaseDropdown] = useState(false);

  const toggleSelection = (option, stateSetter, state) => {
    if (state.includes(option)) {
      stateSetter(state.filter((item) => item !== option));
    } else {
      stateSetter([...state, option]);
    }
  };

  const handleNextPress = async () => {
    if (
      selectedMetastasis || 
      selectedCancers.length > 0 || 
      selectedRareDiseases.length > 0
    ) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid); // Utiliser l'UID de l'utilisateur

        // Enregistrer les données dans Firestore
        await setDoc(userDocRef, {
          cancers: selectedCancers, // Liste des cancers sélectionnés
          metastasis: selectedMetastasis, // Métastases sélectionnées
          rareDiseases: selectedRareDiseases, // Liste des maladies rares sélectionnées
        }, { merge: true });

        // Navigation en fonction des choix
        if (selectedMetastasis) {
          navigation.navigate('Photo3');
        } else if (selectedCancers.length > 0 && selectedRareDiseases.length === 0) {
          navigation.navigate('Photo3');
        } else if (selectedRareDiseases.length > 0 && selectedCancers.length === 0) {
          navigation.navigate('Photo2');
        } else if (selectedCancers.length > 0 && selectedRareDiseases.length > 0) {
          navigation.navigate('Photo4');
        }
      } catch (error) {
        console.error('Error saving disease data:', error);
        alert('Error saving disease data');
      }
    } else {
      alert('Please select at least one option');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../../images/image 15.png')}
          style={styles.image15Icon}
        />
        <Text style={styles.profileText}>
          Pro<Text style={styles.proText}>file</Text>
        </Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        You are free to tell us if you have more than one disease
      </Text>
      <Image
        source={require('../../images/image 32.png')}
        style={styles.additionalImage}
      />

      <View style={styles.formContainer}>
        {/* Primary Cancer Section */}
        <View>
          <Text style={styles.sectionTitle}>Primary cancer (multi-choice possible)</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setShowCancerDropdown(!showCancerDropdown)}
          >
            <Text style={styles.dropdownText}>
              {selectedCancers.length > 0
                ? selectedCancers.join(', ')
                : 'No cancer'}
            </Text>
          </TouchableOpacity>
          {showCancerDropdown && (
            <View style={styles.dropdownList}>
              <FlatList
                data={cancerOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => toggleSelection(item, setSelectedCancers, selectedCancers)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedCancers.includes(item) && styles.selectedItem,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 300 }} // Limite la hauteur de la liste
              />
            </View>
          )}
        </View>

        {/* Metastasis Section */}
        <View>
          <Text style={styles.sectionTitle}>Metastasis cancer</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setShowMetastasisDropdown(!showMetastasisDropdown)}
          >
            <Text style={styles.dropdownText}>
              {selectedMetastasis || 'No metastasis'}
            </Text>
          </TouchableOpacity>

          {showMetastasisDropdown && (
            <View style={styles.dropdownList}>
              {metastasisOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedMetastasis(option);
                    setShowMetastasisDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.explanationText}>
            A metastasis cancer happens when cancer cells separate from the primary tumour and spread 
            to other parts of the body. You can have more than one metastasis.
          </Text>
        </View>

        {/* Rare Disease Section */}
        <View>
          <Text style={styles.sectionTitle}>Rare disease (multi-choice possible)</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setShowRareDiseaseDropdown(!showRareDiseaseDropdown)}
          >
            <Text style={styles.dropdownText}>
              {selectedRareDiseases.length > 0
                ? selectedRareDiseases.join(', ')
                : 'No rare disease'}
            </Text>
          </TouchableOpacity>

          {showRareDiseaseDropdown && (
            <View style={styles.dropdownList}>
              <FlatList
                data={rareDiseaseOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() =>
                      toggleSelection(item, setSelectedRareDiseases, selectedRareDiseases)
                    }
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedRareDiseases.includes(item) && styles.selectedItem,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 300 }} // Limite la hauteur de la liste
              />
            </View>
          )}
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextPress}
      >
        <Text style={styles.nextText}>Next - Go to step 4</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  image15Icon: { width: 45, height: 45, resizeMode: 'contain' },
  profileText: { fontSize: 40, fontWeight: '700', color: '#4E5D78', marginLeft: 10 },
  proText: { color: '#FFB400' },
  subtitle: { fontSize: 20, fontWeight: '500', color: '#090a0a', textAlign: 'center', marginBottom: 20 },
  additionalImage: { width: '100%', height: 70, resizeMode: 'contain', marginBottom: 20 },
  formContainer: { width: '100%' },
  sectionTitle: { fontSize: 14, fontWeight: '500', color: '#4E5D78', marginBottom: 10 },
  dropdownBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, backgroundColor: '#fff' },
  dropdownText: { fontSize: 14, color: '#4E5D78' },
  dropdownList: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginTop: 5, padding: 10 },
  dropdownItem: { padding: 10 },
  dropdownItemText: { fontSize: 14, color: '#4E5D78' },
  selectedItem: { color: '#FFB400' },
  explanationText: { fontSize: 12, color: '#090a0a', marginTop: 5 },
  nextButton: { backgroundColor: '#FFB400', paddingVertical: 12, alignItems: 'center', marginTop: 30, borderRadius: 6 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default PersonWithDisease;
