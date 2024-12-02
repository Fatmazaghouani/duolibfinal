import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importation du calendrier

import image14 from '../../images/image 14.png'; // Import de l'image 14

const PersonScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(''); // 'male' or 'female'
  const [showName, setShowName] = useState(false); // Pour afficher le nom
  const [receiveNewsletter, setReceiveNewsletter] = useState(false); // Pour recevoir la newsletter
  const [isFormValid, setIsFormValid] = useState(true); // Pour vérifier si le formulaire est valide
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Contrôler la visibilité du calendrier

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [genderError, setGenderError] = useState(''); // Erreur pour le genre

  // Fonction pour gérer le bouton Next
  const handleNext = () => {
    let formValid = true;

    // Validation des champs
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

    if (!showName && !nickname) {
      setNicknameError('Please complete your nickname');
      formValid = false;
    } else {
      setNicknameError('');
    }

    if (!dateOfBirth) {
      formValid = false;
    }

    if (!gender) {
      setGenderError('Please select your gender');
      formValid = false;
    } else {
      setGenderError('');
    }

    if (formValid) {
      navigation.navigate('form'); // Remplacez 'step3' par la prochaine page ou étape
    } else {
      setIsFormValid(false); // Afficher le message d'erreur général
    }
  };

  // Fonction pour afficher le calendrier
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Fonction pour cacher le calendrier
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Fonction pour gérer la sélection de la date
  const handleConfirm = (date) => {
    setDateOfBirth(date.toLocaleDateString()); // Formatage de la date
    hideDatePicker(); // Cacher le calendrier après la sélection
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo avec image 14 et le titre */}
      <View style={styles.imageContainer}>
        <Image source={image14} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.nameText}>Na</Text>
          <Text style={styles.nameTextSecond}>me</Text>
        </Text>
      </View>

      {/* Titre modifié "Who will use Duolib" */}
      <Text style={styles.questionText}>Who will use Duolib?</Text>

      {/* Gender Selection */}
      <View style={styles.genderSelection}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'male' && styles.selectedOption,
            !gender && styles.errorGenderOption, // Apply error style if no gender selected
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'female' && styles.selectedOption,
            !gender && styles.errorGenderOption, // Apply error style if no gender selected
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {genderError && <Text style={styles.errorText}>{genderError}</Text>}

      {/* Input Fields */}
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

      <TextInput
        style={[styles.input, nicknameError ? styles.errorInput : null]}
        placeholder="Your nickname (optional)"
        value={nickname}
        onChangeText={setNickname}
      />
      {nicknameError && <Text style={styles.errorText}>{nicknameError}</Text>}

      {/* Date of Birth Field with Calendar */}
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.dateText}>{dateOfBirth ? dateOfBirth : 'Select Date of Birth'}</Text>
      </TouchableOpacity>

      {/* Error message for general form validation */}
      {!isFormValid && (
        <Text style={styles.errorText}>Please complete all required fields.</Text>
      )}

      {/* Checkboxes for preferences */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox value={showName} onValueChange={setShowName} />
          <Text style={styles.checkboxText}>I will use my nickname, I don’t want to show my name</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox value={!showName} onValueChange={() => setShowName(!showName)} />
          <Text style={styles.checkboxText}>I want to use and show my name</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox value={receiveNewsletter} onValueChange={setReceiveNewsletter} />
          <Text style={styles.checkboxText}>I would like to receive your newsletter</Text>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Select a date"
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
        textColor="#FF6F61" // Change the text color of the Date Picker
        datePickerModeAndroid="spinner"
      />
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
    fontWeight: "700",
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
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
  errorGenderOption: {
    borderColor: 'red',
    borderWidth: 1,
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
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    width: '100%',
    marginBottom: 30,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default PersonScreen;
