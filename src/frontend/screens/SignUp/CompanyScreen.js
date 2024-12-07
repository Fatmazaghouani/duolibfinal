import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../backend/firebaseConfig'; // Assurez-vous que firebaseConfig est configuré correctement
import image14 from '../../images/image 14.png';


const CompanyScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [gender, setGender] = useState(''); // 'male' or 'female'
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [genderError, setGenderError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');

  const handleNext = async () => {
    let formValid = true;

    // Validation des champs
    if (!companyName) {
      setCompanyNameError('Please complete your company name');
      formValid = false;
    } else {
      setCompanyNameError('');
    }

    if (!name) {
      setNameError('Please complete your name');
      formValid = false;
    } else {
      setNameError('');
    }

    if (!surname) {
      setSurnameError('Please complete your surname');
      formValid = false;
    } else {
      setSurnameError('');
    }

    if (!gender) {
      setGenderError('Please select your gender');
      formValid = false;
    } else {
      setGenderError('');
    }

    if (formValid) {
      const userData = {
        companyName,
        website,
        name,
        surname,
        gender,
      };

      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, userData, { merge: true });

        navigation.navigate('Birthday'); // Navigation vers la prochaine étape
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Error saving user data');
      }
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.rowContainer}>
          <Image source={image14} style={styles.logo} />
          <Text style={styles.name}>
            <Text style={styles.na}>Na</Text>
            <Text style={styles.me}>me</Text>
          </Text>
        </View>
        <Text style={styles.nameTextSecond}>Duolib will never sell data</Text>
      </View>

      <Text style={styles.questionText}>Who will use Duolib?</Text>

      <View style={styles.genderSelection}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'male' && styles.selectedOption]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'female' && styles.selectedOption]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>
      {genderError && <Text style={styles.errorText}>{genderError}</Text>}

      <TextInput
        style={[styles.input, companyNameError ? styles.errorInput : null]}
        placeholder="Name / Company / Association"
        value={companyName}
        onChangeText={setCompanyName}
      />
      {companyNameError && <Text style={styles.errorText}>{companyNameError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Website (optional)"
        value={website}
        onChangeText={setWebsite}
      />
      <Text style={styles.websiteInfo}>If you have no website, don’t fill it</Text>

      <TextInput
        style={[styles.input, nameError ? styles.errorInput : null]}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}

      <TextInput
        style={[styles.input, surnameError ? styles.errorInput : null]}
        placeholder="Your surname"
        value={surname}
        onChangeText={setSurname}
      />
      {surnameError && <Text style={styles.errorText}>{surnameError}</Text>}

      {!isFormValid && (
        <Text style={styles.errorText}>Please complete all required fields.</Text>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20, // Place le contenu plus haut
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80, // Agrandir l'image
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  name: {
    fontSize: 50, // Agrandir le texte
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  na: {
    color: '#4e5d78',
  },
  me: {
    color: '#ff87a0',
  },
  nameTextSecond: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#ff87a0',
    textAlign: 'center',
    marginTop: 5,
  },
  questionText: {
    color: '#FFB400',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  genderSelection: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  genderOption: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  genderText: {
    fontSize: 18,
    color: '#555',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  websiteInfo: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%', // Plus étendu
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});


export default CompanyScreen;
