import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../backend/firebaseConfig'; // Assurez-vous que firebaseConfig est configuré correctement
import logoImage from '../../images/image 14.png';
import questionImage from '../../images/image 43.png';

const Signup3 = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);

  const handleNext = async () => {
    if (!selectedOption) {
      setError(true);
    } else {
      setError(false);

      // Enregistrer l'option sélectionnée dans Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Utilisation de l'UID de l'utilisateur pour la collection Firestore
      try {
        await setDoc(userDocRef, {
          type: selectedOption, // Ajout du type sélectionné dans le document de l'utilisateur
        }, { merge: true });

        // Navigation selon le type sélectionné
        if (selectedOption === 'person') {
          navigation.navigate('PersonScreen');
        } else {
          navigation.navigate('CompanyScreen'); // Vous pouvez personnaliser les autres écrans comme 'AssociationScreen' ou 'FoundationScreen'
        }
      } catch (error) {
        console.error('Error saving user type:', error);
        alert('Error saving user type');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo et Name sur la même ligne */}
      <View style={styles.imageContainer}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.nameText}>Na</Text>
          <Text style={styles.nameTextSecond}>me</Text>
        </Text>
      </View>

      {/* Texte "Who are you?" */}
      <Text style={styles.questionText}>Who are you?</Text>

      <Image source={questionImage} style={styles.image43} />

      {/* Options centrées */}
      <View style={styles.options}>
        {['person', 'association', 'foundation', 'company'].map((option, index) => {
          const colors = ['#28A745', '#FF69B4', '#FFA500', '#007BFF']; // Vert, Rose, Orange, Bleu
          return (
            <TouchableOpacity
              key={option}
              style={[styles.optionRow, { borderColor: colors[index] }]}
              onPress={() => setSelectedOption(option)}
            >
              <CheckBox
                value={selectedOption === option}
                onValueChange={() => setSelectedOption(option)}
                style={[styles.checkbox, { backgroundColor: colors[index] }]}
              />
              <Text style={styles.optionText}>I’m {option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Message d'erreur */}
      {error && <Text style={styles.errorText}>Please select an option</Text>}

      {/* Bouton "Next" */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flexDirection: 'row', // Align the image and text in the same row
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  nameText: {
    color: '#4E5D78', // Color for 'Na'
  },
  nameTextSecond: {
    color: '#FF87A0', // Color for 'me'
  },
  questionText: {
    color: '#FF87A0', // Rose
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
  },
  image43: {
    width: 160,
    height: 160,
    marginBottom: 40, // Image de question un peu plus basse
  },
  options: {
    width: '100%',
    alignItems: 'center', // Centrer les options horizontalement
    marginBottom: 40,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20, // Bordures plus arrondies pour chaque option
    width: '80%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12, // Cases circulaires
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30, // Bouton plus rond
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Signup3;
