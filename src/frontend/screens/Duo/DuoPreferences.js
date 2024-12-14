import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomBar from '../BottomBar';

const DuoPreferences = () => {
  const [preferences, setPreferences] = useState({
    acceptDuo: null,
    sameCountry: null,
    sameDisease: null,
    similarAge: null,
  });
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleSelection = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSeeResults = () => {
    navigation.navigate('DuoSuggestions', { preferences }); // Pass preferences as params
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goToMessages = () => {
    navigation.navigate('Messages');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={30} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search for something here..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={goToMessages}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
      
        <Text style={styles.title}>Duo Preferences</Text>

        {/* Accept Duo */}
        <View style={styles.question}>
          <Text style={styles.questionText}>I accept to have a Duo</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, preferences.acceptDuo === 'yes' && styles.activeOption]}
              onPress={() => handleSelection('acceptDuo', 'yes')}
            >
              <Icon name="checkmark-circle" size={20} color={preferences.acceptDuo === 'yes' ? '#00ADEF' : '#777'} />
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, preferences.acceptDuo === 'no' && styles.activeOption]}
              onPress={() => handleSelection('acceptDuo', 'no')}
            >
              <Icon name="close-circle" size={20} color={preferences.acceptDuo === 'no' ? '#FF4D4D' : '#777'} />
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Same Country */}
        <View style={styles.question}>
          <Text style={styles.questionText}>A person living in the same country</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, preferences.sameCountry === 'yes' && styles.activeOption]}
              onPress={() => handleSelection('sameCountry', 'yes')}
            >
              <Icon name="checkmark-circle" size={20} color={preferences.sameCountry === 'yes' ? '#00ADEF' : '#777'} />
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, preferences.sameCountry === 'no' && styles.activeOption]}
              onPress={() => handleSelection('sameCountry', 'no')}
            >
              <Icon name="close-circle" size={20} color={preferences.sameCountry === 'no' ? '#FF4D4D' : '#777'} />
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Same Disease */}
        <View style={styles.question}>
          <Text style={styles.questionText}>A person with the same disease (cancer or rare disease)</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, preferences.sameDisease === 'yes' && styles.activeOption]}
              onPress={() => handleSelection('sameDisease', 'yes')}
            >
              <Icon name="checkmark-circle" size={20} color={preferences.sameDisease === 'yes' ? '#00ADEF' : '#777'} />
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, preferences.sameDisease === 'no' && styles.activeOption]}
              onPress={() => handleSelection('sameDisease', 'no')}
            >
              <Icon name="close-circle" size={20} color={preferences.sameDisease === 'no' ? '#FF4D4D' : '#777'} />
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Age */}
        <View style={styles.question}>
          <Text style={styles.questionText}>A person who is close in age to mine with +/- 30 years</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, preferences.similarAge === 'yes' && styles.activeOption]}
              onPress={() => handleSelection('similarAge', 'yes')}
            >
              <Icon name="checkmark-circle" size={20} color={preferences.similarAge === 'yes' ? '#00ADEF' : '#777'} />
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, preferences.similarAge === 'no' && styles.activeOption]}
              onPress={() => handleSelection('similarAge', 'no')}
            >
              <Icon name="close-circle" size={20} color={preferences.similarAge === 'no' ? '#FF4D4D' : '#777'} />
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSeeResults}>
          <Text style={styles.buttonText}>See Results</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomBarContainer}>
        <BottomBar />
      </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',

  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  question: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
  },
  options: {
    flexDirection: 'column', // Aligne les options verticalement
    alignItems: 'flex-start', // Aligne les éléments à gauche
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  activeOption: {
    backgroundColor: '#e0f7fa',
  },
  button: {
    backgroundColor: '#00ADEF',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 0.001,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
  },
  activeFooterText: {
    color: '#00ADEF',
    fontWeight: 'bold',
  },
});

export default DuoPreferences;
