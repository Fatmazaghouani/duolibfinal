import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Importer les images comme variables
import smallLogo from "../../images/smalllogo.png";
import heartIcon from "../../images/coeur.png";
import step1Image from "../../images/image 11.png";
import step2Image from "../../images/image 14.png";
import step3Image from "../../images/image 15.png";
import step4Image from "../../images/image 16.png";
import downArrow from "../../images/Vector 13.png";

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Icône cœur dans le coin supérieur droit */}
      <Image source={heartIcon} style={styles.heartIcon} />

      {/* Logo et texte "Duolib" centrés */}
      <View style={styles.logoContainer}>
        <Image source={smallLogo} style={styles.logo} />
        <Text style={styles.duolibText}>
          <Text style={styles.duo}>Duo</Text>
          <Text style={styles.lib}>lib</Text>
        </Text>
      </View>

      {/* Titre */}
      <Text style={styles.title}>Your account will be created in four steps</Text>

      {/* Étapes */}
      <View style={styles.stepContainer}>
        <Image source={step1Image} style={styles.stepImage} />
        <Text style={styles.stepText}>Password</Text>
      </View>
      <Image source={downArrow} style={styles.arrow} />

      <View style={styles.stepContainer}>
        <Image source={step2Image} style={styles.stepImage} />
        <Text style={styles.stepText}>Name</Text>
      </View>
      <Image source={downArrow} style={styles.arrow} />

      <View style={styles.stepContainer}>
        <Image source={step3Image} style={styles.stepImage} />
        <Text style={styles.stepText}>Profile</Text>
      </View>
      <Image source={downArrow} style={styles.arrow} />

      <View style={styles.stepContainer}>
        <Image source={step4Image} style={styles.stepImage} />
        <Text style={styles.stepText}>Check</Text>
      </View>

      {/* Bouton Create Account */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Signup2")} // Navigation vers Signup2
      >
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>

      {/* Lien pour se connecter */}
      <Text style={styles.loginText}>
        Have already an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 5,
  },
  duolibText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#090a0a",
  },
  duo: {
    color: "#090a0a",
  },
  lib: {
    color: "#FF4081",
  },
  title: {
    fontSize: 24,
    color: "#555",
    textAlign: "center",
    marginVertical: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  stepImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 5,
  },
  stepText: {
    fontSize: 20,
    color: "#333",
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginVertical: 1,
  },
  createAccountButton: {
    marginTop: 20,
    backgroundColor: "#37cdff",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#37cdff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontSize: 18,
    color: "#777",
  },
  loginLink: {
    color: "#ffb400",
    fontWeight: "bold",
  },
});

export default Signup;
