import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
// Importer les images nécessaires
import smallLogo from "../../images/smalllogo.png"; // Logo près de "DuoLib"
import rocket from "../../images/rocket.png"; // Image du Rocket

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Affichage du logo "DuoLib" */}
      <View style={styles.duoLibContainer}>
        <Image source={smallLogo} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.duolib}>
          <Text style={styles.duo}>Duo</Text>
          <Text style={styles.lib}>lib</Text>
        </Text>
      </View>

      {/* Image du rocket juste au-dessus du texte "Welcome Back" */}
      <Image style={styles.rocketImage} source={rocket} resizeMode="contain" />

      {/* Texte "Welcome Back" en gris */}
      <Text style={styles.welcomeBack}>Welcome Back</Text>

      {/* Bouton "Log in" qui redirige vers la page Login */}
      <Pressable
        style={styles.controlsButtons}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.welcomeText}>Log in</Text>
      </Pressable>

      {/* Mot de passe oublié */}
      <Text style={styles.forgotPassword}>Forgot password</Text>

      {/* Section pour l'inscription */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Not on <Text style={styles.duo1}>Duo</Text> yet? Create your account.
        </Text>
        {/* Redirection vers SignupScreen */}
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpNow}>Sign up now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  duoLibContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  duolib: {
    fontSize: 40,
    fontWeight: "700",
    color: "#090a0a",
  },
  duo: {
    color: "#090a0a",
  },
  lib: {
    color: "#FF4081",
  },
  welcomeBack: {
    fontSize: 32,
    fontWeight: "600",
    color: "#4e5d78", // Gris
    marginBottom: 30,
  },
  controlsButtons: {
    backgroundColor: "#37cdff",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 48,
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  signupContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  signupText: {
    fontSize: 18,
    color: "#4e5d78",
    textAlign: "center",
    marginBottom: 5,
  },
  duo1: {
    color: "#4e4eff",
  },
  signUpNow: {
    fontSize: 18,
    color: "#FF4081",
    textDecorationLine: "underline",
  },
  rocketImage: {
    width: 180, // Taille plus petite du rocket
    height: 170,
    marginBottom: 30, // Espacement entre l'image et le texte suivant
  },
  forgotPassword: {
    fontSize: 18,
    color: "#ffb400",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
