import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

// Images fictives pour les éléments
import profile1 from '../../images/chat.png'; // Image de profil de l'ami
import postImage from '../../images/fleur.png'; // Image du post

const FeedScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Propositions d'amis en cercles */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.storyCircle}>
            <Image source={profile1} style={styles.storyImage} />
            <Text style={styles.storyText}>{t('friendName')}</Text>
          </View>
          {/* Ajouter plus de propositions d'amis ici */}
        </ScrollView>
      </View>

      {/* Liste des posts */}
      <ScrollView style={styles.postsContainer}>
        {/* Post 1 */}
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image source={profile1} style={styles.profileImage} />
            <Text style={styles.username}>{t('username')}</Text>
          </View>
          <Image source={postImage} style={styles.postImage} />
          <View style={styles.reactionsContainer}>
            <Text style={styles.reactionText}>❤️ {t('likes', { count: 120 })}</Text>
            <Text style={styles.reactionText}>💬 {t('comments', { count: 45 })}</Text>
          </View>
          {/* Commentaires */}
          <View style={styles.commentSection}>
            <Text style={styles.comment}>User123: {t('comment1')}</Text>
            <Text style={styles.comment}>Jane: {t('comment2')}</Text>
          </View>
        </View>

        {/* Ajouter plus de posts ici */}
      </ScrollView>

      {/* Footer (Header en bas avec 4 boutons) */}
      <View style={styles.footer}>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.footerButtonText}>{t('feed')}</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Friends')}>
          <Text style={styles.footerButtonText}>{t('friends')}</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.footerButtonText}>{t('notification')}</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.footerButtonText}>{t('settings')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
    paddingLeft: 20,
  },
  storyCircle: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF4081',
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  postsContainer: {
    flex: 1,
    marginTop: 10,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  reactionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  reactionText: {
    marginRight: 20,
    fontSize: 14,
    color: '#888',
  },
  commentSection: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 14,
    color: '#000',
  },
});

export default FeedScreen;
