import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Switch, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BottomBar from '../BottomBar'; // Assurez-vous que le chemin de votre BottomBar est correct

const SettingsNotificationsScreen = () => {
  // Gestion de l'état des notifications
  const [notifications, setNotifications] = useState({
    like: true,
    comment: false,
    mention: true,
    post: false,
    share: true,
    follow: false,
    message: true,
    birthday: false,
    sound: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.profileImage}
        />
        <TextInput placeholder="Search for something here..." style={styles.searchInput} />
        <Ionicons name="mail-outline" size={24} color="#4E5D78" />
      </View>

      {/* Titre de la page */}
      <Text style={styles.pageTitle}>Settings/Notifications</Text>
      <Text style={styles.subTitle}>What Notifications You Receive</Text>

      {/* Liste des notifications */}
      <ScrollView style={styles.notificationContainer}>
        {[
          { key: 'like', label: 'Like', icon: <FontAwesome name="heart" size={20} color="#FF6B6B" /> },
          { key: 'comment', label: 'Comment', icon: <FontAwesome name="comment" size={20} color="#1F77D0" /> },
          { key: 'mention', label: 'Mention', icon: <Ionicons name="notifications-outline" size={20} color="#FFA500" /> },
          { key: 'post', label: 'Post', icon: <MaterialIcons name="post-add" size={20} color="#FFD700" /> },
          { key: 'share', label: 'Share', icon: <FontAwesome name="share" size={20} color="#37CDFF" /> },
          { key: 'follow', label: 'Follow', icon: <Ionicons name="person-add-outline" size={20} color="#FFA500" /> },
          { key: 'message', label: 'Message from Duolib', icon: <FontAwesome name="envelope" size={20} color="#6A5ACD" /> },
          { key: 'birthday', label: 'Happy Birthday', icon: <FontAwesome name="birthday-cake" size={20} color="#FF69B4" /> },
          { key: 'sound', label: 'Sound notification', icon: <Ionicons name="volume-high-outline" size={20} color="#4CAF50" /> },
        ].map((item) => (
          <View key={item.key} style={styles.notificationItem}>
            <View style={styles.notificationText}>
              {item.icon}
              <Text style={styles.notificationLabel}>{item.label}</Text>
            </View>
            <Switch
              trackColor={{ false: '#ccc', true: '#A3D8F4' }}
              thumbColor={notifications[item.key] ? '#37CDFF' : '#f4f3f4'}
              onValueChange={() => toggleNotification(item.key)}
              value={notifications[item.key]}
            />
          </View>
        ))}
      </ScrollView>

      {/* BottomBar */}
      <BottomBar />
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 15,
  },
  subTitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
    marginHorizontal: 15,
  },
  notificationContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  notificationText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default SettingsNotificationsScreen;
