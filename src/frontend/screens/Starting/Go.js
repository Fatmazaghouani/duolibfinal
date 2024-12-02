import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import logo from '../../images/fleur.png'; // Assurez-vous que ce chemin est correct
import smallLogo from '../../images/smalllogo.png'; // Petite image à gauche du titre

const GoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo et Titre */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logoTextBlack}>Duo</Text>
        <Text style={styles.logoTextRose}>Lib</Text>
      </View>

      {/* Logo agrandi */}
      <Image source={logo} style={styles.largeLogo} />

      {/* Texte avec même style */}
      <Text style={styles.subtitle}>No ads</Text>
      <Text style={styles.subtitle}>No data sell</Text>
      <Text style={styles.subtitle}>and almost free!</Text>
      <Text style={styles.subtitle}>
        The heart and soul of Duolib is our global community, and donors.
      </Text>

      {/* Bouton Go */}
      <Pressable style={styles.goButton} onPress={() => {navigation.navigate('Go2')}}>
        <Text style={styles.buttonText}>Go</Text>
      </Pressable>

      {/* Phrase "Already have an account? Login" */}
      <Pressable onPress={() => navigation.navigate('WelcomeScreen')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoTextBlack: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Noir pour la première moitié
  },
  logoTextRose: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4081', // Rose pour la deuxième moitié
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  largeLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
  },
  goButton: {
    backgroundColor: '#37CDFF', // Bleu
    padding: 12,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4C4C4C',
    fontWeight: '500',
  },
  loginLink: {
    color: '#FFA500', // Orange pour le mot "Login"
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default GoScreen;