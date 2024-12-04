import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Image } from "react-native";
import { auth } from '../../../backend/firebaseConfig';  // Assurez-vous d'avoir la configuration Firebase
import { sendPasswordResetEmail } from 'firebase/auth'; // Fonction pour envoyer le lien de réinitialisation

// Importer l'image
import image8 from "../../images/image 8.png";  // Assurez-vous que le chemin est correct

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState(''); // État pour l'email
  const [error, setError] = useState(''); // Gestion des erreurs
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès

  // Fonction pour envoyer l'email de réinitialisation
  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      // Envoyer l'email de réinitialisation via Firebase
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('A reset link has been sent to your email!');
      setError('');
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Affichage de l'image au début */}
      <Image style={styles.image8} source={image8} resizeMode="contain" />
      
      <Text style={styles.resetTitle}>Reset your password</Text>

      {/* Champ de saisie de l'email */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail} // Mettre à jour l'email
        placeholderTextColor="#4e5d78"
      />

      {/* Affichage des erreurs */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      {/* Affichage du message de succès */}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      {/* Bouton pour envoyer l'email de réinitialisation */}
      <Pressable onPress={handlePasswordReset} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Send reset link</Text>
      </Pressable>

      {/* Retour à l'écran de connexion */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </Pressable>
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
  image8: {
    width: 90, 
    height: 85, 
    marginBottom: 40, 
  },
  resetTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#090a0a",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#4e5d78",
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#37cdff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  resetButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
  },
  backToLogin: {
    fontSize: 18,
    color: "#4e5d78",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default PasswordReset;
