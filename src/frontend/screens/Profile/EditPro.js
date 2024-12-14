import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { auth, db } from '../../../backend/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EditPro = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showName, setShowName] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referral, setReferral] = useState(''); // New state for referral
  const [diseaseData, setDiseaseData] = useState({
    noDisease: false,
    rareDisease: false,
    cancer: false,
    metastasisCancer: false,
    curedCancer: false,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || '');
            setSurname(userData.surname || '');
            setNickname(userData.nickname || '');
            setCity(userData.city || '');
            setState(userData.state || '');
            setCountry(userData.country || '');
            setZipCode(userData.zipCode || '');
            setGender(userData.gender || '');
            setDateOfBirth(userData.dateOfBirth || '');
            setShowName(userData.showName || false);
            setReceiveNewsletter(userData.receiveNewsletter || false);
            setBio(userData.bio || '');
            setPhoneNumber(userData.phoneNumber || '');
            setReferral(userData.referral || ''); // Set referral data if exists
            setDiseaseData(userData.diseaseData || { // Load disease data if available
              noDisease: false,
              rareDisease: false,
              cancer: false,
              metastasisCancer: false,
              curedCancer: false,
            });
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  const handleSave = async () => {
    if (userId) {
      const userRef = doc(db, 'users', userId);
      try {
        await updateDoc(userRef, {
          name,
          surname,
          nickname,
          city,
          state,
          country,
          zipCode,
          gender,
          dateOfBirth,
          showName,
          receiveNewsletter,
          bio,
          phoneNumber,
          referral,
          diseaseData, // Save disease data
        });

        Alert.alert(
          'Success',
          'Profile information has been successfully saved!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        console.error('Error updating user data:', error);
        Alert.alert('Error', "An error occurred while saving the data.");
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date.toLocaleDateString());
    hideDatePicker();
  };

  const handleDiseaseSelection = (disease) => {
    setDiseaseData((prevData) => ({
      ...prevData,
      [disease]: !prevData[disease], // Toggle disease selection
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
          <Icon name="envelope" size={24} color="#0078D4" style={styles.messageIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Existing fields */}
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={surname} onChangeText={setSurname} />

      <Text style={styles.label}>Nickname</Text>
      <TextInput style={styles.input} value={nickname} onChangeText={setNickname} />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <Text style={styles.label}>Country</Text>
      <TextInput style={styles.input} value={country} onChangeText={setCountry} />

      <Text style={styles.label}>Zip Code</Text>
      <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} />

      {/* Gender Selection */}
      <Text style={styles.label}>Gender</Text>
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

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.dateText}>{dateOfBirth || 'Select Date of Birth'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Referral Field */}
      <Text style={styles.label}>How did you hear about us?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter referral information"
        value={referral}
        onChangeText={setReferral}
      />

      {/* Disease Selection */}
      <Text style={styles.label}>Select Diseases</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDiseaseSelection('noDisease')}
      >
        <View style={[styles.checkbox, diseaseData.noDisease && styles.selectedCheckbox]} />
        <Text style={styles.optionText}>I have no disease</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDiseaseSelection('rareDisease')}
      >
        <View style={[styles.checkbox, diseaseData.rareDisease && styles.selectedCheckbox]} />
        <Text style={styles.optionText}>I have a rare disease</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDiseaseSelection('cancer')}
      >
        <View style={[styles.checkbox, diseaseData.cancer && styles.selectedCheckbox]} />
        <Text style={styles.optionText}>I have cancer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDiseaseSelection('metastasisCancer')}
      >
        <View style={[styles.checkbox, diseaseData.metastasisCancer && styles.selectedCheckbox]} />
        <Text style={styles.optionText}>I have metastasis cancer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDiseaseSelection('curedCancer')}
      >
        <View style={[styles.checkbox, diseaseData.curedCancer && styles.selectedCheckbox]} />
        <Text style={styles.optionText}>I had cancer and I'm cured</Text>
      </TouchableOpacity>

      {/* Receive Newsletter */}
      <View style={styles.newsletterContainer}>
  <CheckBox value={receiveNewsletter} onValueChange={setReceiveNewsletter} />
  <Text style={styles.newsletterText}>Receive Newsletter</Text>
</View>

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
<TextInput
  style={[styles.input, {height: 80}]}  // On applique un style modifié pour la hauteur
  value={bio}
  onChangeText={setBio}
  multiline={true}  // Permet de rendre le champ multi-lignes
  textAlignVertical="top"  // Permet d'aligner le texte en haut du champ
/>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  messageIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  genderSelection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  genderOption: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#0078D4',
  },
  genderText: {
    color: '#0078D4',
  },
  dateText: {
    color: '#0078D4',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedCheckbox: {
    backgroundColor: '#0078D4',
  },
  optionText: {
    fontSize: 16,
    
  },
  saveButton: {
    backgroundColor: '#0078D4',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  newsletterContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
},
newsletterText: {
  fontSize: 16,
  marginLeft: 10,  // Espacement entre la checkbox et le texte
},
});

export default EditPro;