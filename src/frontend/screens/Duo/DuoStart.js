import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';  // Importer useNavigation
import { FontAwesome5 } from '@expo/vector-icons'; // Importation des icônes

const DuoStart = () => {
  const navigation = useNavigation();  // Hook de navigation
  const [searchText, setSearchText] = useState('');  // Etat pour la recherche

  // Fonction pour naviguer vers DuoPreferences
  const goToDuoPreferences = () => {
    navigation.navigate('DuoPreferences');  // Naviguer vers la page DuoPreferences
  };

  // Fonction pour naviguer vers la page Profil
  const goToProfile = () => {
    navigation.navigate('Profile');  // Naviguer vers la page Profile
  };

  // Fonction pour gérer la recherche
  const handleSearch = (text) => {
    setSearchText(text); // Mettre à jour le texte de la recherche
  };

  // Fonction pour naviguer vers MessagesScreen
  const goToMessages = () => {
    navigation.navigate('Messages');  // Naviguer vers la page MessagesScreen
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
          onChangeText={handleSearch}
        />

        {/* Icône de messagerie */}
        <TouchableOpacity onPress={goToMessages}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" /> {/* Icone de messagerie */}
        </TouchableOpacity>
      </View>

      {/* Main Content with ScrollView */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Find your Duo, let’s start</Text>
        <Text style={styles.paragraph}>
          Illness is a test of life and a difficult experience. It is not always easy to talk freely about it with your
          family or friends. We do not want to worry them by delivering our anxieties or fears. Your wife or your
          husband may also have difficulty talking about it for fear of worrying us a little more. Because just talking
          about it awakens painful memories. We are often isolated. And the chain of medical examinations, invasive
          treatments, repeated hospitalizations may accentuate this feeling.
        </Text>
        <Text style={styles.paragraph}>
          However, it is essential not to keep everything to yourself and to share in confidence, with someone who can
          understand you. Who better than a sick person or "someone who has been through it", could listen to you and
          understand your anxieties?
        </Text>
        <Text style={styles.paragraph}>
          The objective is to give each person to find is Duo, and exchange or share with confidence while helping each
          other to overcome difficult events.
        </Text>

        {/* Ajoutez l'image de la fusée ici */}
        <Image
          source={require('../../images/rocket.png')}
          style={styles.rocketIcon} // Utilisation d'un style spécifique pour la fusée
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={goToDuoPreferences}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Feed */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.footerText}>Feed</Text>
        </TouchableOpacity>
        {/* Duo with Active Indicator */}
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('DuoStart')}>
          <FontAwesome5 name="users" size={20} color="#00ADEF" /> {/* Duo highlighted */}
          <Text style={[styles.footerText, styles.activeFooterText]}>Duo</Text>
          <View style={styles.activeIndicator} /> {/* Barre active sous Duo */}
        </TouchableOpacity>
        {/* Profile */}
        <TouchableOpacity style={styles.footerItem} onPress={goToProfile}>
          <FontAwesome5 name="user-circle" size={20} color="#000" /> {/* Icone de profil */}
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
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
    paddingHorizontal: 10,
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
    flex: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#00ADEF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rocketIcon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 14,
    marginTop: 5,
  },
  activeFooterText: {
    color: '#00ADEF', // Couleur différente pour indiquer l'élément actif
  },
  activeIndicator: {
    width: 30,
    height: 3, // Petite barre
    backgroundColor: '#00ADEF', // Même couleur que l'élément actif
    marginTop: 5,
    borderRadius: 2,
  },
});

export default DuoStart;
