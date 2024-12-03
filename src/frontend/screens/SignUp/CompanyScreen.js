import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import image14 from '../../images/image 14.png'; // Remplacez par le chemin correct de l'image

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

  // Validation and navigation
  const handleNext = () => {
    let formValid = true;

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
      navigation.navigate('Birthday'); // Navigate to the next page
    } else {
      setIsFormValid(false); // Show a general error message
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row', // Align image and name on the same line
    alignItems: 'center', // Align vertically
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10, // Space between image and text
  },
  name: {
    fontSize: 40,
    lineHeight: 60,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    width: 140,
  },
  na: {
    color: '#4e5d78', // Duolib text color
  },
  me: {
    color: '#ff87a0', // will never sell data color
  },
  nameTextSecond: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#ff87a0',
    textAlign: 'center',
    width: 327,
  },
  questionText: {
    color: '#FFB400', // Question text color
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  genderSelection: {
    flexDirection: 'row',
    marginBottom: 20,
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
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});


export default CompanyScreen;
