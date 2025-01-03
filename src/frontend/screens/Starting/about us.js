import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo.png';
import smallLogo from '../../images/smalllogo.png';

const AboutUsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <Pressable onPress={() => navigation.navigate('Starting')} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Title with Logo */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logo}>
          <Text style={styles.logoPartBlack}>Duo</Text>
          <Text style={styles.logoPartPink}>lib</Text>
        </Text>
      </View>

      {/* Main Logo */}
      <Image source={logo} style={styles.logoImage} />

      {/* Content */}
      <Text style={styles.title}>{t('about_us_title')}</Text>
      <Text style={styles.content}>{t('about_us_content')}</Text>


      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.goButton} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>{t('go_button')}</Text>
        </Pressable>
        <Pressable
          style={styles.donateButton}
          onPress={() => Linking.openURL('https://cancer.bzh/faire-un-don?fbclid=IwY2xjawG1S-RleHRuA2FlbQIxMAABHWllCMDzQLXjp-Z12jpGWJG9KruSDVvUI3_vt-ej3U8xlacXckGinIU-MQ_aem_SeRWhoRaafyaxsaX3dAOTA')}
        >
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
    top: 20,
    left: 20,
  },
  closeText: {
    fontSize: 24,
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
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#444444',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  accountText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
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

export default AboutUsScreen;
