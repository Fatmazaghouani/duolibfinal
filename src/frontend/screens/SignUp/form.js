import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import image14 from '../../images/image 14.png'; // Assurez-vous du chemin correct

const AddressFormScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [referral, setReferral] = useState('');

  const [errors, setErrors] = useState({});

  // Validation des champs obligatoires
  const handleNext = () => {
    const newErrors = {};
    if (!phoneNumber) newErrors.phoneNumber = 'Please complete';
    if (!address) newErrors.address = 'Please complete';
    if (!zipCode) newErrors.zipCode = 'Please complete';
    if (!city) newErrors.city = 'Please complete';
    if (!country) newErrors.country = 'Please complete';

    setErrors(newErrors);

    // Si le formulaire est valide, navigation vers l'étape suivante
    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('Step3');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image et titre */}
      <View style={styles.imageContainer}>
        <Image source={image14} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.nameText}>Na</Text>
          <Text style={styles.nameTextSecond}>me</Text>
        </Text>
      </View>

      <Text style={styles.subtitle}>Duolib will never sell data</Text>

      {/* Champ téléphone */}
      <Text style={styles.label}>Phone number</Text>
      <View style={[styles.inputContainer, errors.phoneNumber && styles.errorInput]}>
        <Image source={require('../../images/phone-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

      {/* Champ adresse */}
      <Text style={styles.label}>Address</Text>
      <View style={[styles.inputContainer, errors.address && styles.errorInput]}>
        <Image source={require('../../images/address-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      {/* Champ État/Province */}
      <Text style={styles.label}>Address/Province/State (optional)</Text>
      <View style={styles.inputContainer}>
        <Image source={require('../../images/address-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value={state}
          onChangeText={(text) => setState(text)}
        />
      </View>

      {/* Champs Zip Code et City */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, errors.zipCode && styles.errorLabel]}>
            Zip Code
          </Text>
          <View style={[styles.inputContainer, errors.zipCode && styles.errorInput]}>
            <Image source={require('../../images/zip-icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder=""
              value={zipCode}
              onChangeText={(text) => setZipCode(text)}
            />
          </View>
          {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.label, errors.city && styles.errorLabel]}>
            City
          </Text>
          <View style={[styles.inputContainer, errors.city && styles.errorInput]}>
            <Image source={require('../../images/zip-icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder=""
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </View>
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </View>
      </View>

      {/* Champ pays */}
      <Text style={styles.label}>Country</Text>
      <View style={[styles.inputContainer, errors.country && styles.errorInput]}>
        <Image source={require('../../images/country-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
      </View>
      {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

      {/* Champ référence */}
      <Text style={styles.label}>How did you hear about us? (optional)</Text>
      <View style={styles.inputContainer}>
        <Image source={require('../../images/referral-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value={referral}
          onChangeText={(text) => setReferral(text)}
        />
      </View>

      {/* Bouton suivant */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next - Go to step 3</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
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
  subtitle: {
    fontSize: 16,
    color: '#FF87A0',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  errorLabel: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 10, // Réduit l'espace entre les champs
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  errorInput: {
    borderColor: 'red',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default AddressFormScreen;