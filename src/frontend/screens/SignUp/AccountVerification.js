import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '../../../backend/firebaseConfig'; // Assurez-vous que Firebase est bien configuré
import { sendEmailVerification } from 'firebase/auth'; // Importer la fonction d'email de vérification

// Assuming the image is stored locally in the project folder
import checkImage from '../../images/image 16.png'; // Update the path to your image
import image39 from '../../images/image 39.png'; // Update the path to image 39

const AccountVerification = () => {
  // Function to send verification email
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        console.log('Verification email sent');
        Alert.alert('Verification Email Sent', 'Please check your inbox for the verification email.');
      } catch (error) {
        console.error('Error sending verification email:', error.message);
        Alert.alert('Error', 'There was an issue sending the verification email.');
      }
    }
  };

  useEffect(() => {
    // Send email verification once when the page is loaded
    sendVerificationEmail();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with image and "Check" text */}
      <View style={styles.header}>
        <Image source={checkImage} style={styles.checkImage} />
        <Text style={styles.check}>
          <Text style={styles.che}>Che</Text>
          <Text style={styles.ck}>ck</Text>
        </Text>
      </View>

      {/* Image 39 placed under the "Check" text */}
      <Image source={image39} style={styles.image39} />

      <Text style={styles.subtitle}>We have to check your identity</Text>
      <Text style={styles.description}>
        We have created your account. But before you start, you will have to activate it. We have sent an activation code to the email you provided during registration. It should arrive in a couple of minutes!
      </Text>

      <Text style={styles.timerText}>
        If the email has not arrived, please check your inbox or spam folder.
      </Text>

      <Text style={styles.errorText}>
        Did you receive this message in error? Let us know with a copy of this email to contact@duo.lib.com and we won’t contact you again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -30, // Move it higher
  },
  checkImage: {
    width: 60,  // Increase the size of the image
    height: 60,
    resizeMode: 'contain',
    marginRight: 10, // Space between the image and text
  },
  check: {
    fontSize: 50,  // Increase font size for "Check"
    lineHeight: 70,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  che: {
    color: '#4e5d78', // Grey color for "Che"
  },
  ck: {
    color: '#62ffff', // Cyan color for "ck"
  },
  image39: {
    width: 150,  // Adjust the size of image 39
    height: 150,
    resizeMode: 'contain',
    marginTop: 20, // Space between check and image39
  },
  subtitle: {
    fontSize: 20,
    color: '#4E5D78',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6C6C6C',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 16,
    color: '#6C6C6C',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#6C6C6C',
    textAlign: 'center',
  },
});

export default AccountVerification;
