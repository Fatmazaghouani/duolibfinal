import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // For additional icons
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore

const DuoChange = () => {
  const [reasons, setReasons] = useState({
    noContact: false,
    notMyChoice: false,
    unpleasantPerson: false,
    otherReasons: false,
  });

  const navigation = useNavigation();

  const auth = getAuth(); // Firebase Auth
  const db = getFirestore(); // Firestore

  const toggleReason = (key, value) => {
    setReasons((prevReasons) => ({
      ...prevReasons,
      [key]: value,
    }));
  };

  // Fonction pour sauvegarder les réponses dans Firestore
  const saveDuoChange = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      try {
        await setDoc(doc(db, 'DuoChange', userId), {
          noContact: reasons.noContact,
          notMyChoice: reasons.notMyChoice,
          unpleasantPerson: reasons.unpleasantPerson,
          otherReasons: reasons.otherReasons,
          userId: userId, // Sauvegarde l'ID de l'utilisateur
          timestamp: new Date().toISOString(), // Date et heure de la soumission
        });
        console.log('Réponses enregistrées avec succès!');
        // Rediriger vers la page suivante après enregistrement
        navigation.navigate('DuoPreferences');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données :', error);
      }
    } else {
      console.error('Aucun utilisateur authentifié');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={30} color="#555" /> {/* Profile Icon */}
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Main Content with ScrollView */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Change Duo: please tell us why you want to change Duo
        </Text>

        {/* Questions */}
        {[{
          key: 'noContact',
          label: 'Impossible to get in touch with them or no contact',
        }, {
          key: 'notMyChoice',
          label: 'The person does not fit my choice',
        }, {
          key: 'unpleasantPerson',
          label: 'Unpleasant person',
        }, {
          key: 'otherReasons',
          label: 'Other reasons',
        }].map((option) => (
          <View key={option.key} style={styles.question}>
            <Text style={styles.questionText}>{option.label}</Text>
            <View style={styles.options}>
              <TouchableOpacity
                style={[styles.option, reasons[option.key] ? styles.activeOptionYes : styles.option]}
                onPress={() => toggleReason(option.key, true)}
              >
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option, !reasons[option.key] ? styles.activeOptionNo : styles.option]}
                onPress={() => toggleReason(option.key, false)}
              >
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Buttons in same line */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.controlsButtons} onPress={saveDuoChange}>
            <Text style={styles.text}>Select a new Duo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlsButtons, styles.homeButton]} onPress={() => navigation.navigate('Feed')}>
            <Text style={styles.text}>Go to Home Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with navigation items */}
      <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Feed')}>
        <FontAwesome5 name="home" size={20} color="#000" />
        <Text style={styles.bottomText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('DuoStart')}>
        <FontAwesome5 name="users" size={20} color="#000" />
        <Text style={styles.bottomText}>Duo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('MyCommunityScreen')}>
        <FontAwesome5 name="globe" size={20} color="#000" />
        <Text style={styles.bottomText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ForumScreen')}>
        <FontAwesome5 name="comments" size={20} color="#000" />
        <Text style={styles.bottomText}>Forum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Notification')}>
        <FontAwesome5 name="bell" size={20} color="#000" />
        <Text style={styles.bottomText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('ProfileScreen')}>
        <FontAwesome5 name="user" size={20} color="#000" />
        <Text style={styles.bottomText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('Settings')}>
        <FontAwesome5 name="cogs" size={20} color="#000" />
        <Text style={styles.bottomText}>Settings</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 15,
    marginHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#444',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Control the width of the options
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  activeOptionYes: {
    backgroundColor: '#37cdff', // Green for Yes
  },
  activeOptionNo: {
    backgroundColor: '#f44336', // Red for No
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  controlsButtons: {
    borderRadius: 48,
    backgroundColor: "#37cdff",
    width: "48%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    marginLeft: 10, // Adds space between buttons
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "800",
    fontFamily: "Montserrat-ExtraBold",
    color: "#fff",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#777',
  },
  activeFooterText: {
    color: '#00ADEF',
    fontWeight: '600',
  },
  activeIndicator: {
    width: 30,
    height: 2,
    backgroundColor: '#00ADEF',
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomIcon: {
    alignItems: 'center',
  },
  bottomText: {
    color: '#000',
    fontSize: 12,
  },
});

export default DuoChange;
