import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importation du calendrier
import image14 from '../../images/image 14.png'; // Assurez-vous que l'image est accessible

const PersonScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(''); // 'male' or 'female'
  const [showName, setShowName] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [genderError, setGenderError] = useState('');

  // Validation et navigation
  const handleNext = () => {
    let formValid = true;

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
      navigation.navigate('form'); // Navigation vers la page "form"
    } else {
      setIsFormValid(false); // Afficher un message général d'erreur
    }
  };

  // Gestion du calendrier
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date.toLocaleDateString()); // Format de la date
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image14} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.nameText}>Na</Text>
          <Text style={styles.nameTextSecond}>me</Text>
        </Text>
      </View>

      <Text style={styles.questionText}>Who will use Duolib?</Text>

      {/* Sélection du genre */}
      <View style={styles.genderSelection}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'male' && styles.selectedOption,
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'female' && styles.selectedOption,
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>
      {genderError && <Text style={styles.errorText}>{genderError}</Text>}

      {/* Champs de texte */}
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

      {/* Champ de date */}
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.dateText}>
          {dateOfBirth ? dateOfBirth : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {/* Erreur générale */}
      {!isFormValid && (
        <Text style={styles.errorText}>Please complete all required fields.</Text>
      )}

      {/* Checkboxes */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox value={showName} onValueChange={setShowName} />
          <Text style={styles.checkboxText}>I will use my nickname</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox value={receiveNewsletter} onValueChange={setReceiveNewsletter} />
          <Text style={styles.checkboxText}>I would like to receive your newsletter</Text>
        </View>
      </View>

      {/* Bouton Suivant */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal pour la date */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
    flexDirection: 'row',
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
    color: '#4E5D78',
  },
  nameTextSecond: {
    color: '#FF87A0',
  },
  questionText: {
    color: '#FF87A0',
    fontSize: 20,
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
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PersonScreen;
