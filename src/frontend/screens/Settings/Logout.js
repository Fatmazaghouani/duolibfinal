import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { auth } from "../../../backend/firebaseConfig"; // Importer Firebase
import { signOut } from "firebase/auth"; // Fonction pour se déconnecter

const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Déconnexion de l'utilisateur
      navigation.replace("Starting"); // Redirige vers l'écran de connexion
    } catch (error) {
      console.error("Error logging out:", error.message); // Afficher l'erreur en cas de problème
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Retour à l'écran précédent
  };

  return (
    <View style={styles.container}>
      {/* Image du logo en haut */}
      <Image 
        source={require("../../images/logo.png")} // Assurez-vous que le chemin est correct
        style={styles.logo}
      />
      
      <Text style={styles.title}>Are you sure you want to log out?</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>

      {/* Message en bas */}
      <Text style={styles.footerMessage}>
        Toute l'équipe DuoLib vous remercie de votre visite sur l'application et espère que vous avez passé un bon moment en partageant vos expériences. {"\n"} 
        À bientôt ! 💖
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30, // Pousse tout vers le haut
    paddingHorizontal: 10,
  },
  logo: {
    width: 150, // Largeur du logo
    height: 200, // Hauteur du logo
    marginBottom: 20, // Espace entre le logo et le texte
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20, // Ajout pour laisser de l'espace avant le message en bas
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  logoutButton: {
    backgroundColor: "#FF4081",
  },
  cancelButton: {
    backgroundColor: "#4e5d78",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerMessage: {
    marginTop: 30, // Espace avant le message
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 15,
  },
});

export default Logout;
