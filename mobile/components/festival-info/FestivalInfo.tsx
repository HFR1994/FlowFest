import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ListRenderItemInfo } from 'react-native';

interface Festival {
  id: string;
  name: string;
  location: string;
  dates: string;
  description: string;
  image: string;
  lineup: string[];
  ticketPrice: string;
  venue: string;
  capacity: string;
  genre: string;
}

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: Festival };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const mockFestivalData: Festival[] = [
  { 
    id: '1', 
    name: 'Sunshine Music Fest', 
    location: 'California, USA', 
    dates: 'June 10-12, 2024',
    description: 'Experience the ultimate summer music festival with three days of non-stop entertainment under the California sun. Featuring multiple stages, food trucks, art installations, and camping options.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    lineup: ['The Electric Waves', 'Sunset Riders', 'Neon Dreams', 'Crystal Echo', 'Solar Flare'],
    ticketPrice: '$299 - $599',
    venue: 'Golden Gate Park',
    capacity: '50,000',
    genre: 'Electronic/Pop'
  },
  { 
    id: '2', 
    name: 'Global Beats Festival', 
    location: 'Berlin, Germany', 
    dates: 'July 5-7, 2024',
    description: 'A celebration of world music bringing together artists from every continent. Immerse yourself in diverse cultures, authentic cuisine, and rhythms that will move your soul.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    lineup: ['African Drums Collective', 'Latin Fire', 'Asian Fusion Band', 'European Symphony', 'World Beat Masters'],
    ticketPrice: '€199 - €449',
    venue: 'Tempelhof Airport',
    capacity: '75,000',
    genre: 'World Music'
  },
  { 
    id: '3', 
    name: 'Electric Vibes', 
    location: 'Tokyo, Japan', 
    dates: 'August 15-17, 2024',
    description: 'The future of electronic music unfolds in the heart of Tokyo. Cutting-edge technology meets incredible beats in this cyberpunk-inspired festival experience.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    lineup: ['Cyber Punk', 'Digital Dreams', 'Neon Nights', 'Tokyo Drift', 'Electric Samurai'],
    ticketPrice: '¥25,000 - ¥55,000',
    venue: 'Tokyo Bay Arena',
    capacity: '40,000',
    genre: 'Electronic/Techno'
  },
];

const bannerData = [
  {
    image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=800&h=400',
    title: 'Just dunk it',
    subtitle: 'Proud sponsor of FlowFest'
  },
  {
    image: 'https://images.pexels.com/photos/9462390/pexels-photo-9462390.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=800&h=400',
    title: 'Every story starts with a drink',
    subtitle: 'Drink generic brand'
  },
  {
    image: 'https://images.pexels.com/photos/8047933/pexels-photo-8047933.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=800&h=400',
    title: 'Hungry?',
    subtitle: 'Take a break! Have a Queen\'s Burger'
  },
];

export default function FestivalInfo() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Simulate fetching festival data from internet
    setTimeout(() => {
      setFestivals(mockFestivalData);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Auto-scroll banner images
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleFestivalPress = (festival: Festival) => {
    navigation.navigate('EventDetail', { festival });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading festivals...</Text>
      </View>
    );
  }

  const renderFestivalItem = ({ item }: ListRenderItemInfo<Festival>) => (
    <TouchableOpacity 
      style={styles.festivalCard}
      onPress={() => handleFestivalPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.festivalImage} />
      <View style={styles.festivalContent}>
        <View style={styles.festivalHeader}>
          <Text style={styles.festivalName}>{item.name}</Text>
          <Text style={styles.festivalGenre}>{item.genre}</Text>
        </View>
        <Text style={styles.festivalLocation}>📍 {item.location}</Text>
        <Text style={styles.festivalDates}>📅 {item.dates}</Text>
        <Text style={styles.festivalPrice}>🎫 {item.ticketPrice}</Text>
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Tap for details →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      {/* App Header */}
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Festival Companion App</Text>
        <Text style={styles.appSubtitle}>Welcome to your festival companion!</Text>
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: bannerData[currentBannerIndex].image }} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>{bannerData[currentBannerIndex].title}</Text>
          <Text style={styles.bannerSubtitle}>{bannerData[currentBannerIndex].subtitle}</Text>
        </View>
        <View style={styles.bannerIndicators}>
          {bannerData.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator, 
                index === currentBannerIndex && styles.activeIndicator
              ]} 
            />
          ))}
        </View>
      </View>

      {/* Events List Header */}
      <Text style={styles.header}>Upcoming Festivals</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={festivals}
        keyExtractor={(item) => item.id}
        renderItem={renderFestivalItem}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  // App Header Styles
  appHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  appSubtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  // Banner Styles
  bannerContainer: {
    height: height / 2,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: width,
    height: height / 2,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  bannerIndicators: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#ff6b6b',
  },
  // Header Styles
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  // Festival Card Styles
  festivalCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  festivalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  festivalContent: {
    padding: 16,
  },
  festivalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  festivalName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  festivalGenre: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  festivalLocation: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  festivalDates: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  festivalPrice: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tapHint: {
    alignItems: 'flex-end',
  },
  tapHintText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontStyle: 'italic',
  },
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
});
