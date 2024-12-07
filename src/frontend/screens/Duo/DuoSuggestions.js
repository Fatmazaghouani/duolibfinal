import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import { FontAwesome5 } from '@expo/vector-icons'; // Pour les icônes supplémentaires

const DuoSuggestions = () => {
  const [searchText, setSearchText] = useState(''); // État pour le texte de recherche
  const navigation = useNavigation(); // Récupérer l'objet de navigation

  // Exemple de données de suggestions de duos (à personnaliser)
  const duoResults = [
    { name: 'John Doe', country: 'USA', disease: 'Cancer', age: 28 },
    { name: 'Jane Smith', country: 'Canada', disease: 'Rare Disease', age: 30 },
    { name: 'Alice Brown', country: 'UK', disease: 'Cancer', age: 35 },
  ];

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
          placeholder="🔍 Search for a Duo..."
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
        <Text style={styles.title}>Duo Suggestions</Text>

        {/* Liste des résultats de duos */}
        {duoResults.map((duo, index) => (
          <View key={index} style={styles.duoCard}>
            <Text style={styles.duoName}>{duo.name}</Text>
            <Text style={styles.duoDetails}>Country: {duo.country}</Text>
            <Text style={styles.duoDetails}>Disease: {duo.disease}</Text>
            <Text style={styles.duoDetails}>Age: {duo.age}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DuoDone')}>
              <Text style={styles.buttonText}>Start Duo</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  duoCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  duoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  duoDetails: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#00ADEF',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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

export default DuoSuggestions;
