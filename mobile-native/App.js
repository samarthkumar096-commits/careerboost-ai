import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CareerBoost AI</Text>
        <Text style={styles.headerSubtitle}>Your Career Growth Partner</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚀 Welcome to CareerBoost AI</Text>
          <Text style={styles.cardText}>
            Your personal AI-powered career assistant to help you grow and succeed.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💼 Features</Text>
          <Text style={styles.feature}>✓ AI-Powered Career Guidance</Text>
          <Text style={styles.feature}>✓ Resume Builder</Text>
          <Text style={styles.feature}>✓ Interview Preparation</Text>
          <Text style={styles.feature}>✓ Skill Assessment</Text>
          <Text style={styles.feature}>✓ Job Recommendations</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonTextSecondary}>Learn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#8B5CF6',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E9D5FF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  feature: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  buttonTextSecondary: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
