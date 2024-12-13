import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasswordSuccessScreen = () => {
  const navigation = useNavigation();

  const handleLoginRedirect = () => {
    // Rediriger l'utilisateur vers la page de connexion
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../../images/image 1.png')} // Votre image de fond
      style={styles.container}
      imageStyle={styles.imageBackground} // Définir la taille de l'image si nécessaire
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>PASSWORD UPDATED</Text>
        <Text style={styles.message}>Your password has been updated successfully.</Text>

        <TouchableOpacity style={styles.button} onPress={handleLoginRedirect}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Légère opacité pour améliorer la lisibilité
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageBackground: {
    resizeMode: 'cover', // Assurez-vous que l'image couvre tout l'écran
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Assurez-vous que le texte reste visible
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white', // Assurez-vous que le texte reste visible
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 70, // Augmentation de la largeur du bouton avec un padding plus large
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Largeur à 80% de l'écran
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordSuccessScreen;