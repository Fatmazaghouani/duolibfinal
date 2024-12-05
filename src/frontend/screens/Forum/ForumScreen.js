import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ForumScreen = ({ navigation }) => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche

  // Fonctions de navigation
  const goToColonCancerForum = () => {
    navigation.navigate('ForumColonCancer');
  };

  const goToRareDiseasesForum = () => {
    Alert.alert('In Development', 'This forum is under development. Stay tuned!');
  };

  const goToChatRulesForum = () => {
    navigation.navigate('ForumChatRules');
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchBarContainer}>
        <FontAwesome5 name="search" size={18} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search forums"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../images/discussion.png')}
            style={styles.headerImage}
          />
          <Text style={styles.title}>Select the forum you want to join</Text>
        </View>

        <Text style={styles.subtitle}>
          The discussion forum is dedicated to persons and friends concerned by cancer and/or rare diseases who wish to exchange and share their experience. Please consult the friendly chart..
        </Text>

        <View style={styles.forumSelection}>
          {/* Chat Rules */}
          <View style={styles.forumItem}>
            <Image
              source={require('../../images/rules-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.forumTitle}>Chat Rules</Text>
            <TouchableOpacity
              style={styles.goButton}
              onPress={goToChatRulesForum}
            >
              <Text style={styles.goButtonText}>Consult</Text>
            </TouchableOpacity>
          </View>

          {/* Forum Colon Cancer */}
          <View style={styles.forumItem}>
            <Image
              source={require('../../images/cancer-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.forumTitle}>Primary Cancer</Text>
            <TouchableOpacity
              style={[
                styles.forumButton,
                selectedForum === 'Colon cancer' && styles.selectedButton,
              ]}
              onPress={() => setSelectedForum('Colon cancer')}
            >
              <Text style={styles.buttonText}>Colon Cancer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goButton}
              onPress={goToColonCancerForum}
            >
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          </View>

          {/* Forum Rare Diseases */}
          <View style={styles.forumItem}>
            <Image
              source={require('../../images/dna-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.forumTitle}>Rare Diseases</Text>
            <TouchableOpacity
              style={[
                styles.forumButton,
                selectedForum === 'Syndrome of Gittleman' && styles.selectedButton,
              ]}
              onPress={() => setSelectedForum('Syndrome of Gittleman')}
            >
              <Text style={styles.buttonText}>Syndrome of Gittleman</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.goButton, { backgroundColor: '#ccc' }]}
              onPress={goToRareDiseasesForum}
              disabled={true}
            >
              <Text style={styles.goButtonText}>Coming Soon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barre de navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.bottomText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Duo')}>
          <FontAwesome5 name="user-friends" size={20} color="#000" />
          <Text style={styles.bottomText}>Duo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="globe" size={20} color="#000" />
          <Text style={styles.bottomText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Forum')}>
          <FontAwesome5 name="comments" size={20} color="#000" />
          <Text style={styles.bottomText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome5 name="bell" size={20} color="#000" />
          <Text style={styles.bottomText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome5 name="user" size={20} color="#000" />
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome5 name="cog" size={20} color="#000" />
          <Text style={styles.bottomText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  forumSelection: {
    width: '100%',
  },
  forumItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  forumTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  forumButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#87CEEB',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  goButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#000',
  },
});

export default ForumScreen;
