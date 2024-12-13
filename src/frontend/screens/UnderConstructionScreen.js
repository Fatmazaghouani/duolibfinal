import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UnderConstructionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We are very sorry!</Text>
      <Text style={styles.message}>
        Unfortunately, this feature is under construction. We hope to have it ready in the next update. We apologize for any inconvenience caused.
      </Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        color="#FF6347"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
});

export default UnderConstructionScreen;
