import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { db, auth } from '../../../backend/firebaseConfig'; 
import { doc, getDoc, collection, addDoc, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { Modal, Pressable } from 'react-native';



const Comment = ({ route, navigation }) => {
  const { postId } = route.params; 
  const currentUser = auth.currentUser;
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [postDetails, setPostDetails] = useState(null); 
  const [postAuthor, setPostAuthor] = useState(null); 
  const [usersData, setUsersData] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [showLikers, setShowLikers] = useState(false); // Nouveau état pour contrôler l'affichage des likers

  // Charger les détails du post et de son auteur
  useEffect(() => {
    const postRef = doc(db, 'posts', postId);
    const unsubscribePost = onSnapshot(postRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        setPostDetails(postData);
        const userRef = doc(db, 'users', postData.userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setPostAuthor(userSnapshot.data());
        }
      }
    });

    return () => unsubscribePost();
  }, [postId]);

  // Charger les commentaires et leur compteur
  useEffect(() => {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('postID', '==', postId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userID,
          comment: data.comment,
          timestamp: data.timestamp.toDate(),
        };
      });
      setComments(commentsData);
      setCommentCount(snapshot.docs.length);
    });

    return () => unsubscribeComments();
  }, [postId]);

  // Charger les utilisateurs
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = { ...usersData };
      snapshot.docs.forEach((doc) => {
        const userData = doc.data();
        users[doc.id] = { name: userData.name, surname: userData.surname };
      });
      setUsersData(users);
    });

    return () => unsubscribeUsers();
  }, []);

  // Charger les likes
  useEffect(() => {
    const likesRef = doc(db, 'likes', postId);
    const unsubscribeLikes = onSnapshot(likesRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const likeData = docSnapshot.data();
        setLikeCount(likeData.likeCount || 0);

        const likersList = await Promise.all(
          likeData.likers.map(async (userId) => {
            if (usersData[userId]) {
              return { userId, ...usersData[userId] };
            } else {
              const userRef = doc(db, 'users', userId);
              const userSnapshot = await getDoc(userRef);
              if (userSnapshot.exists()) {
                return { userId, ...userSnapshot.data() };
              }
            }
            return null;
          })
        );
        setLikers(likersList.filter(Boolean));
      }
    });

    return () => unsubscribeLikes();
  }, [postId, usersData]);

  // Gérer l'ajout d'un commentaire
  const handlePostComment = async () => {
    if (commentText.trim()) {
      try {
        await addDoc(collection(db, 'comments'), {
          postID: postId,
          userID: currentUser.uid,
          comment: commentText,
          timestamp: new Date(),
        });
        setCommentText('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Gérer l'affichage/masquage de la liste des likers
  const toggleLikersList = () => {
    setShowLikers((prevState) => !prevState);
  };

  return (

    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Modal
  visible={showLikers}
  animationType="slide"
  transparent={true}
  onRequestClose={toggleLikersList}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Liked by</Text>
      {likers.length > 0 ? (
        <FlatList
          data={likers}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <Text style={styles.modalLikerName}>
              {`${item.name} ${item.surname}`}

            </Text>
          )}
        />
      ) : (
        <Text style={styles.noLikersText}>No likers yet</Text>
      )}
      <Pressable style={styles.closeModalButton} onPress={toggleLikersList}>
        <Text style={styles.closeModalButtonText}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>

      {/* Affichage du post et de son auteur */}
      {postDetails && postAuthor ? (
        <View style={styles.postContainer}>
          <Text style={styles.postAuthor}>{`${postAuthor.name} ${postAuthor.surname}`}</Text>
          <Text style={styles.postContent}>{postDetails.message}</Text>
          <Text style={styles.postTime}>{new Date(postDetails.timestamp.seconds * 1000).toLocaleString()}</Text>
          {/* Bouton pour les likes */}
          

          {/* Liste des likers */}
       
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading post...</Text>
      )}

<View style={styles.statsContainer}>
  <TouchableOpacity onPress={toggleLikersList}>
    <Text style={styles.statItem}>Likes ({likeCount})</Text>
  </TouchableOpacity>
  <Text style={styles.statItem}>Comments ({commentCount})</Text>
</View>




      {/* Section pour ajouter un commentaire */}
      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
        value={commentText}
        onChangeText={setCommentText}
        multiline
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.commentButton} onPress={handlePostComment}>
        <Text style={styles.commentButtonText}>Post Comment</Text>
      </TouchableOpacity>

      {/* Liste des commentaires */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const user = usersData[item.userId];
          return (
            <View style={styles.commentCard}>
              {user ? (
                <Text style={styles.commentAuthor}>{`${user.name} ${user.surname}`}</Text>

              ) : (
                <Text style={styles.commentAuthor}>Loading user...</Text>
              )}
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentTime}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.noCommentsText}>No comments yet</Text>}
      />
    </KeyboardAvoidingView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  postTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  commentButton: {
    backgroundColor: '#377DFF',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalLikerName: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 5,
  },
  closeModalButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#377DFF',
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  

  commentCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  commentTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#777',
  },
  noCommentsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },

  likeCount: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  likersContainer: {
    marginTop: 10,
  },
  likersTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  likerName: {
    fontSize: 14,
    color: '#555',
  },

  commentCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default Comment;