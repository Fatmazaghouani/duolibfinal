import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation

const BottomBar = () => {
  const navigation = useNavigation(); // Utilisez useNavigation pour obtenir la fonction de navigation
  
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default BottomBar;
