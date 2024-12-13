import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // Importation de l'icône d'œil

const CreatePasswordScreen = () => {
  const navigation = useNavigation();

  // State pour les mots de passe et les erreurs
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour la visibilité du mot de passe
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // État pour la visibilité du mot de passe de confirmation
  
  // Fonction de validation du mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Fonction pour vérifier la validité des critères du mot de passe
  const checkPasswordCriteria = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    return criteria;
  };

  // Fonction de gestion du bouton Submit
  const handleSubmit = () => {
    console.log('Button pressed'); // Vérification dans la console
    if (!validatePassword(password)) {
      setErrorMessage('Password must be 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      // Si tout est valide, rediriger vers la page de succès
      console.log('Navigating to PasswordSuccessScreen');
      navigation.navigate('PasswordSuccessScreen');
    }
  };

  // Vérification en temps réel des critères du mot de passe
  const criteria = checkPasswordCriteria(password);
  const isPasswordValid = Object.values(criteria).every(Boolean);
  const doPasswordsMatch = password === confirmPassword;

  return (
    <ImageBackground source={require('../../images/image 1.png')} style={styles.background}> {/* Utilisation du chemin relatif pour l'image de fond */}
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create a New Password</Text>

        {/* Champ du mot de passe avec icône pour afficher/masquer */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!passwordVisible} // Contrôler la visibilité du mot de passe
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Champ de confirmation avec icône pour afficher/masquer */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible} // Contrôler la visibilité du mot de passe de confirmation
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
            <Icon name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Affichage des critères de mot de passe */}
        <View style={styles.criteriaContainer}>
          <Text style={styles.criteriaText}>Password Criteria:</Text>
          <Text style={[styles.criteria, criteria.length ? styles.valid : styles.invalid]}>
            8 characters long
          </Text>
          <Text style={[styles.criteria, criteria.uppercase ? styles.valid : styles.invalid]}>
            One uppercase letter
          </Text>
          <Text style={[styles.criteria, criteria.lowercase ? styles.valid : styles.invalid]}>
            One lowercase letter
          </Text>
          <Text style={[styles.criteria, criteria.number ? styles.valid : styles.invalid]}>
            One number
          </Text>
          <Text style={[styles.criteria, criteria.special ? styles.valid : styles.invalid]}>
            One special character
          </Text>
        </View>

        {/* Vérification si les mots de passe correspondent */}
        <Text style={[styles.matchText, doPasswordsMatch ? styles.valid : styles.invalid]}>
          {doPasswordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </Text>

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isPasswordValid || !doPasswordsMatch}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Ajoute un fond blanc semi-transparent pour améliorer la lisibilité du texte
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  criteriaContainer: {
    marginBottom: 20,
  },
  criteriaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  criteria: {
    fontSize: 14,
    marginBottom: 5,
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
  matchText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CreatePasswordScreen;