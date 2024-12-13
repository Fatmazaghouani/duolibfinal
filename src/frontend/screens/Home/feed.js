import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { db, auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, addDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomBar from '../BottomBar';


// Function to format the date in text (e.g., "2 hours ago")
const formatDate = (timestamp) => {
  const now = new Date();
  const timeDiff = now - timestamp.toDate(); // Convert Firestore Timestamp to JavaScript date
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} secondes ago`;
  }
};

const Feed = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [unreadDiscussionsCount, setUnreadDiscussionsCount] = useState(0);
  const [newPost, setNewPost] = useState(''); // To hold the new post text
  const currentUser = auth.currentUser;
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(40);

  // Fetch the current user's information
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.name || 'Anonymous'} ${userData.surname || ''}`.trim());
        } else {
          setUserName(currentUser.displayName || 'Anonymous');
        }
      }
    };

    fetchCurrentUser();
  }, [currentUser]);

  // Fetch all users (excluding the current user)
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs
        .map((doc) => ({ ...doc.data(), _id: doc.id }))
        .filter((user) => user._id !== currentUser?.uid);
      setUsers(usersData);
    });

    return () => unsubscribeUsers();
  }, [currentUser]);

  // Fetch posts and enrich with user data
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(postsCollection);

      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const userMap = {};
        users.forEach((user) => {
          userMap[user._id] = `${user.name || 'Anonymous'} ${user.surname || ''}`.trim();
        });

        if (currentUser) {
          userMap[currentUser.uid] = userName; // Use the current user's name
        }

        const enrichedPosts = postsData.map((post) => ({
          ...post,
          authorName: userMap[post.userId] || 'Anonymous',
          timeAgo: formatDate(post.timestamp), // Add formatted date
        }));

        // Sort posts by timestamp in descending order (newest first)
        const sortedPosts = enrichedPosts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        setPosts(postsData);
        setMappedPosts(sortedPosts); // Set sorted posts
      });

      return () => unsubscribePosts();
    };

    fetchPosts();
  }, [users, currentUser, userName]);

  // Fetch unread messages count
  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      where('receiverId', '==', currentUser?.uid),
      where('isRead', '==', false)
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const unreadUserIds = new Set();

      snapshot.docs.forEach((doc) => {
        const senderId = doc.data().senderId;
        unreadUserIds.add(senderId);
      });

      setUnreadDiscussionsCount(unreadUserIds.size);
    });

    return () => unsubscribeMessages();
  }, [currentUser]);

  const handlePost = async () => {
  if (newPost.trim()) {
    try {
      const userNameToUse = currentUser?.displayName || 'Anonymous';
      
      await addDoc(collection(db, 'posts'), {
        message: newPost,
        feeling: '', // Feeling can be added later if needed
        likes: 0,
        timestamp: new Date(),
        userId: currentUser?.uid,
        authorName: userNameToUse,
      });
      setToastMessage('Your post was uploaded successfully!'); 
      setToastVisible(true);        
      setNewPost(''); // Clear the input after posting
      setTimeout(() => setToastVisible(false), 3000);
      setTextInputHeight(40);
      console.log('Post added successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
};


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../images/smalllogo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search for something here..."
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <View style={styles.messageIconContainer}>
            <FontAwesome5 name="comment-dots" size={20} color="#000" style={styles.messageIcon} />
            {unreadDiscussionsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadDiscussionsCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.friendsSuggestionContainer}>
        <Text style={styles.friendsSuggestion}>Friends suggestion</Text>
        <FlatList
          data={users}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('FriendScreen', { user: item })}>
              <View style={styles.userCard}>
                <View style={[styles.bubble, { backgroundColor: getRandomColor() }]} >
                  <Text style={styles.bubbleText}>
                    {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                  </Text>
                </View>
                <Text style={styles.userName}>{item.name || 'Unnamed User'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.line} />

      <View style={styles.postSection}>
        <TextInput
  style={[styles.postInput, { height: textInputHeight }]} // Dynamically adjust height
  placeholder="What’s happening?"
  value={newPost}
  onChangeText={setNewPost}
  multiline
  onContentSizeChange={(contentWidth, contentHeight) => {
    // Adjust height based on content size
    setTextInputHeight(contentHeight > 40 ? contentHeight : 40); // Minimum height is 40
  }}
/>


        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>

        <View style={styles.postExtras}>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="image" size={20} color="#000" />
            <Text style={styles.iconText}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="smile" size={20} color="#000" />
            <Text style={styles.iconText}>Feeling</Text>
          </TouchableOpacity>
        </View>
      </View>
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <FlatList
        data={mappedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postAuthor}>{item.authorName}</Text>
            <Text style={styles.postDate}>{item.timeAgo}</Text>
            <Text style={styles.postContent}>{item.message}</Text>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="thumbs-up" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="share" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="comment" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="paper-plane" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingLeft: 15,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  messageIconContainer: {
    position: 'relative',
  },
  messageIcon: {
    marginLeft: 15,
    fontSize: 30,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 3,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  friendsSuggestionContainer: {
    marginTop: 1,
    paddingLeft: 15,
  },
  friendsSuggestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  postSection: {
    paddingHorizontal: 15,
    paddingTop: 1,
  },
   postInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlignVertical: 'top', // Align text at the top
  },
  postButton: {
    backgroundColor: '#377DFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postExtras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
  },
  postCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postDate: {
    fontSize: 12,
    color: '#777',
    marginVertical: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLabel: {
    marginLeft: 5,
    fontSize: 12,
  },
  toast: {
    position: 'absolute',
    top: 50,
    left: '10%',
    right: '10%',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Feed;