import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import logo from '../../images/@.png';
import smallLogo from '../../images/smalllogo.png';

const ReponseScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // "Have an Account" Component
  const HaveAnAccount = () => {
    return (
      <Text style={styles.haveAnAccountContainer}>
        <Text style={styles.haveAnAccount}>
          <Text style={styles.haveAnAccount1}>{t('have_account')}</Text>
          <Text style={styles.text}>{` `}</Text>
        </Text>
        <Text style={styles.logIn} onPress={() => navigation.navigate('WelcomeScreen')}>{t('log_in')}</Text>
      </Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Close button */}
      <Pressable onPress={() => navigation.navigate('Starting')} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Title with logo */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logoText}>DuoLib</Text>
      </View>

      {/* Main Logo */}
      <Image source={logo} style={styles.logoImage} />

      <Text style={styles.title}>{t('get_in_touch')}</Text>

      {/* Main message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{t('response_message_1')}</Text>
        <Text style={styles.messageText}>{t('response_message_2')}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.createAccountButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>{t('create_account')}</Text>
        </Pressable>
        {/* Change the navigation from FAQ to Help */}
        <Pressable style={styles.faqButton} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.buttonText}>{t('faq')}</Text>
        </Pressable>
      </View>

      {/* "Have an Account" Section */}
      <HaveAnAccount />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    color: '#FF0000',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  messageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#444444',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  createAccountButton: {
    backgroundColor: '#37CDFF',
    padding: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  faqButton: {
    backgroundColor: '#FF87A0',
    padding: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  haveAnAccountContainer: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginTop: 20,
  },
  haveAnAccount: {
    color: '#202325',
  },
  haveAnAccount1: {
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  logIn: {
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#FFB400',
  },
});

export default ReponseScreen;