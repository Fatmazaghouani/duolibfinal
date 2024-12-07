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
    navigation.navigate('Messages');
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
          We will send them a notification and your email address. {"\n\n"}
          If it doesn't fit your choices, you can change it later. {"\n\n"}
          You can send them a message with this icon{' '}
          <Icon name="chatbubble-outline" size={20} color="#00ADEF" /> {"\n\n"}
          or contact them at the following email address{' '}
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
      <View style={styles.footer}>
        {[{ name: 'home', label: 'Feed' }, 
           { name: 'users', label: 'Duo', active: true }, 
           { name: 'user-circle', label: 'Profile' }, 
           { name: 'globe', label: 'Community' }, 
           { name: 'comments', label: 'Forum' }, 
           { name: 'bell', label: 'Notifications' }, 
           { name: 'cogs', label: 'Settings' }].map((item, index) => (
          <TouchableOpacity key={index} style={styles.footerItem} onPress={() => navigation.navigate(item.label)}>
            <FontAwesome5 name={item.name} size={20} color={item.active ? '#00ADEF' : '#000'} />
            <Text style={[styles.footerText, item.active && styles.activeFooterText]}>{item.label}</Text>
            {item.active && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#777',
  },
  activeFooterText: {
    color: '#00ADEF',
    fontWeight: '600',
  },
  activeIndicator: {
    width: 30,
    height: 2,
    backgroundColor: '#00ADEF',
    marginTop: 5,
  },
});

export default DuoDone;
