import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import des icônes
import { auth } from '../../../backend/firebaseConfig'; 
import { createUserWithEmailAndPassword } from '@firebase/auth';

// Import de l'image
import image11 from '../../images/image 11.png'; // Nouvelle image

const Signup2 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Conditions de validation du mot de passe
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSpecialChar, setHasSpecialChar] = useState(true);

  // Fonction de validation du mot de passe
  const passwordValidation = (password) => {
    setHasUppercase(/[A-Z]/.test(password)); // Majuscule
    setHasLowercase(/[a-z]/.test(password)); // Minuscule
    setHasNumber(/\d/.test(password)); // Nombre
    setHasSpecialChar(/[!@#$%^&*]/.test(password)); // Caractère spécial
  };

  // Fonction pour inscrire un nouvel utilisateur via Firebase
  const handleSignUp = async () => {
    if (password === confirmPassword && email && password.length >= 8) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Signup3'); // Naviguer vers Signup3
      } catch (error) {
        console.error('Error during sign up:', error.message);
        alert(error.message); // Afficher l'erreur en cas d'échec
      }
    } else {
      alert('Please make sure the passwords match and meet the required criteria.');
    }
  };

  // Fonction pour la modification du mot de passe
  const handlePasswordChange = (text) => {
    setPassword(text);
    passwordValidation(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo avec la nouvelle image */}
      <View style={styles.imageContainer}>
        <Image source={image11} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={styles.passText}>Pass</Text>
          <Text style={styles.wordText}>word</Text>
        </Text>
      </View>

      {/* Phrase "Keep your password secret" */}
      <Text style={styles.secretPhrase}>
        Keep your password secret
      </Text>

      {/* Conditions de validation du mot de passe */}
      <Text style={styles.subtitle}>
        Password must be at least 8 characters long with {'\n'}
        <Text style={{ color: hasUppercase ? '#555' : 'red' }}>1 uppercase</Text>, {'\n'}
        <Text style={{ color: hasLowercase ? '#555' : 'red' }}>1 lowercase</Text>, {'\n'}
        <Text style={{ color: hasNumber ? '#555' : 'red' }}>1 number</Text>, {'\n'}
        and <Text style={{ color: hasSpecialChar ? '#555' : 'red' }}>1 special character</Text>.
        {'\n'}It should be something others couldn't guess.
      </Text>

      {/* Champs de saisie */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
          <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIconContainer}>
          <Icon name={isConfirmPasswordVisible ? "eye-slash" : "eye"} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Texte de consentement */}
      <Text style={styles.termsText}>
        By signing into this application and creating an account, you're agreeing permission to display cookies, our{' '}
        <Text style={styles.link}>Privacy Policy</Text> and{' '}
        <Text style={styles.link}>Terms of Use</Text>.
      </Text>

      {/* Bouton Sign Up */}
      <TouchableOpacity style={styles.nextButton} onPress={handleSignUp}>
        <Text style={styles.nextButtonText}>Next - Go to step 2</Text>
      </TouchableOpacity>

      {/* Texte avec lien "Log in" */}
      <Text style={styles.loginText}>
        Have already an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row', // Pour aligner l'image et le texte sur la même ligne
    alignItems: 'center', // Pour centrer l'image et le texte verticalement
    marginBottom: 30, // Augmentation de l'espacement sous l'image
  },
  logo: {
    width: 100,  // Taille réduite de l'image
    height: 100,  // Taille réduite de l'image
    resizeMode: 'contain',
    marginRight: 15, // Espacement entre l'image et le texte
  },
  title: {
    fontSize: 30, // Agrandir le texte "Password"
    fontWeight: 'bold',
    color: '#333',
  },
  passText: {
    color: '#333', // Gris très foncé pour "Pass"
  },
  wordText: {
    color: '#B4FF00', // Vert doux pour "word"
  },
  secretPhrase: {
    fontSize: 22, // Agrandir la taille du texte
    color: '#4E5D78', // Changer la couleur à #4E5D78
    textAlign: 'center',
    marginBottom: 20, // Espacement entre la phrase et la validation du mot de passe
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40, // Augmenter l'espacement entre le texte de validation et les champs
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Augmenter l'espacement entre les champs
    width: '100%',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  eyeIconContainer: {
    padding: 5,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 30, // Espacement avant le bouton
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  nextButton: {
    backgroundColor: '#50C9FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30, // Espacement après le bouton
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    color: '#FF8B33',
    fontWeight: 'bold',
  },
});

export default Signup2;
