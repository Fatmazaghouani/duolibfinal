import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking } from 'react-native';
import logo from '../../images/logo.png'; // Assurez-vous que ce chemin est correct
import smallLogo from '../../images/smalllogo.png'; // Petite image à gauche du titre

const OurPhilosophy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Bouton de fermeture (croix rouge à gauche) */}
      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Titre avec logo */}
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
      <Text style={styles.title}>Our Philosophy</Text>
      <Text style={styles.content}>
        The heart and soul of Duolib is our community and donors – all united to share unlimited access to reliable information and to help people with cancer or/and a rare disease.
      </Text>
      <Text style={styles.content}>Your donations</Text>
      <Text style={styles.content}>
        Duolib is free, available to everyone with no ads and pharmaceutical partnership. Please help us to maintain our websites free.
      </Text>
      <Text style={styles.accountText}>
        Already have an account? <Text style={styles.logIn}>Log in</Text>
      </Text>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
        <Pressable 
          style={styles.donateButton} 
          onPress={() => Linking.openURL('https://cancer.bzh/faire-un-don?fbclid=IwY2xjawG1S-RleHRuA2FlbQIxMAABHWllCMDzQLXjp-Z12jpGWJG9KruSDVvUI3_vt-ej3U8xlacXckGinIU-MQ_aem_SeRWhoRaafyaxsaX3dAOTA')}
        >
          <Text style={styles.buttonText}>Donate</Text>
        </Pressable>
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
    left: 20,
  },
  closeText: {
    fontSize: 30,
    color: '#ff0000',
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
  accountText: {
    fontSize: 16,
    color: '#444444',
    marginTop: 20,
    textAlign: 'center',
  },
  logIn: {
    color: '#FF8800',
    fontWeight: '600',
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
});

export default OurPhilosophy;