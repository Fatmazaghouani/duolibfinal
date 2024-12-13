import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assurez-vous d'avoir installé react-native-vector-icons

const SettingsScreen = ({ navigation }) => {
  const settingsOptions = [
    { icon: 'account', label: 'Edit Profile', onPress: () => navigation.navigate('EditPro') },
    { icon: 'translate', label: 'Language', onPress: () => navigation.navigate('Language') },
    { icon: 'block-helper', label: 'Blocking', onPress: () => navigation.navigate('UnderConstructionScreen') },
    { icon: 'bell-outline', label: 'Notification', onPress: () => navigation.navigate('Notification') },
    { icon: 'shield-lock-outline', label: 'Password & Security', onPress: () => navigation.navigate('PasswordReset') },
    { icon: 'history', label: 'Activity Log', onPress: () => navigation.navigate('UnderConstructionScreen') },
    { icon: 'eye-outline', label: 'Viewing & Sharing', onPress: () => navigation.navigate('UnderConstructionScreen') },
    { icon: 'help-circle-outline', label: 'Help', onPress: () => navigation.navigate('Help') },
    { icon: 'email-outline', label: 'Contact us', onPress: () => navigation.navigate('get in touch') },
    { icon: 'logout', label: 'Logout', onPress: () => navigation.navigate('Logout') },
  ];

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../../images/chat.png')} // Remplacez par l'image de votre profil
          style={styles.profileImage}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for something here..."
          placeholderTextColor="#aaa"
        />
        <Icon name="email-outline" size={24} color="#000" />
      </View>

      {/* Options de settings */}
      <ScrollView style={styles.optionsContainer}>
        {settingsOptions.map((option, index) => (
          <Pressable key={index} style={styles.option} onPress={option.onPress}>
            <Icon name={option.icon} size={24} color="#000" />
            <Text style={styles.optionText}>{option.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('feed')}>
          <Icon name="home-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Feed</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Duo')}>
          <Icon name="account-group-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Duo</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Community')}>
          <Icon name="earth" size={24} color="#000" />
          <Text style={styles.footerText}>Community</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Forum')}>
          <Icon name="forum-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Forum</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell-outline" size={24} color="#FF0000" />
          <Text style={styles.footerText}>Notification</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    color: '#000',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
});

export default SettingsScreen;