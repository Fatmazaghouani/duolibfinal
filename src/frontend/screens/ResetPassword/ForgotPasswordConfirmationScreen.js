import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes

const ForgotPasswordConfirmationScreen = () => {
  const navigation = useNavigation(); // Hook pour la navigation

  // Fonction appelée lors du clic sur "Next"
  const handleNext = () => {
    // Naviguer directement vers VerificationScreen
    navigation.navigate('VerificationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground
          source={require('../../images/image 1.png')}
          style={styles.imageBackground}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={30} color="#555" />
        </TouchableOpacity>
        <Text style={styles.searchPlaceholder}>🔍 Search for something here...</Text>
        <TouchableOpacity>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.description}>
            You have received an email or a notification with a verification code to reset your password. Please check your inbox and spam.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Resend Verification Code</Text>
          </TouchableOpacity>

          {/* Le bouton Next qui mène à la page de verification */}
          <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#007BFF' }]} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="home-outline" size={25} color="#777" />
            <Text style={styles.footerText}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Icon name="people-outline" size={25} color="#777" />
            <Text style={styles.footerText}>Duo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Icon name="chatbubbles-outline" size={25} color="#00ADEF" />
            <Text style={[styles.footerText, styles.activeFooterText]}>Community</Text>
            <View style={styles.activeIndicator} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Icon name="newspaper-outline" size={25} color="#777" />
            <Text style={styles.footerText}>Forum</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Icon name="notifications-outline" size={25} color="#777" />
            <Text style={styles.footerText}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerItem}>
            <Icon name="settings-outline" size={25} color="#777" />
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    marginBottom: 50,
  },
  bottomContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    zIndex: 10,
  },
  searchPlaceholder: {
    color: '#333',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#777',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 14,
    marginTop: 5,
  },
  activeFooterText: {
    color: '#00ADEF',
  },
  activeIndicator: {
    width: 30,
    height: 3,
    backgroundColor: '#00ADEF',
    marginTop: 5,
    borderRadius: 2,
  },
});

export default ForgotPasswordConfirmationScreen;