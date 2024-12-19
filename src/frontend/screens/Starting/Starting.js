import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo.png';
import smallLogo from '../../images/smalllogo.png';

const Starting = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      {/* Titre Duolib */}
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
      <Text style={styles.title}>{t('help_us')}</Text>

      {/* Liens avec icônes */}
      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate('Our philosophy')} style={styles.linkWrapper}>
          <Icon name="book-outline" size={20} color="#4CAF50" style={styles.icon} />
          <Text style={[styles.link, styles.philosophy]}>{t('our_philosophy')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Transparency')} style={styles.linkWrapper}>
          <Icon name="eye-outline" size={20} color="#03A9F4" style={styles.icon} />
          <Text style={[styles.link, styles.transparency]}>{t('transparency')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('support Duolib')} style={styles.linkWrapper}>
          <Icon name="heart-outline" size={20} color="#FF6F61" style={styles.icon} />
          <Text style={[styles.link, styles.support]}>{t('support_duolib')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('about us')} style={styles.linkWrapper}>
          <Icon name="information-circle-outline" size={20} color="#FFC107" style={styles.icon} />
          <Text style={[styles.link, styles.about]}>{t('about_us')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('get in touch')} style={styles.linkWrapper}>
          <Icon name="chatbubble-ellipses-outline" size={20} color="#8BC34A" style={styles.icon} />
          <Text style={[styles.link, styles.contact]}>{t('contact_us')}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('LanguageHome')} style={styles.linkWrapper}>
          <Icon name="language" size={20} color="#00BCD4" style={styles.icon} />
          <Text style={[styles.link, styles.contact, { color: '#00BCD4' }]}>{t('choose_language')}</Text>
        </Pressable>

      </View>

      {/* Boutons */}
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

    
      {/* Icône chatbot */}
      <Pressable onPress={() => navigation.navigate('ChatbotScreen')} style={styles.chatbotIconWrapper}>
        <Icon name="chatbubble-ellipses-outline" size={50} color="#2196F3" />
        <Text style={styles.chatbotText}>{t('chat_with_duobot')}</Text>
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
    fontSize: 14,  // Réduire la taille de texte pour un aspect plus compact
    marginLeft: 8,  // Réduire l'espacement entre l'icône et le texte
    color: '#2196F3',
  }
  
});

export default Starting;
