import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ViewingSharingScreen = () => {
  const [postVisibility, setPostVisibility] = useState("Everyone");
  const [profileVisibility, setProfileVisibility] = useState("Followers");
  const [allowSharing, setAllowSharing] = useState("On");
  const [followPermission, setFollowPermission] = useState("Everyone");

  const renderRadioButton = (label, value, selectedValue, setSelectedValue) => (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => setSelectedValue(value)}
    >
      <MaterialCommunityIcons
        name={
          selectedValue === value
            ? "radiobox-marked"
            : "radiobox-blank"
        }
        size={24}
        color={selectedValue === value ? "#007BFF" : "#4E5D78"}
      />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );

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
      <Text style={styles.pageTitle}>Settings/Viewing and Sharing</Text>

      {/* Section Viewing and Sharing */}
      <Text style={styles.sectionTitle}>Viewing and Sharing</Text>

      {/* Who can see your post? */}
      <Text style={styles.questionTitle}>Who can see your post?</Text>
      {renderRadioButton("Everyone", "Everyone", postVisibility, setPostVisibility)}
      {renderRadioButton("Followers", "Followers", postVisibility, setPostVisibility)}
      {renderRadioButton("Only me", "Only me", postVisibility, setPostVisibility)}

      {/* Who can see your profile? */}
      <Text style={styles.questionTitle}>Who can see your profile?</Text>
      {renderRadioButton("Everyone", "Everyone", profileVisibility, setProfileVisibility)}
      {renderRadioButton("Followers", "Followers", profileVisibility, setProfileVisibility)}
      {renderRadioButton("Only me", "Only me", profileVisibility, setProfileVisibility)}

      {/* Allow others to share your posts */}
      <Text style={styles.questionTitle}>
        Allow others to share your posts to their Timeline?
      </Text>
      {renderRadioButton("On", "On", allowSharing, setAllowSharing)}
      {renderRadioButton("Off", "Off", allowSharing, setAllowSharing)}

      {/* Who can follow you? */}
      <Text style={styles.questionTitle}>Who can follow you?</Text>
      {renderRadioButton("Everyone", "Everyone", followPermission, setFollowPermission)}
      {renderRadioButton("Off", "Off", followPermission, setFollowPermission)}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4E5D78",
    marginTop: 10,
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#4E5D78",
    marginLeft: 10,
  },
});

export default ViewingSharingScreen;