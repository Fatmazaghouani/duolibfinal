// components/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assure-toi d'avoir installé @expo/vector-icons
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({ data, setFilteredData }) => {
  const [searchText, setSearchText] = useState(''); // Gère le texte de recherche
  const navigation = useNavigation(); // Utilise la fonction de navigation

  // Fonction de filtrage des données en fonction du texte de recherche
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(data); // Si la recherche est vide, montre toutes les données
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()) // Recherche insensible à la casse
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../images/smalllogo.png')} style={styles.logo} />

      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchText}
        onChangeText={handleSearch} // Mettez à jour le texte de recherche et effectuez le filtrage
      />
      <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
        <FontAwesome5 name="comment-dots" size={20} color="#000" style={styles.messageIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingLeft: 10,
  },
  messageIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
