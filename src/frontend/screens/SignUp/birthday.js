import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../backend/firebaseConfig'; // Chemin vers votre fichier firebaseConfig
import giftBoxImage from '../../images/image 47.png';
import image14 from '../../images/image 14.png';

const Birthday = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [age, setAge] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      const currentDate = new Date();
      const birthDate = new Date(selectedDate);
      const ageCalculated = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        setAge(ageCalculated - 1);
      } else {
        setAge(ageCalculated);
      }
    }
    setShowPicker(false);
  };

  const saveBirthday = async () => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Utilisation de l'UID Firebase
      await setDoc(
        userDocRef,
        {
          dateOfBirth: date.toISOString(), // Sauvegarde la date au format ISO
          age,
        },
        { merge: true }
      );
      alert('Date of Birth saved successfully!');
      navigation.navigate('FormCompany'); // Navigue vers l'écran suivant
    } catch (error) {
      console.error('Error saving date of birth:', error);
      alert('Failed to save date of birth. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Image source={image14} style={styles.logo} />
        <Text style={styles.name}>
          <Text style={styles.na}>Na</Text>
          <Text style={styles.me}>me</Text>
        </Text>
      </View>

      {/* Contenu défilable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>What's your birthday</Text>
          <Text style={styles.subHeaderText}>Choose your date of birth</Text>
          <Text style={styles.subHeaderText}>You can always make this private later</Text>
        </View>

        {/* Image */}
        <Image source={giftBoxImage} style={styles.giftImage} />

        {/* Sélecteur de date */}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>Select your birth date</Text>
        </TouchableOpacity>

        {/* Âge affiché */}
        <Text style={styles.ageText}>{age} Years old</Text>

        {/* Picker */}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </ScrollView>

      {/* Bouton pour sauvegarder et naviguer */}
      <TouchableOpacity style={styles.nextButton} onPress={saveBirthday}>
        <Text style={styles.nextButtonText}>Save and Next</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40, // Ajout d'une marge en bas pour espacer
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  name: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
  },
  na: {
    color: '#4e5d78', // Couleur pour "Na"
  },
  me: {
    color: '#ff87a0', // Couleur pour "me"
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 20, // Ajout d'une marge en haut pour plus d'espace
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FF87A0',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  giftImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  datePickerButton: {
    backgroundColor: '#FF87A0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  datePickerText: {
    color: '#fff',
    fontSize: 18,
  },
  ageText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF87A0',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20, // Pour un espace en bas
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Birthday;
