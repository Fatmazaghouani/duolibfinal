import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.profileImage}
        />
        <TextInput
          placeholder="Search for something here..."
          style={styles.searchInput}
        />
        <MaterialCommunityIcons name="email-outline" size={24} color="#4E5D78" />
      </View>

      {/* Titre de la page */}
      <Text style={styles.pageTitle}>Settings/Language</Text>

      {/* Section Language */}
      <View style={styles.languageSection}>
        <Text style={styles.languageTitle}>Language</Text>
        <Text style={styles.languageSubtitle}>Show Duolib in this language.</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="English (US)" value="English (US)" />
            <Picker.Item label="English (UK)" value="English (UK)" />
            <Picker.Item label="French (FR)" value="French (FR)" />
            <Picker.Item label="Spanish (ES)" value="Spanish (ES)" />
            <Picker.Item label="German (DE)" value="German (DE)" />
          </Picker>
        </View>
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    color: "#000",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  languageSection: {
    marginBottom: 20,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  languageSubtitle: {
    fontSize: 14,
    color: "#4E5D78",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    height: 55,
    color: "#000", // Couleur du texte de l'option sélectionnée
    fontSize: 16,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E5D78", // Couleur du texte dans le menu déroulant
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 16,
    color: "#000",
  },
  saveButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  saveText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default LanguageScreen;