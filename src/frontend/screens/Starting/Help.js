import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const FAQPage = ({ navigation }) => {
  const faqs = [
    {
      question: 'Baby Pack?',
      answer: 'There is no baby pack on the social network. This is just to see if you"re following. As a reminder, the minimum age is 16 years or the legal age required by law to use our application!',
    },
    {
      question: 'What is the Block feature?',
      answer: 'The Block feature allows you to block users who may be sending inappropriate messages or content. You will no longer receive messages from them.\n If you accept a friend request and you no longer wish to speak to that person privately, you can block them at any time.',
    },
    {
        question: 'How does the Community feature work?',
        answer: `The Community feature connects cancer patients and their families with a supportive network where they can share experiences and advice.\n\nJust a reminder:\n\n- Be kind to each other.\n- Please be sensitive to the feelings and opinions of others.\n- You might not always agree, but you can agree to disagree in a peaceful manner.\n- Don’t feed the trolls and don’t use bad language.\n  - Some people enjoy getting a reaction and post nasty comments just to provoke a response. The best way to deal with this is to report it, then ignore it.\n- Don’t use all capital letters in your posts - it’s considered ‘shouting’ online and it makes posts difficult to read.\n- If you feel that someone has insulted you, report their comment to the moderator. The moderator will take a look at the offending comment and decide whether it should be removed.\n- Please respect the moderators. Their job is to keep the focus group safe and constructive.`,
    },
    {
      question: 'How to stay safe when private messaging?',
      answer:`Staying in contact with friends is easy with private chat. It’s a great way to keep in touch and to communicate.\n\nRemember:\n\n- Don’t accept a friend request if you don’t know the person or don’t feel comfortable talking to them away from the public focus group.\n- If you accept a friend request and you no longer wish to speak to that person privately, you can block them at any time.`,
    },
    {
      question: 'How can I add a Friend?',
      answer: 'If you’d like to privately message someone, you’ll need to add them as a friend. You can ad a friend by clicking on his profile and ask him to join tour friend list.',
    },
    {
      question: 'What are Cookies?',
      answer: `A cookie is a small alphanumerical text file placed on your terminal by the server of the website you visit, or by a third-party server.\n\nA cookie allows a visitor to be recognised when they return to a website. However, technically, the cookie allows a machine to be recognised, and not a user. A cookie can only be used by the server that placed it there.\n\nCookies are used to access personalised pages without identifying oneself. A cookie only allows a nominative identification of the user if the user has previously registered on the website.\n\nWhen this website is consulted, data relative to the navigation by your device (computer, tablet, smartphone, etc.) on our website are likely to be saved in the "Cookie" files installed on your device. Only the party having placed a cookie is able to read or modify the content contained therein.`,
    },
    {
        question: 'What is the legal framework for cookies?',
        answer: `A cookie is a small alphanumerical text file placed on your terminal by the server of the website you visit, or by a third-party server.\n\nA cookie allows a visitor to be recognised when they return to a website. However, technically, the cookie allows a machine to be recognised, and not a user. A cookie can only be used by the server that placed it there.\n\nCookies are used to access personalised pages without identifying oneself. A cookie only allows a nominative identification of the user if the user has previously registered on the website.\n\nWhen this website is consulted, data relative to the navigation by your device (computer, tablet, smartphone, etc.) on our website are likely to be saved in the "Cookie" files installed on your device. Only the party having placed a cookie is able to read or modify the content contained therein.`,
      },
      {
        question: 'What is the use of cookies on the social network?',
        answer: `• Persistent cookies\nBrowsing can lead to the use of a persistent cookie (saved on your terminal). These cookies have not been devised to collect personal information, or targeted ads. They are uniquely intended to ease browsing of social network.\n\n• Session cookie\nFor reasons due to the technology used by one of our contractors, a session cookie may be used when visiting our website in order to make statistical analyses and to record site traffic. If you wish, you can disactivate this cookie by changing the settings of your internet browser.\n\n• Cookies used by third parties\nCookies can also be placed by partner companies (third party cookies). The cookies can also be saved via our site on your device by social media when you use the social media buttons (« Google », « Facebook », « Pinterest », «Instagram », etc.).\n\n• Geolocation cookies\nWe use geolocation cookies for the sole purpose of allowing patients to find a partner and/or a sponsor or to contact, via its profile, other patients.`,
      },
      {
        question: 'Cookies management',
        answer: `You can manage cookies in a number of different ways.\n\n• Internet browser settings:\nAt any time, you can choose to disable these cookies. Your browser can also be configured to alert you when cookies are placed on your computer and can ask you to accept them or refuse them. You can accept or refuse cookies on a case by case basis or refuse them systematically once and for all.\n\nPlease be aware that such a configuration is likely to change the access conditions to services which call for the use of cookies.\n\nPlease configure your browser bearing in mind the goal of these cookies as aforementioned.\n\n• In order to limit or block cookies:\nThe configuration of each browser is different. This process is described in the help menu of your navigator, and will guide you in configuring cookie management according to your wishes.`,
      },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Back button */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Frequently Asked Questions</Text>

        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Pressable onPress={() => toggleFaq(index)}>
              <Text style={styles.question}>{faq.question}</Text>
            </Pressable>
            {expandedIndex === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#FF4081',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#444444',
  },
  faqContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2196F3',
  },
  answer: {
    marginTop: 10,
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
  },
});

export default FAQPage;