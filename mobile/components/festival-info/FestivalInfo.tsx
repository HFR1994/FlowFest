import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Festival {
  id: string;
  name: string;
  location: string;
  dates: string;
}

const mockFestivalData: Festival[] = [
  { id: '1', name: 'Sunshine Music Fest', location: 'California, USA', dates: 'June 10-12, 2024' },
  { id: '2', name: 'Global Beats Festival', location: 'Berlin, Germany', dates: 'July 5-7, 2024' },
  { id: '3', name: 'Electric Vibes', location: 'Tokyo, Japan', dates: 'August 15-17, 2024' },
];

import { ListRenderItemInfo } from 'react-native';

export default function FestivalInfo() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching festival data from internet
    setTimeout(() => {
      setFestivals(mockFestivalData);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading festivals...</Text>
      </View>
    );
  }

  const renderFestivalItem = ({ item }: ListRenderItemInfo<Festival>) => (
    <View style={styles.festivalCard}>
      <Text style={styles.festivalName}>{item.name}</Text>
      <Text style={styles.festivalDetails}>{item.location}</Text>
      <Text style={styles.festivalDetails}>{item.dates}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Festivals</Text>
      <FlatList
        data={festivals}
        keyExtractor={(item) => item.id}
        renderItem={renderFestivalItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  festivalCard: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  festivalName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  festivalDetails: {
    color: '#ccc',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
  },
});
