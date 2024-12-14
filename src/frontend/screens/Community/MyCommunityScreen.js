import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from '../../../backend/firebaseConfig';
import { collection, query, where, setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const MyCommunityScreen = () => {
  const [users, setUsers] = useState([]); 
  const [followingStatus, setFollowingStatus] = useState({
    followedUsers: [],
    followersUsers: []
  }); 
  const [selectedTab, setSelectedTab] = useState('peopleIFollow'); 
  const [loading, setLoading] = useState(false); 
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch users and follow data in real-time
  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    const usersCollection = collection(db, "users");
    const followersRef = collection(db, "followers");

    // Real-time listener for all users
    const unsubscribeUsers = onSnapshot(query(usersCollection), (querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {
          usersList.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(usersList);
    });

    // Real-time listener for followed users
    const unsubscribeFollowed = onSnapshot(
      query(followersRef, where("followerID", "==", currentUser.uid), where("following", "==", true)),
      (querySnapshot) => {
        const followedUsers = [];
        querySnapshot.forEach((doc) => {
          followedUsers.push(doc.data().followedID);
        });
        setFollowingStatus((prevState) => ({
          ...prevState,
          followedUsers,
        }));
      }
    );

    // Real-time listener for followers
    const unsubscribeFollowers = onSnapshot(
      query(followersRef, where("followedID", "==", currentUser.uid), where("following", "==", true)),
      (querySnapshot) => {
        const followersUsers = [];
        querySnapshot.forEach((doc) => {
          followersUsers.push(doc.data().followerID);
        });
        setFollowingStatus((prevState) => ({
          ...prevState,
          followersUsers,
        }));
      }
    );

    setLoading(false);

    // Cleanup listeners
    return () => {
      unsubscribeUsers();
      unsubscribeFollowed();
      unsubscribeFollowers();
    };
  }, [currentUser]);

  const handleFollow = async (followedID) => {
    try {
      setLoading(true);
      const followersRef = collection(db, "followers");
      const docID = `${currentUser.uid}_${followedID}`;

      const docRef = doc(followersRef, docID);

      await setDoc(docRef, { followerID: currentUser.uid, followedID, following: true });

      Alert.alert("Success", "User followed successfully!");
    } catch (error) {
      console.error("Error following user:", error);
      Alert.alert("Error", "Unable to follow this user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (followedID) => {
    try {
      setLoading(true);
      const followersRef = collection(db, "followers");
      const docID = `${currentUser.uid}_${followedID}`;
      const docRef = doc(followersRef, docID);

      await updateDoc(docRef, { following: false });

      Alert.alert("Success", "User unfollowed successfully!");
    } catch (error) {
      console.error("Error unfollowing user:", error);
      Alert.alert("Error", "Unable to unfollow this user.");
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item }) => {
    const isFollowing = followingStatus.followedUsers.includes(item.id);
    const isFollower = followingStatus.followersUsers.includes(item.id);
    const showCancerIcon = item.diseaseData?.cancer;
    const showRareDiseaseIcon = item.diseaseData?.rareDisease;

    return (
      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name ? item.name.charAt(0) : '?'}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.diseaseIconsContainer}>
            {showCancerIcon && (
              <Image source={require('../../images/cancer.png')} style={styles.diseaseIcon} />
            )}
            {showRareDiseaseIcon && (
              <Image source={require('../../images/rare.png')} style={styles.diseaseIcon} />
            )}
          </View>
  </View>
        <View style={styles.buttonsContainer}>
          {!isFollowing && (
            <TouchableOpacity style={styles.followButton} onPress={() => handleFollow(item.id)}>
              <Text style={styles.followText}>{isFollower ? "Follow Back" : "Follow"}</Text>
            </TouchableOpacity>
          )}
  
          {isFollowing && (
            <>
              <TouchableOpacity style={styles.unfollowButton} onPress={() => handleUnfollow(item.id)}>
                <Text style={styles.unfollowText}>Unfollow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.followingButton}>
                <Text style={styles.followingText}>Following</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
      </View>
      
    );
  };
  
  return (

    <View style={styles.container}>
      <Text style={styles.header}>My Community</Text>

      <View style={styles.tabsContainerColumn}>
  <TouchableOpacity
    style={[styles.tab, selectedTab === 'followSuggestions' && styles.activeTab]}
    onPress={() => setSelectedTab('followSuggestions')}
  >
    <Text style={[styles.tabText, selectedTab === 'followSuggestions' && styles.activeTabText]}>Follow Suggestions</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.tab, selectedTab === 'peopleIFollow' && styles.activeTab]}
    onPress={() => setSelectedTab('peopleIFollow')}
  >
    <Text style={[styles.tabText, selectedTab === 'peopleIFollow' && styles.activeTabText]}>People I Follow</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.tab, selectedTab === 'followers' && styles.activeTab]}
    onPress={() => setSelectedTab('followers')}
  >
    <Text style={[styles.tabText, selectedTab === 'followers' && styles.activeTabText]}>Followers</Text>
  </TouchableOpacity>
</View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={users.filter(user => {
            if (selectedTab === 'peopleIFollow') {
              return followingStatus.followedUsers.includes(user.id);
            } else if (selectedTab === 'followers') {
              return followingStatus.followersUsers.includes(user.id);
            } else if (selectedTab === 'followSuggestions') {
              return !followingStatus.followedUsers.includes(user.id);
            }
            return true;
          })}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  tabsContainerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeTab: {
    backgroundColor: '#FF87A0',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF87A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  diseaseIconsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  diseaseIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: '#7FBF00', // Green color for Follow button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followBackButton: {
    backgroundColor: '#7FBF00', // Green color for Follow Back button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followText: {
    color: '#fff',
  },
  disabledButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  followingText: {
    color: '#666',
  },
  unfollowButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#37CDFF',
    borderRadius: 20,
  },
  unfollowText: {
    color: '#fff',
  },

  followingButton: {
    backgroundColor: '#d1ecf1',
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingText: {
    color: '#0c5460',
    fontWeight: '600',
  },
  tabsContainerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5, // Espacement entre les boutons
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    width: '80%', // Ajuste la largeur des boutons
    alignItems: 'center', // Centre le texte
  },
  activeTab: {
    backgroundColor: '#FF87A0',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default MyCommunityScreen;




