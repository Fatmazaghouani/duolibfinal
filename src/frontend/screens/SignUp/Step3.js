import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';

const Step3 = ({ navigation }) => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [youMustClick, setYouMustClick] = useState('');

  const handleNext = () => {
    if (!selectedDisease) {
      setErrorMessage('You must click on a box');
      setYouMustClick('You must click on a box');
    } else {
      setErrorMessage('');
      setYouMustClick('');
      // Rediriger vers Photo1 si "I have no disease" est sélectionné
      if (selectedDisease === 'noDisease') {
        navigation.navigate('Photo1');
      } else {
        // Sinon, naviguer vers la page en fonction de la maladie sélectionnée
        navigation.navigate('PersonWithDesease');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header avec l'image et le texte sur la même ligne */}
      <View style={styles.headerContainer}>
        <Image source={require('../../images/image 15.png')} style={styles.image15Icon} />
        <Text style={styles.profileText}>Profile <Text style={styles.proText}>Pro</Text></Text>
      </View>

      {/* Sous-titre centré */}
      <Text style={styles.subtitle}>In order to find your Duo and create your community, please tell us if you have a disease</Text>

      {/* Image principale */}
      <Image source={require('../../images/image 32.png')} style={styles.image32Icon} />

      {/* Message d'erreur si l'utilisateur n'a pas sélectionné d'option */}
      {youMustClick ? <Text style={styles.youMustClick}>{youMustClick}</Text> : null}

      {/* Options de maladies */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelectedDisease('noDisease')}
      >
        <View style={[styles.checkbox, selectedDisease === 'noDisease' && styles.selectedCheckbox]} />
        <Text style={[styles.optionText, styles.noDiseaseText]}>I have no disease</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelectedDisease('rareDisease')}
      >
        <View style={[styles.checkbox, selectedDisease === 'rareDisease' && styles.selectedCheckbox]} />
        <Text style={[styles.optionText, styles.rareDiseaseText]}>I have a rare disease</Text>
      </TouchableOpacity>

      <Text style={styles.descriptionText}>
        A rare disease is generally considered to be a disease that affects fewer than 200,000 people in the United States at any given time. There are more than 6,800 rare diseases.
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelectedDisease('cancer')}
      >
        <View style={[styles.checkbox, selectedDisease === 'cancer' && styles.selectedCheckbox]} />
        <Text style={[styles.optionText, styles.cancerText]}>I have cancer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelectedDisease('metastasisCancer')}
      >
        <View style={[styles.checkbox, selectedDisease === 'metastasisCancer' && styles.selectedCheckbox]} />
        <Text style={[styles.optionText, styles.metastasisCancerText]}>I have metastasis cancer</Text>
      </TouchableOpacity>

      <Text style={styles.descriptionText}>
        A metastasis cancer happens when cancer cells separate from the primary tumour and spread to other parts of the body.
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelectedDisease('curedCancer')}
      >
        <View style={[styles.checkbox, selectedDisease === 'curedCancer' && styles.selectedCheckbox]} />
        <Text style={[styles.optionText, styles.cancerText]}>I had cancer and I'm cured</Text>
      </TouchableOpacity>

      {/* Error message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextText}>Next - Go to step 4</Text>
      </TouchableOpacity>

      {/* Forgot password link */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.loginText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrer l'image et le texte
    marginBottom: 20,
  },
  image15Icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  profileText: {
    fontSize: 40,
    lineHeight: 60,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#4E5D78',
    marginLeft: 10,
  },
  proText: {
    color: '#FFB400',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#090a0a',
    textAlign: 'center',
    width: 300,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  image32Icon: {
    width: '100%',
    height: 65,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  youMustClick: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#fa0000',
    textAlign: 'center',
    width: 331,
    marginTop: 5, // Espacement du message d'erreur
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#FFB400',
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  selectedCheckbox: {
    backgroundColor: '#FFB400',
  },
  optionText: {
    fontSize: 18,
    color: '#FFB400',
  },
  noDiseaseText: {
    color: '#FFB400',
  },
  rareDiseaseText: {
    color: '#FFB400',
  },
  cancerText: {
    color: '#FFB400',
  },
  metastasisCancerText: {
    color: '#FFB400',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 20,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#f37d4a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  nextText: {
    fontSize: 18,
    color: '#fff',
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4E5D78',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Step3;
