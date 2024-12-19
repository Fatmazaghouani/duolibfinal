import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const FAQPage = ({ navigation }) => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('faq_baby_pack_question'),
      answer: t('faq_baby_pack_answer'),
    },
    {
      question: t('faq_block_feature_question'),
      answer: t('faq_block_feature_answer'),
    },
    {
      question: t('faq_community_feature_question'),
      answer: t('faq_community_feature_answer'),
    },
    {
      question: t('faq_private_messaging_question'),
      answer: t('faq_private_messaging_answer'),
    },
    {
      question: t('faq_add_friend_question'),
      answer: t('faq_add_friend_answer'),
    },
    {
      question: t('faq_cookies_question'),
      answer: t('faq_cookies_answer'),
    },
    {
      question: t('faq_legal_framework_cookies_question'),
      answer: t('faq_legal_framework_cookies_answer'),
    },
    {
      question: t('faq_cookies_social_network_question'),
      answer: t('faq_cookies_social_network_answer'),
    },
    {
      question: t('faq_cookies_management_question'),
      answer: t('faq_cookies_management_answer'),
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
          <Text style={styles.backText}>{t('faq_back_button')}</Text>
        </Pressable>

        <Text style={styles.title}>{t('faq_title')}</Text>

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