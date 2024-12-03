import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importation du module pour choisir ou prendre une photo

const Photo0 = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Demander la permission d'accès à la caméra et ouvrir la caméra
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1], // Option pour avoir une image carrée (1:1)
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri); // Mettre l'image sélectionnée dans l'état
      }
    } else {
      alert('Permission to access camera is required!');
    }
  };

  const handleNext = () => {
    navigation.navigate('AccountVerification'); // Modifier selon la navigation suivante
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header avec l'image et le texte */}
      <View style={styles.headerContainer}>
        <Image source={require('../../images/image 15.png')} style={styles.image15Icon} />
        <Text style={styles.profileText}>
          Pro<Text style={styles.proText}>Pro</Text>
        </Text>
      </View>

      {/* Texte demandant d'ajouter une photo */}
      <Text style={styles.addPhotoText}>You can add a photo to customize your profile</Text>

      {/* Image principale avec une action pour prendre une photo */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleTakePhoto}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image17Icon} />
          ) : (
            <Image source={require('../../images/image 17.png')} style={styles.image17Icon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Texte pour prendre une photo par défaut */}
      <Text style={styles.orLetsTake}>Or let’s take one by default</Text>

      {/* Image secondaire avec taille très réduite et centrée */}
      <View style={styles.imageContainer}>
        <Image source={require('../../images/image 18.png')} style={styles.image18Icon} />
      </View>

      {/* Bouton Next */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next - Go to step 4</Text>
      </TouchableOpacity>

      {/* Lien de connexion si l'utilisateur a déjà un compte */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.alreadyHaveAnContainer}>
          <Text style={styles.alreadyHaveAn}>Already have an account ?</Text>
          <Text style={styles.text}>{` `}</Text>
          <Text style={styles.loginHere}>Login here</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centre tout le contenu
    alignItems: 'center', // Centre horizontalement
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image15Icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  profileText: {
    fontSize: 40,
    lineHeight: 60,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#4E5D78',
    marginLeft: 10,
  },
  proText: {
    color: '#FFB400',
  },
  addPhotoText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#4e5d78',
    textAlign: 'center',
    width: 327,
    marginBottom: 20, // Ajout de marge pour espacement
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Centre l'image dans le conteneur
    marginBottom: 5,
  },
  // Image dans le cercle avec bordure
  image17Icon: {
    width: 150, // Taille de l'image dans le cercle
    height: 150,
    borderRadius: 75, // Rend l'image circulaire
    borderWidth: 5,
    borderColor: '#A4D4AE', // Bordure en couleur #FFB400
    resizeMode: 'cover', // Couvre le cercle
  },
  orLetsTake: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#4e5d78',
    textAlign: 'center',
    width: 319,
    marginBottom: 5,
  },
  image18Icon: {
    width: 300, // Taille très réduite
    height: 200,
    resizeMode: 'contain',
  },
  nextButton: {
    backgroundColor: '#f37d4a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  nextText: {
    fontSize: 18,
    color: '#fff',
  },
  alreadyHaveAnContainer: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
  },
  alreadyHaveAn: {
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#4e5d78',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#202325',
  },
  loginHere: {
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#ffb400',
  },
});

export default Photo0;
