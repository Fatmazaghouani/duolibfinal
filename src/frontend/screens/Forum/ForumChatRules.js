import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import BottomBar from '../BottomBar';

const ForumChatRules = () => {
 return (
    <View style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../../images/rules-icon.png')} // Assuming you have this image in the assets
          style={styles.icon}
        />
        <Text style={styles.title}>Chat Rules</Text>
      </View>

      {/* Rules Content */}
      <View style={styles.rulesContainer}>
        <Text style={styles.ruleTitle}>The discussion forum is dedicated to persons and friends concerned by cancer and/or rare diseases who wish to exchange and share their experience. Please consult the friendly chart.</Text>
        <Text style={styles.ruleText}>Use the "search" feature</Text>
        <Text style={styles.ruleDetail}>Before posting a message, first check to see if your question has not already been answered on another topic, or if the topic has not already been discussed. You will find on the Focus Groups and on the social network a search engine that will facilitate your investigations.</Text>

        <Text style={styles.ruleText}>Avoid capital letters</Text>
        <Text style={styles.ruleDetail}>Capital letters on Focus Groups and social network are considered a cry, or a sign of anger. So even if you think it will make your question or your subject more visible, avoid capital letters. You will look angry and you will not encourage others to participate in your question or your subject, plus your message will surely be deleted.</Text>

        <Text style={styles.ruleText}>Avoid SMS</Text>
        <Text style={styles.ruleDetail}>Try to formulate your messages in a way that lets you understand as many people as possible. Be aware that SMS messages are likely to be unwelcome, understood and deleted.</Text>

        <Text style={styles.ruleText}>Choose the question’s or subject's title carefully</Text>
        <Text style={styles.ruleDetail}>Consider writing an explicit topic. Avoid messages such as "help," "need help," etc. An explicit topic will allow people who can help you not to miss your question or your subject, and also serve others looking for the same information, through the search function.</Text>

        <Text style={styles.ruleText}>Describe the problem</Text>
        <Text style={styles.ruleDetail}>Once the topic is written, remember to give all the details in the message.</Text>

        <Text style={styles.ruleText}>A little politeness in this world</Text>
        <Text style={styles.ruleDetail}>If you want to encourage others to respond, don't neglect politeness. Just because you're on a Focus Group doesn't mean you're talking to people you don't know. A simple "hello" and "please" and a "Thank you" once the help is received, costs nothing and on the contrary will encourage others to respond.</Text>

        <Text style={styles.ruleText}>Protection of minors, adults and disabled people</Text>
        <Text style={styles.ruleDetail}>The Internet is a great communication tool to meet new people and make new friends. But be careful, never knowing who is behind the keyboard, or who can see your personal information, here are some tips for the under 18s and over 18s :</Text>
        <Text style={styles.ruleDetail}>Never give personal information directly. Use our communication tools and don't hesitate to report any problems.</Text>
        <Text style={styles.ruleDetail}>What is personal information (for example):</Text>
        <Text style={styles.ruleDetail}>• Your phone number.</Text>
        <Text style={styles.ruleDetail}>• Your last name.</Text>
        <Text style={styles.ruleDetail}>• A typical e-mail address name.lastname@xxx.com</Text>
        <Text style={styles.ruleDetail}>• Your address or city of residence.</Text>

        <Text style={styles.ruleText}>If someone discloses this information without your consent, we invite you to request the immediate removal of the message.</Text>
        <Text style={styles.ruleDetail}>Always pay attention to the people you meet, you are not asked to become paranoid, but it is very easy to lie when you are behind a keyboard.</Text>

        <Text style={styles.ruleText}>The following messages are prohibited:</Text>
        <Text style={styles.ruleDetail}>• A child pornography or pornographic message.</Text>
        <Text style={styles.ruleDetail}>• Racist, xenophobic, revisionist message, advocating war crimes, discriminating or inciting hatred of a person, a group of people because of their origin, disability or membership or non-membership of a particular ethnicity, nation, race, religion, gender, or lifestyle.</Text>
        <Text style={styles.ruleDetail}>• An insulting, violent, threatening, offensive or offensive message to human dignity., a defamatory message.</Text>
        <Text style={styles.ruleDetail}>• Message spreading false information that could disturb public order or alter the sincerity of an election.</Text>
        <Text style={styles.ruleDetail}>• A message that violates copyright, image rights and privacy. or a message using grouping training to commit breaches of automated data processing systems or individuals (including harassment).</Text>
        <Text style={styles.ruleDetail}>• A message written to generate as many messages as possible, a message corresponding to a sponsorship link or the sale of products.</Text>
        <Text style={styles.ruleDetail}>• Advertisement, commercial or not.</Text>
        <Text style={styles.ruleDetail}>• Message promoting tools or sites: intended to circumvent moderation actions, or committing parasitic actions, or making queries to servers that do not conform to its normal use, or that could endanger the security of users' accounts.</Text>
        <Text style={styles.ruleDetail}>• Messages written in another language not available on Duolib.</Text>
      </View>
    </ScrollView>

      {/* BottomBar */}
      <View style={styles.bottomBarContainer}>
        <BottomBar />
      </View>
    </View>
  );
  };

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 60, // Add padding to the bottom to ensure content isn't hidden behind the BottomBar
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rulesContainer: {
    marginTop: 20,
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ruleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  ruleDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});

export default ForumChatRules;