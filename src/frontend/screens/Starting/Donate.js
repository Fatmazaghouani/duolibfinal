import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Donate = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </Pressable>
      <Text style={styles.title}>Donate Page</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Go')}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
        <Pressable style={styles.donateButton} onPress={() => navigation.navigate('Donate')}>
          <Text style={styles.donateText}>Donate</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  donateButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  donateText: {
    color: '#ffffff',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeText: {
    fontSize: 30,
    color: '#ff0000',
  },
});

export default Donate;