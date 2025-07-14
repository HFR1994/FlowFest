import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FestivalInfo from '../components/festival-info/FestivalInfo';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
      <Text style={styles.title}>Festival Companion App</Text>
      <Text style={styles.subtitle}>Welcome to your festival companion!</Text>
      <FestivalInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
