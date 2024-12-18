import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { FontAwesome5 } from '@expo/vector-icons';

const DuoDone = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, userName, userCountry, userAge, userDiseases } = route.params;

  const goToMessages = () => {
    // Naviguer vers l'écran de messages et passer l'ID de l'utilisateur ou d'autres informations
    navigation.navigate('Messages', { userId, userName });
  };

  const goToDuoChange = () => {
    navigation.navigate('DuoChange');
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche en haut */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={30} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search for something here..."
        />
        <TouchableOpacity onPress={goToMessages}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Details of {userName}</Text>
        <Text style={styles.additionalText}>
          You now have a Duo. {"\n"}
          We will send him/her a notification and your email address. {"\n\n"}
          If it doesn't fit your choices, you can change it later. {"\n\n"}
          You can send him/her a message with this icon{' '}
          <TouchableOpacity onPress={goToMessages}>
            <Icon name="chatbubble-outline" size={20} color="#00ADEF" />
          </TouchableOpacity> {"\n\n"}
          or contact him/her at the following email address{' '}
          <Icon name="mail-outline" size={20} color="#00ADEF" />.
        </Text>
        
        <Image source={require('../../images/rocket.png')} style={styles.userImage} />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userDetails}>
          Country: {userCountry} - Age: {userAge} - Disease: 
          {userDiseases && userDiseases.cancer && (
            <Text style={styles.diseaseText}>Cancer, </Text>
          )}
          {userDiseases && userDiseases.curedCancer && (
            <Text style={styles.diseaseText}>Cured Cancer, </Text>
          )}
          {userDiseases && userDiseases.metastasisCancer && (
            <Text style={styles.diseaseText}>Metastasis Cancer, </Text>
          )}
          {userDiseases && userDiseases.rareDisease && (
            <Text style={styles.diseaseText}>Rare Disease, </Text>
          )}
          {!userDiseases || 
            (!userDiseases.cancer && 
            !userDiseases.curedCancer && 
            !userDiseases.metastasisCancer && 
            !userDiseases.rareDisease) && (
            <Text style={styles.diseaseText}>No disease</Text>
          )}
        </Text>

      </ScrollView>

      {/* Bouton "Change Duo" */}
      <TouchableOpacity
        style={styles.changeDuoButton}
        onPress={goToDuoChange} 
      >
        <Text style={styles.changeDuoText}>Change Duo</Text>
      </TouchableOpacity>

      {/* Footer dynamique */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Feed')}>
          <FontAwesome5 name="home" size={20} color="#000" />
          <Text style={styles.bottomText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('DuoStart')}>
          <FontAwesome5 name="users" size={20} color="#000" />
          <Text style={styles.bottomText}>Duo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('MyCommunityScreen')}>
          <FontAwesome5 name="globe" size={20} color="#000" />
          <Text style={styles.bottomText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ForumScreen')}>
          <FontAwesome5 name="comments" size={20} color="#000" />
          <Text style={styles.bottomText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Notification')}>
          <FontAwesome5 name="bell" size={20} color="#000" />
          <Text style={styles.bottomText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user" size={20} color="#000" />
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome5 name="cogs" size={20} color="#000" />
          <Text style={styles.bottomText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    marginHorizontal: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  userDetails: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  changeDuoButton: {
    backgroundColor: '#00ADEF',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  changeDuoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#000',
    fontSize: 12,
  },
  diseaseText: {
    color: '#f00',
  },
});

export default DuoDone;
