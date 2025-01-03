import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';  // Importer useNavigation
import { FontAwesome5 } from '@expo/vector-icons'; // Importation des icônes
import BottomBar from '../BottomBar';


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

  // Fonction pour naviguer vers ChangeDuo
  const goToChangeDuo = () => {
    navigation.navigate('DuoChange');  // Naviguer vers la page ChangeDuo
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
          The objective is to give each person to find their Duo, and exchange or share with confidence while helping each
          other to overcome difficult events.
        </Text>

        {/* Ajoutez l'image de la fusée ici */}
        <Image
          source={require('../../images/rocket.png')}
          style={styles.rocketIcon} // Utilisation d'un style spécifique pour la fusée
        />

        {/* Button Go */}
        <TouchableOpacity style={styles.button} onPress={goToDuoPreferences}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>

        {/* Text asking if they already have a Duo */}
        <Text style={styles.changeText}>
          Already have a Duo and want to change it? 
        </Text>

        {/* Button Change My Duo */}
        <TouchableOpacity style={styles.changeButton} onPress={goToChangeDuo}>
          <Text style={styles.buttonText}>Change my Duo</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomBarContainer}>
        <BottomBar />
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
    paddingBottom: 60,
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
  changeText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  changeButton: {
    backgroundColor: '#FF5733', // Color for the change button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
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
