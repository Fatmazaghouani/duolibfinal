import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking } from 'react-native'; // Importer Linking
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../../images/logo.png'; // Assurez-vous que ce chemin est correc
import smallLogo from '../../images/smalllogo.png'; // Petite image à gauche du titre

const Starting = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Titre Duolib avec une petite image */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logo}>
          <Text style={styles.logoPartBlack}>Duo</Text>
          <Text style={styles.logoPartPink}>lib</Text>
        </Text>
      </View>

      {/* Logo principal */}
      <Image source={logo} style={styles.logoImage} />

      {/* Sous-titre */}
      <Text style={styles.title}>Help us to maintain Duolib free</Text>

      {/* Liens avec icônes */}
      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate('Our philosophy')} style={styles.linkWrapper}>
          <Icon name="book-outline" size={20} color="#4CAF50" style={styles.icon} />
          <Text style={[styles.link, styles.philosophy]}>Our philosophy</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Transparency')} style={styles.linkWrapper}>
          <Icon name="eye-outline" size={20} color="#03A9F4" style={styles.icon} />
          <Text style={[styles.link, styles.transparency]}>Transparency</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('support Duolib')} style={styles.linkWrapper}>
          <Icon name="heart-outline" size={20} color="#FF6F61" style={styles.icon} />
          <Text style={[styles.link, styles.support]}>Support Duolib</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('about us')} style={styles.linkWrapper}>
          <Icon name="information-circle-outline" size={20} color="#FFC107" style={styles.icon} />
          <Text style={[styles.link, styles.about]}>About us</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('get in touch')} style={styles.linkWrapper}>
          <Icon name="chatbubble-ellipses-outline" size={20} color="#8BC34A" style={styles.icon} />
          <Text style={[styles.link, styles.contact]}>Contact us</Text>
        </Pressable>
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>Go!</Text>
        </Pressable>
        {/* Bouton Donate avec ouverture de site web */}
        <Pressable
          style={styles.donateButton}
          onPress={() => Linking.openURL('https://cancer.bzh/faire-un-don?fbclid=IwY2xjawG1S-RleHRuA2FlbQIxMAABHWllCMDzQLXjp-Z12jpGWJG9KruSDVvUI3_vt-ej3U8xlacXckGinIU-MQ_aem_SeRWhoRaafyaxsaX3dAOTA')}>
        
          <Text style={styles.buttonText}>Donate</Text>
        </Pressable>
      </View>

      {/* Lien de connexion */}
      <Pressable onPress={() => navigation.navigate('log in')}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    width: 30, // Taille de la petite image
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 48, // Taille du titre
    fontWeight: 'bold',
  },
  logoPartBlack: {
    color: '#000000', // Noir
  },
  logoPartPink: {
    color: '#FF4081', // Rose
  },
  logoImage: {
    width: 150, // Taille du logo principal agrandie
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#444444',
  },
  linksContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'flex-start',
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    fontSize: 18,
    fontWeight: '500',
  },
  philosophy: {
    color: '#4CAF50',
  },
  transparency: {
    color: '#03A9F4',
  },
  support: {
    color: '#FF6F61',
  },
  about: {
    color: '#FFC107',
  },
  contact: {
    color: '#8BC34A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  goButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 30, // Boutons ovales
    width: '48%',
    alignItems: 'center',
  },
  donateButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 30, // Boutons ovales
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    marginTop: 10,
    fontSize: 14,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
});

export default Starting;