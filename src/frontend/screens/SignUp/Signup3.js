import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import logoImage from '../../images/image 14.png';
import questionImage from '../../images/image 43.png';

const Signup3 = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!selectedOption) {
      setError(true);
    } else {
      setError(false);
      if (selectedOption === 'person') {
        navigation.navigate('PersonScreen');  // This navigates to PersonScreen
      }
      // Add more conditions here for other selections if needed
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.nameText}>Na</Text>
          <Text style={styles.nameTextSecond}>me</Text>
        </Text>
      </View>

      <Text style={styles.questionText}>Who are you?</Text>
      <Image source={questionImage} style={styles.image43} />

      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'person' && styles.selectedOption]}
          onPress={() => setSelectedOption('person')}
        >
          <Text style={styles.optionText}>I’m a person</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'association' && styles.selectedOption]}
          onPress={() => setSelectedOption('association')}
        >
          <Text style={styles.optionText}>I’m an association</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'foundation' && styles.selectedOption]}
          onPress={() => setSelectedOption('foundation')}
        >
          <Text style={styles.optionText}>I’m a foundation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'company' && styles.selectedOption]}
          onPress={() => setSelectedOption('company')}
        >
          <Text style={styles.optionText}>I’m a company</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>Please fill in</Text>}

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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FF6F61',
  },
  nameText: {
    color: '#FFC107',
  },
  nameTextSecond: {
    color: '#FF6F61',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
  image43: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  options: {
    width: '100%',
    marginBottom: 40,
  },
  option: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
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
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Signup3;
