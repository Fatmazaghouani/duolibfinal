import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import { FontAwesome5 } from '@expo/vector-icons'; // Pour les icônes supplémentaires

const DuoPreferences = () => {
  const [preferences, setPreferences] = useState({
    acceptDuo: null,
    sameCountry: null,
    sameDisease: null,
    similarAge: null,
  });
  const [searchText, setSearchText] = useState(''); // État pour le texte de recherche
  const navigation = useNavigation(); // Récupérer l'objet de navigation

  const handleSelection = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  // Fonction pour naviguer vers DuoSuggestions
  const handleSeeResults = () => {
    navigation.navigate('DuoSuggestions'); // Navigation vers DuoSuggestions
  };

  const goToProfile = () => {
    navigation.navigate('Profile'); // Naviguer vers la page Profile
  };

  const goToMessages = () => {
    navigation.navigate('Messages'); // Naviguer vers la page MessagesScreen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={30} color="#555" /> {/* Icone de profil */}
        </TouchableOpacity>

        {/* Barre de recherche */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search for something here..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)} // Mise à jour du texte de recherche
        />

        {/* Icône de messagerie */}
        <TouchableOpacity onPress={goToMessages}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Main Content with ScrollView */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Duo preference</Text>

        {/* Questions */}
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

        <View style={styles.question}>
          <Text style={styles.questionText}>A person living in same country</Text>
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

        <View style={styles.question}>
          <Text style={styles.questionText}>A person with the same disease (cancer and/or rare disease)</Text>
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

        <View style={styles.question}>
          <Text style={styles.questionText}>
            A person who is close in age to mine with +/- 30 years
          </Text>
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

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleSeeResults}>
          <Text style={styles.buttonText}>See results</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Feed */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.footerText}>Feed</Text>
        </TouchableOpacity>
        {/* Duo avec indicateur actif */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('DuoStart')}>
          <FontAwesome5 name="users" size={20} color="#00ADEF" />
          <Text style={[styles.footerText, styles.activeFooterText]}>Duo</Text>
          <View style={styles.activeIndicator} /> {/* Barre active sous Duo */}
        </TouchableOpacity>
        {/* Profile */}
        <TouchableOpacity style={styles.footerItem} onPress={goToProfile}>
          <FontAwesome5 name="user-circle" size={20} color="#000" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        {/* Community */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="globe" size={20} color="#000" />
          <Text style={styles.footerText}>Community</Text>
        </TouchableOpacity>
        {/* Forum */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('ForumScreen')}>
          <FontAwesome5 name="comments" size={20} color="#000" />
          <Text style={styles.footerText}>Forum</Text>
        </TouchableOpacity>
        {/* Notifications */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome5 name="bell" size={20} color="#000" />
          <Text style={styles.footerText}>Notifications</Text>
        </TouchableOpacity>
        {/* Settings */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome5 name="cogs" size={20} color="#000" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingTop: 10,
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
    color: '#333',
  },
  activeFooterText: {
    fontWeight: 'bold',
    color: '#00ADEF',
  },
  activeIndicator: {
    width: 30,
    height: 2,
    backgroundColor: '#00ADEF',
    marginTop: 5,
  },
});

export default DuoPreferences;
