import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking } from 'react-native';
import logo from '../../images/logo.png'; // Chemin vers le logo principal
import smallLogo from '../../images/smalllogo.png'; // Petite image à gauche du titre

const SupportDuolibScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Croix rouge à gauche */}
      <Pressable onPress={() => navigation.navigate('Starting')} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Titre avec petite icône */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logo}>
          <Text style={styles.logoPartBlack}>Duo</Text>
          <Text style={styles.logoPartPink}>lib</Text>
        </Text>
      </View>

      {/* Logo principal */}
      <Image source={logo} style={styles.logoImage} />

      {/* Contenu */}
      <Text style={styles.title}>Support Duolib</Text>
      <Text style={styles.content}>
        Your contributions ensure that Duolib will remain free and accessible for millions of people around the world.
      </Text>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
        <Pressable style={styles.donateButton} onPress={() => Linking.openURL('https://cancer.bzh/faire-un-don?fbclid=IwY2xjawG1S-RleHRuA2FlbQIxMAABHWllCMDzQLXjp-Z12jpGWJG9KruSDVvUI3_vt-ej3U8xlacXckGinIU-MQ_aem_SeRWhoRaafyaxsaX3dAOTA')}>
          <Text style={styles.buttonText}>Donate</Text>
        </Pressable>
      </View>

      {/* Lien Already have an account */}
      <View style={styles.logInContainer}>
        <Text style={styles.logInText}>
          Already have an account?{' '}
          <Text
            style={styles.logInLink}
            onPress={() => navigation.navigate('WelcomeScreen')}>
            Log in
          </Text>
        </Text>
      </View>
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
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20, // Croix rouge alignée à gauche
  },
  closeText: {
    fontSize: 30,
    color: '#FF0000', // Rouge
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  logoPartBlack: {
    color: '#000000',
  },
  logoPartPink: {
    color: '#FF4081',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
    color: '#444444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  goButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
  },
  donateButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  logInContainer: {
    marginTop: 20,
  },
  logInText: {
    fontSize: 16,
    color: '#444444',
    textAlign: 'center',
  },
  logInLink: {
    color: '#FFAA00', // Orange pour "Log in"
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SupportDuolibScreen;