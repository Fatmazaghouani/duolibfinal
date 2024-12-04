import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TextInput, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { auth, db } from '../../../backend/firebaseConfig';  // Assurez-vous d'avoir la configuration Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Fonction pour se connecter avec l'email et le mot de passe

// Importer les images nécessaires
import smallLogo from "../../images/smalllogo.png";
import image8 from "../../images/image 8.png"; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // État pour l'email
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [showPassword, setShowPassword] = useState(false); // Afficher/masquer le mot de passe
  const [error, setError] = useState(''); // État pour gérer les erreurs de connexion

  const handleLogin = async () => {
    try {
      // Connexion avec Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Feed'); // Si la connexion réussit, on navigue vers l'écran Authenticated
    } catch (err) {
      // En cas d'erreur
      setError('Invalid email or password. Please try again.');
    }
  };

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

      {/* Image à la place du rocket */}
      <Image style={styles.image8} source={image8} resizeMode="contain" />

      {/* Texte "Keep your password secret" */}
      <Text style={styles.keepPasswordSecret}>Keep your password secret</Text>

      {/* Affichage des erreurs */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Champs de saisie */}
      <View style={styles.inputContainer}>
        {/* Champ Email */}
        <View style={styles.inputWrapper}>
          <Icon name="envelope" size={20} color="#4e5d78" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Your email"
            value={email}
            onChangeText={setEmail} // Mettre à jour l'email
            placeholderTextColor="#4e5d78"
          />
        </View>

        {/* Champ Create Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#4e5d78" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Create Password"
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword} // Mettre à jour le mot de passe
            placeholderTextColor="#4e5d78"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-slash" : "eye"} 
              size={20}
              color="#4e5d78"
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>

      {/* Bouton Log In */}
      <View style={styles.controlsButtons}>
        <Text style={styles.welcomeText} onPress={handleLogin}>
          Log in
        </Text>
      </View>

      {/* Mot de passe oublié */}
     
      <Text style={styles.forgotPassword} onPress={() => navigation.navigate('PasswordReset')}>
  Forgot password
</Text>

      {/* Section pour l'inscription */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Not on <Text style={styles.duo1}>Duo</Text> yet? Create your account.
        </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
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
  keepPasswordSecret: {
    fontSize: 20, 
    fontWeight: "600",
    color: "#4e5d78", 
    marginBottom: 30,
    textAlign: "center", 
  },
  image8: {
    width: 90, 
    height: 85, 
    marginBottom: 30, 
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 10, 
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#4e5d78",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
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
  forgotPassword: {
    fontSize: 18,
    color: "#ffb400",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
