import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import logo from '../../images/fleur.png';
import smallLogo from '../../images/smalllogo.png';

const GoScreen = ({ navigation }) => {
  const { t } = useTranslation();

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
      <Text style={styles.subtitle}>{t('no_ads')}</Text>
      <Text style={styles.subtitle}>{t('no_data_sell')}</Text>
      <Text style={styles.subtitle}>{t('almost_free')}</Text>
      <Text style={styles.subtitle}>{t('community_message')}</Text>

      {/* Bouton Go */}
      <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go2')}>
        <Text style={styles.buttonText}>{t('go_button')}</Text>
      </Pressable>

      {/* Phrase "Already have an account? Login" */}
      <Pressable onPress={() => navigation.navigate('WelcomeScreen')}>
        <Text style={styles.loginText}>
          {t('login_prompt')} <Text style={styles.loginLink}>{t('login_link')}</Text>
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
    color: '#000000',
  },
  logoTextRose: {
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
    backgroundColor: '#37CDFF',
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
    color: '#FFA500',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default GoScreen;
