import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { db, auth } from '../../../backend/firebaseConfig';
import { doc, getDoc, getDocs, addDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomBar from '../BottomBar';


const getRandomColor = () => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#57FF33', '#FF33A6',
    '#FF9F33', '#9F33FF', '#33FF9F', '#FF33FF', '#33FFF9'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const formatDate = (timestamp) => {
  const now = new Date();
  const timeDiff = now - timestamp.toDate();
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
  return `${seconds} seconds ago`;
}

};

const Feed = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [unreadDiscussionsCount, setUnreadDiscussionsCount] = useState(0);
  const [newPost, setNewPost] = useState('');
  const currentUser = auth.currentUser;
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(40);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${(userData.name || 'Anonymous')} ${(userData.surname || '')}`.trim());

        } else {
          setUserName(currentUser.displayName || 'Anonymous');
        }
      }
    };
    fetchCurrentUser();
  }, [currentUser]);

  // Fetch users to follow (excluding current user)
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs
        .map((doc) => ({ ...doc.data(), _id: doc.id }))
        .filter((user) => user._id !== currentUser?.uid);
      setUsers(usersData);
    });

    return () => unsubscribeUsers();
  }, [currentUser]);

  // Real-time fetching posts of followed users (and current user)
  useEffect(() => {
    if (!currentUser) return;

    const followersQuery = query(
      collection(db, 'followers'),
      where('followerID', '==', currentUser.uid),
      where('following', '==', true)
    );

    const unsubscribeFollowers = onSnapshot(followersQuery, (snapshot) => {
      const followedUserIds = snapshot.docs.map((doc) => doc.data().followedID);
      followedUserIds.push(currentUser.uid); // Include the current user's posts

      if (followedUserIds.length > 0) {
        const postsQuery = query(
          collection(db, 'posts'),
          where('userId', 'in', followedUserIds)
        );

        const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
          const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          const userMap = {};
          users.forEach((user) => {
            userMap[user._id] = `${(user.name || 'Anonymous')} ${(user.surname || '')}`.trim();
          });

          if (currentUser) {
            userMap[currentUser.uid] = userName || 'Me';
          }

          const enrichedPosts = postsData.map((post) => ({
            ...post,
            authorName: userMap[post.userId] || 'Anonymous',
            timeAgo: formatDate(post.timestamp),
          }));

          const sortedPosts = enrichedPosts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

          setMappedPosts(sortedPosts);
        });

        return () => unsubscribePosts(); // Clean up the listener
      }
    });

    return () => unsubscribeFollowers(); // Clean up the listener
  }, [currentUser, users, userName]);

  const handlePost = async () => {
    if (newPost.trim()) {
      try {
        const userNameToUse = currentUser?.displayName || 'Anonymous';
        
        await addDoc(collection(db, 'posts'), {
          message: newPost,
          feeling: '',
          likes: 0,
          timestamp: new Date(),
          userId: currentUser?.uid,
          authorName: userNameToUse,
        });

        setToastMessage('Your post was uploaded successfully!');
        setToastVisible(true);
        setNewPost('');
        setTimeout(() => setToastVisible(false), 3000);
        setTextInputHeight(40);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

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

  return (
    <View style={styles.container}>
      {/* Header with search and message notifications */}
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

      {/* Friends suggestions */}
      <View style={styles.friendsSuggestionContainer}>
        <Text style={styles.friendsSuggestion}>Friends suggestion</Text>
        <FlatList
          data={users}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('FriendScreen', { user: item })}>
              <View style={styles.userCard}>
                <View style={[styles.bubble, { backgroundColor: getRandomColor() }]}>
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

      {/* Post input and feed */}
      <View style={styles.postSection}>
        <TextInput
          style={[styles.postInput, { height: textInputHeight }]}
          placeholder={`Hi ${userName || 'User'}, What’s happening?`}
  // Dynamic placeholder
          value={newPost}
          onChangeText={setNewPost}
          multiline
          onContentSizeChange={(contentWidth, contentHeight) => {
            setTextInputHeight(contentHeight > 40 ? contentHeight : 40);
          }}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Display posts */}
      <FlatList
        data={mappedPosts}
        keyExtractor={(item) => item.id}
       ListEmptyComponent={
  <View style={styles.emptyContainer}>
    {/* Conteneur pour aligner le logo et le texte "Duolib" sur la même ligne */}
    <View style={styles.logoContainer}>
      {/* Logo en haut */}
      <Image 
        source={require('../../images/smalllogo.png')} 
        style={styles.smallLogo} 
      />
      
      {/* Texte "Duolib" */}
      <Text style={styles.duolibText}>
        Duolib
      </Text>
    </View>

    {/* Texte "Welcome to Duolib" */}
    <Text style={styles.welcomeToDuolib}>
      Welcome to Duolib. Now, you can post messages, invite friends and find your Duo.
    </Text>

    {/* Image sous le texte */}
    <TouchableOpacity>
      <Image 
        source={require('../../images/WelcomeScreen1.png')} 
        style={styles.welcomeImage} 
      />
    </TouchableOpacity>
  </View>
}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postAuthor}>{item.authorName}</Text>
            <Text style={styles.postDate}>{item.timeAgo}</Text>
            <Text style={styles.postContent}>{item.message}</Text>
            {/* Post actions */}
            <View style={styles.postActions}>


              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="thumbs-up" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Like</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="comment" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Comment</Text>
              </TouchableOpacity>



              <TouchableOpacity style={styles.actionItem}>
                <FontAwesome5 name="share" size={24} color="#377DFF" />
                <Text style={styles.iconLabel}>Share</Text>
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
  
  welcomeImage: {
    width: 700, // Largeur de l'image
    height: 350, // Hauteur de l'image
    resizeMode: 'contain', // S'assure que l'image conserve ses proportions
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center', 
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row', 
    alignItems: 'center', // Aligne l'image et le texte verticalement
    marginBottom: 20, // Espacement entre le logo/texte et le reste
  },
  smallLogo: {
    width: 30, // Ajustez la taille du logo
    height: 30,
    marginRight: 10, // Espacement entre l'image et le texte
  },
  duolibText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#000000',
  },
  welcomeToDuolib: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    textAlign: 'left',
    width: 335,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 700, 
    height: 300, 
    resizeMode: 'contain',
    alignSelf: 'center',
   
  },

});

export default Feed;


