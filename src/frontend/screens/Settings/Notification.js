import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState({
    like: true,
    comment: true,
    mention: false,
    post: true,
    share: true,
    follow: false,
    message: true,
    birthday: true,
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
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.profileImage}
        />
        <TextInput
          placeholder="Search for something here..."
          style={styles.searchInput}
        />
        <Ionicons name="mail-outline" size={24} color="#4E5D78" />
      </View>

      {/* Titre de la page */}
      <Text style={styles.pageTitle}>Settings/Notifications</Text>
      <Text style={styles.subTitle}>What Notifications You Receive</Text>

      {/* Liste des notifications */}
      <View style={styles.notificationContainer}>
        {[
          {
            key: "like",
            label: "Like",
            icon: <FontAwesome name="heart" size={20} color="#FF6B6B" />,
          },
          {
            key: "comment",
            label: "Comment",
            icon: <FontAwesome name="comment" size={20} color="#1F77D0" />,
          },
          {
            key: "mention",
            label: "Mention",
            icon: <Ionicons name="notifications-outline" size={20} color="#FFA500" />,
          },
          {
            key: "post",
            label: "Post",
            icon: <MaterialIcons name="post-add" size={20} color="#FFD700" />,
          },
          {
            key: "share",
            label: "Share",
            icon: <FontAwesome name="share" size={20} color="#37CDFF" />,
          },
          {
            key: "follow",
            label: "Follow",
            icon: <Ionicons name="person-add-outline" size={20} color="#FFA500" />,
          },
          {
            key: "message",
            label: "Message from Duolib",
            icon: <FontAwesome name="envelope" size={20} color="#6A5ACD" />,
          },
          {
            key: "birthday",
            label: "Happy Birthday",
            icon: <FontAwesome name="birthday-cake" size={20} color="#FF69B4" />,
          },
          {
            key: "sound",
            label: "Sound notification",
            icon: <Ionicons name="volume-high-outline" size={20} color="#4CAF50" />,
          },
        ].map((item) => (
          <View key={item.key} style={styles.notificationItem}>
            <View style={styles.notificationText}>
              {item.icon}
              <Text style={styles.notificationLabel}>{item.label}</Text>
            </View>
            <Switch
              trackColor={{ false: "#ccc", true: "#A3D8F4" }}
              thumbColor={notifications[item.key] ? "#37CDFF" : "#f4f3f4"}
              onValueChange={() => toggleNotification(item.key)}
              value={notifications[item.key]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles pour la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    color: "#000",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  notificationContainer: {
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  notificationText: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4E5D78", // Couleur des textes
    marginLeft: 15, // Espacement entre l'icône et le texte
  },
});

export default NotificationScreen;