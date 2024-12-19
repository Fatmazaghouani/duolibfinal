import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking, Modal, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo.png';
import i18n from '../../../i18n';
import smallLogo from '../../images/smalllogo.png';
import CountryFlag from "react-native-country-flag";

const LanguageHomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      {/* Bouton de fermeture */}
      <Pressable onPress={() => navigation.navigate('Starting')} style={styles.closeButton}>
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
      <Text style={styles.title}>{t('choose_language')}</Text>
      
      <Pressable onPress={() => changeLanguage('fr')} style={styles.chatbotIconWrapper}>
        <CountryFlag isoCode="fr" size={25}/>
        <Text style={styles.chatbotText}>{t('french')}</Text>
      </Pressable>
      <Pressable onPress={() => changeLanguage('en')} style={styles.chatbotIconWrapper}>
      <CountryFlag isoCode="gb" size={25}/>
      <Text style={styles.chatbotText}>{t('english')}</Text>
      </Pressable>


      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>{t('go_button')}</Text>
        </Pressable>
        <Pressable style={styles.donateButton} onPress={() => Linking.openURL('https://cancer.bzh/faire-un-don?fbclid=IwY2xjawG1S-RleHRuA2FlbQIxMAABHWllCMDzQLXjp-Z12jpGWJG9KruSDVvUI3_vt-ej3U8xlacXckGinIU-MQ_aem_SeRWhoRaafyaxsaX3dAOTA')}>
          <Text style={styles.buttonText}>{t('donate_button')}</Text>
        </Pressable>
      </View>

      {/* Phrase "Already have an account? Login" */}
      <View style={styles.logInContainer}>
        <Text style={styles.logInText}>
        {t('already_have_account')}{' '}
          <Text
            style={styles.logInLink}
            onPress={() => navigation.navigate('WelcomeScreen')}> 
            {t('log_in')}
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
    left: 20, // Position à gauche
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
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
  },
  loginText: {
    color: '#FFA500', // Couleur orange pour "Log in"
    fontWeight: 'bold',
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
  chatbotIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,  // Réduire la marge si nécessaire
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20, // Réduire le rayon du coin pour un cadre plus petit
  },
  chatbotText: {
    fontSize: 25,  // Réduire la taille de texte pour un aspect plus compact
    marginLeft: 8,  // Réduire l'espacement entre l'icône et le texte
    color: '#2196F3',
  }
});

export default LanguageHomeScreen;