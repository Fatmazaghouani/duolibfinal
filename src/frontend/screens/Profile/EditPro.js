import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { auth, db } from '../../../backend/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomBar from '../BottomBar';


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
  const [cancers, setCancers] = useState([]); // List of cancers
  const [rareDiseases, setRareDiseases] = useState([]); // List of rare diseases
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
            setCancers(userData.cancers || []);
            setRareDiseases(userData.rareDiseases || []);
            setBio(userData.bio || '');
            setPhoneNumber(userData.phoneNumber || '');
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
          cancers,
          rareDiseases,
          bio,
          phoneNumber,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
          <Icon name="envelope" size={24} color="#0078D4" style={styles.messageIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Display input fields with labels */}
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

      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <Text style={styles.label}>Date of Birth (DD/MM/YYYY)</Text>
      <TextInput style={styles.input} value={dateOfBirth} onChangeText={setDateOfBirth} />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      
    </ScrollView>
    
    
  );
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditPro;
