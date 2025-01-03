import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view'; // Importer PagerView pour le défilement horizontal
import { useTranslation } from 'react-i18next';
import logo from '../../images/chat.png';
import smallLogo from '../../images/smalllogo.png';

const Go2Screen = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0); // Suivre la page actuelle

  // Fonction pour changer de page et mettre à jour le currentPage
  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      {/* Logo et Titre */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logoTextBlack}>Duo</Text>
        <Text style={styles.logoTextRose}>Lib</Text>
      </View>

      {/* Logo agrandi (ajusté à une taille plus petite) */}
      <Image source={logo} style={styles.largeLogo} />

      {/* PagerView pour le défilement horizontal */}
      <PagerView style={styles.pagerView} initialPage={0} onPageSelected={handlePageSelected}>
        <View style={styles.page}>
          <Text style={styles.pageText}>{t('go2_page1')}</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.pageText}>{t('go2_page2')}</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.pageText}>{t('go2_page3')}</Text>
        </View>
        <View style={styles.page}>
          <Text style={styles.pageText}>{t('go2_page4')}</Text>
        </View>
      </PagerView>

      {/* Indicateurs de page (points en dessous du scroll) */}
      <View style={styles.pageIndicatorContainer}>
        <Text style={[styles.pageIndicator, currentPage === 0 && styles.activeIndicator]}>●</Text>
        <Text style={[styles.pageIndicator, currentPage === 1 && styles.activeIndicator]}>●</Text>
        <Text style={[styles.pageIndicator, currentPage === 2 && styles.activeIndicator]}>●</Text>
        <Text style={[styles.pageIndicator, currentPage === 3 && styles.activeIndicator]}>●</Text>
      </View>

     <Pressable style={styles.goButton} onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.buttonText}>{t('create_account_button')}</Text>
</Pressable>

      {/* Phrase "Already have an account? Login" */}
      <Pressable onPress={() => navigation.navigate('WelcomeScreen')}>
        <Text style={styles.loginText}>
          {t('already_have_account')} <Text style={styles.loginLink}>{t('login')}</Text>
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
    backgroundColor: '#ffffff', // Fond blanc pour toute la page
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
    color: '#000000', // Noir pour la première moitié
  },
  logoTextRose: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4081', // Rose pour la deuxième moitié
  },
  
  largeLogo: {
    width: 150,  // Taille du logo légèrement réduite
    height: 150, // Taille du logo légèrement réduite
    marginBottom: 20, // Marge pour espacer le logo du reste du contenu
  },
  subtitle: {
    fontSize: 20, // Taille uniforme du texte
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000', // Couleur du texte ajustée pour plus de contraste
  },
  pagerView: {
    width: '100%',
    height: 200, // Hauteur pour vos pages
    marginBottom: 20,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // Supprimé le fond gris, pour avoir le même fond que le reste de la page
  },
  pageText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4E5D78',
    textAlign: 'center', // Centrer le texte
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pageIndicator: {
    fontSize: 24,
    color: '#E3E5E5', // Couleur des points
    marginHorizontal: 5,
  },
  activeIndicator: {
    color: '#FF4081', // Couleur des points actifs (rose)
  },
  goButton: {
    backgroundColor: '#37CDFF', // Bleu
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
    color: '#4C4C4C', // Couleur gris foncé pour le texte principal
    fontWeight: '500',
  },
  loginLink: {
    color: '#FFA500', // Orange pour le mot "Login"
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default Go2Screen;
