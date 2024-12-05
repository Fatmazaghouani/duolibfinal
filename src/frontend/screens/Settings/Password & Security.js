import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordSecurityScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+033 66 88 74 63 31");

  const devices = [
    {
      name: "Windows PC",
      location: "Brest, France",
      browser: "Chrome",
      status: "Active Now",
      icon: "monitor",
    },
    {
      name: "Windows Laptop",
      location: "Brest, France",
      browser: "Chrome",
      status: "20 minutes ago",
      icon: "laptop",
    },
    {
      name: "Huawei GT3",
      location: "Brest, France",
      browser: "Mobile",
      status: "53 minutes ago",
      icon: "cellphone",
    },
    {
      name: "Samsung",
      location: "Brest, France",
      browser: "Chrome",
      status: "March 31 at 6:40 PM",
      icon: "cellphone",
    },
  ];

  return (
    <ScrollView style={styles.container}>
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
        <MaterialCommunityIcons name="magnify" size={24} color="#4E5D78" />
      </View>

      {/* Titre */}
      <Text style={styles.pageTitle}>Settings/Password & Security</Text>

      {/* Section : Where You're Logged In */}
      <Text style={styles.sectionTitle}>Where You're Logged In</Text>
      {devices.map((device, index) => (
        <View key={index} style={styles.deviceContainer}>
          <MaterialCommunityIcons
            name={device.icon}
            size={30}
            color="#3B82F6"
          />
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>
              {device.name} - {device.location}
            </Text>
            <Text style={styles.deviceStatus}>
              {device.browser} • {device.status}
            </Text>
          </View>
        </View>
      ))}
      <TouchableOpacity>
        <Text style={styles.linkText}>See All</Text>
      </TouchableOpacity>

      {/* Section : Change Password */}
      <Text style={styles.sectionTitle}>Change Password</Text>
      <TextInput
        placeholder="Current Password"
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="New Password"
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Re-type New Password"
        style={styles.input}
        secureTextEntry
        value={retypePassword}
        onChangeText={setRetypePassword}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Section : Two-factor authentication */}
      <Text style={styles.sectionTitle}>Two-factor authentication</Text>
      <Text style={styles.subTitle}>Text Message (SMS)</Text>
      <Text style={styles.description}>
        Use text message (SMS) to receive verification codes. For your
        protection, phone numbers used for two-factor authentication can't be
        used to reset your password when two-factor is on.
      </Text>
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.activeButton}>
        <Text style={styles.activeButtonText}>Active</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 30,
    paddingHorizontal: 16,
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
    height: 40,
    color: "#111827",
    fontSize: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  deviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  deviceDetails: {
    marginLeft: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  deviceStatus: {
    fontSize: 14,
    color: "#6B7280",
  },
  linkText: {
    color: "#2563EB",
    fontWeight: "500",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  activeButton: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default PasswordSecurityScreen;