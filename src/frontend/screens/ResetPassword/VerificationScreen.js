import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // Temps restant en secondes (2 minutes)
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false); // New state to track keyboard visibility
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const timerRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setErrorMessage('Code expired. Please request a new one.');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (verificationCode.join('')) {
      console.log('Verification code submitted:', verificationCode.join(''));
      clearInterval(timerRef.current); // Stop the timer on submit

      // Navigate to the Create Password Screen
      navigation.navigate('CreatePasswordScreen'); // Change to your actual screen name
    } else {
      console.log('Please enter the verification code');
    }
  };

  const handleResendCode = () => {
    setTimeLeft(120); // Reset time
    setErrorMessage('');
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setErrorMessage('Code expired. Please request a new one.');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    console.log('Verification code resent');
  };

  const handleChange = (text, index) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = text;
    setVerificationCode(updatedCode);

    if (text && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Handles different behavior for iOS and Android
    >
      <ImageBackground source={require('../../images/image 1.png')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.description}>Enter the verification code sent to user@email.com</Text>

          <View style={styles.inputContainer}>
            {verificationCode.map((code, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.input}
                value={code}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                placeholder="•"
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          <Text style={styles.timer}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} minutes
          </Text>

          {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleResendCode}>
            <Text style={styles.buttonText}>Resend Code</Text>
          </TouchableOpacity>

          {/* Footer */}
          {!keyboardVisible && (
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
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    margin: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  timer: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 10,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 14,
  },
  activeFooterText: {
    color: '#00ADEF',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 20,
    height: 2,
    backgroundColor: '#00ADEF',
    borderRadius: 2,
    transform: [{ translateX: -10 }],
  },
});

export default VerificationScreen;
