import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';

const Blocking = () => {
  const [blockedUsers, setBlockedUsers] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Chris Johnson' },
  ]);

  const unblockUser = (id) => {
    Alert.alert(
      'Unblock User',
      'Are you sure you want to unblock this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          onPress: () => setBlockedUsers(blockedUsers.filter((user) => user.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blocked Users</Text>
      {blockedUsers.length > 0 ? (
        <FlatList
          data={blockedUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userRow}>
              <Text style={styles.userName}>{item.name}</Text>
              <Pressable style={styles.unblockButton} onPress={() => unblockUser(item.id)}>
                <Text style={styles.unblockButtonText}>Unblock</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No users are currently blocked.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 16,
    color: '#000',
  },
  unblockButton: {
    backgroundColor: '#FFB400',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  unblockButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Blocking;
