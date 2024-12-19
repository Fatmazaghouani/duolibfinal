import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importation des icônes
import { useTranslation } from 'react-i18next';
import logo from '../../images/@.png';
import smallLogo from '../../images/smalllogo.png';

const ContactUsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [isChecked, setIsChecked] = useState(false); // État pour la checkbox personnalisée
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    surname: '',
    message: '',
    privacyPolicy: ''
  });

  // Fonction pour basculer l'état de la checkbox
  const toggleCheckbox = () => {
    setIsChecked(prevState => !prevState);
  };

  const validateForm = () => {
    let valid = true;
    let errorMessages = { email: '', name: '', surname: '', message: '', privacyPolicy: '' };

    // Validation de l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errorMessages.email = t('contact_email_error_required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      errorMessages.email = t('contact_email_error_invalid');
      valid = false;
    }

    // Validation du nom
    if (!name) {
      errorMessages.name = t('contact_name_error_required');
      valid = false;
    }

    // Validation du prénom
    if (!surname) {
      errorMessages.surname = t('contact_surname_error_required');
      valid = false;
    }

    // Validation du message
    if (!message) {
      errorMessages.message = t('contact_message_error_required');
      valid = false;
    } else if (message.length > 1000) {
      errorMessages.message = t('contact_message_error_too_long');
      valid = false;
    }

    // Validation de la politique de confidentialité
    if (!isChecked) {
      errorMessages.privacyPolicy = t('contact_privacy_error');
      valid = false;
    }

    setErrors(errorMessages);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate('Reponse');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Message d'erreur pour la politique de confidentialité */}
      {errors.privacyPolicy && <Text style={styles.errorText}>{errors.privacyPolicy}</Text>}

      {/* Bouton de fermeture */}
      <Pressable onPress={() => navigation.navigate('Starting')} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Titre avec logo */}
      <View style={styles.titleContainer}>
        <Image source={smallLogo} style={styles.smallLogo} />
        <Text style={styles.logoText}>DuoLib</Text>
      </View>

      {/* Logo principal */}
      <Image source={logo} style={styles.logoImage} />

      <Text style={styles.title}>{t('contact_title')}</Text>

      {/* Formulaire avec icônes dans les champs */}
      <View style={styles.inputContainer}>
        {/* Email */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={18} color="#FF4081" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('contact_email_placeholder')}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* Company/Association (optionnel) */}
        <View style={styles.inputWrapper}>
          <Ionicons name="business-outline" size={18} color="#FF4081" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('contact_company_placeholder')}
            value={company}
            onChangeText={setCompany}
          />
        </View>

        {/* Name */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color="#FF4081" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('contact_name_placeholder')}
            value={name}
            onChangeText={setName}
          />
        </View>
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        {/* Surname */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color="#FF4081" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('contact_surname_placeholder')}
            value={surname}
            onChangeText={setSurname}
          />
        </View>
        {errors.surname ? <Text style={styles.errorText}>{errors.surname}</Text> : null}

        {/* Message */}
        <View style={styles.inputWrapper}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FF4081" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={t('contact_message_placeholder')}
            multiline
            maxLength={1000}
            value={message}
            onChangeText={setMessage}
          />
        </View>
        {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Starting')}>
          <Text style={styles.buttonText}>{t('contact_back_button')}</Text>
        </Pressable>
        <Pressable
          style={[styles.sendButton, { opacity: isChecked ? 1 : 0.5 }]}
          disabled={!isChecked}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>{t('contact_send_button')}</Text>
        </Pressable>
      </View>

      {/* Checkbox en dessous des boutons */}
      <Pressable style={styles.checkboxContainer} onPress={toggleCheckbox}>
        <View style={[styles.checkbox, isChecked && styles.checked]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxText}>{t('contact_privacy_checkbox')}</Text>
      </Pressable>
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
  inputContainer: {
    width: '80%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligne l'icône en haut
    justifyContent: 'flex-start', // Positionne l'icône à gauche
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingVertical: 12, // Ajoute un padding vertical pour éloigner le texte des bords
    paddingLeft: 12, // Ajoute un padding à gauche
    paddingRight: 8, // Ajoute un padding à droite pour le texte
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },  
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center', // Centre le texte verticalement
  },
  sendButton: {
    backgroundColor: '#9C27B0',
    padding: 12,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center', // Centre le texte verticalement
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 4,
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
  },
});

export default ContactUsScreen;
