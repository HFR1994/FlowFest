import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    lineup: ['The Electric Waves', 'Latin Fire', 'Crystal Echo', 'Asian Fusion Band', 'Midnight Pulse'],
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
    lineup: ['African Drums Collective', 'Electric Nomads', 'Sunset Riders', 'Bass Revolution', 'Rhythm Collective'],
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
    lineup: ['Neon Dreams', 'Bass Revolution', 'Electric Nomads', 'Midnight Pulse', 'The Electric Waves'],
    ticketPrice: '¥25,000 - ¥55,000',
    venue: 'Tokyo Bay Arena',
    capacity: '40,000',
    genre: 'Electronic/Techno'
  },
  { 
    id: '4', 
    name: 'Rock the Valley', 
    location: 'British Columbia, Canada', 
    dates: 'September 1-3, 2024',
    description: 'An explosive rock experience set in the stunning Okanagan Valley. Camp under the stars and rock out with legendary bands and emerging artists alike.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
    lineup: ['Sunset Riders', 'Latin Fire', 'Crystal Echo', 'Solar Flare', 'Neon Dreams'],
    ticketPrice: 'CAD $179 - $399',
    venue: 'Okanagan Valley Grounds',
    capacity: '35,000',
    genre: 'Rock/Alternative'
  },
  { 
    id: '5', 
    name: 'Jazz in the Dunes', 
    location: 'Essaouira, Morocco', 
    dates: 'October 10-13, 2024',
    description: 'A soulful escape where jazz meets the desert breeze. Experience intimate concerts in historic courtyards and sunset jams by the dunes.',
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&h=600&fit=crop',
    lineup: ['Crystal Echo', 'Asian Fusion Band', 'Electric Nomads', 'African Drums Collective', 'Neon Dreams'],
    ticketPrice: 'MAD 600 - 1800',
    venue: 'Skala du Port & Sahara Camp',
    capacity: '15,000',
    genre: 'Jazz/World'
  },
  { 
    id: '6', 
    name: 'Aurora Soundscape', 
    location: 'Reykjavik, Iceland', 
    dates: 'November 21-23, 2024',
    description: "Witness the northern lights while enjoying ambient, electronic, and experimental music in Iceland's capital. A sensory journey like no other.",
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
    lineup: ['Crystal Echo', 'Neon Dreams', 'Midnight Pulse', 'Bass Revolution', 'Electric Nomads'],
    ticketPrice: 'ISK 15,000 - 32,000',
    venue: 'Harpa Concert Hall',
    capacity: '20,000',
    genre: 'Ambient/Experimental'
  }
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Festival[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Simulate fetching festival data from internet
    const timer = setTimeout(() => {
      setFestivals(mockFestivalData.slice(3)); // Show festivals 4, 5, 6 by default
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  // Search functionality with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setIsSearching(false);
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      setSearchLoading(true);

      // Filter results
      const query = searchQuery.toLowerCase();
      const results = mockFestivalData.filter(festival => 
        festival.name.toLowerCase().includes(query) ||
        festival.location.toLowerCase().includes(query) ||
        festival.genre.toLowerCase().includes(query) ||
        festival.description.toLowerCase().includes(query) ||
        festival.lineup.some(artist => artist.toLowerCase().includes(query))
      );
      
      // Focus on festivals 4, 5, 6 for the animation demo
      const targetFestivals = mockFestivalData.slice(3, 6); // festivals 4, 5, 6
      const finalResults = results.length > 0 ? results : 
        (query.includes('rock') || query.includes('jazz') || query.includes('aurora') || 
         query.includes('canada') || query.includes('morocco') || query.includes('iceland') ||
         query.includes('valley') || query.includes('dunes') || query.includes('soundscape')) 
        ? targetFestivals : [];
      
      setTimeout(() => {
        setSearchResults(finalResults);
        setSearchLoading(false);
      }, 500);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleFestivalPress = (festival: Festival) => {
    navigation.navigate('EventDetail', { festival });
  };

  const displayData = isSearching ? searchResults : festivals;
  const isLoading = loading || (isSearching && searchLoading);

  const renderFestivalCard = (item: Festival, index: number) => (
    <View key={item.id} style={styles.festivalCard}>
      <TouchableOpacity 
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
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search festivals, locations, genres..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          {searchQuery.length > 0 && (
            <Text style={styles.searchHint}>
              Try: "rock", "sibes", "sunshine", "canada", "morocco", "iceland"
            </Text>
          )}
        </View>

        {/* Events List Header */}
        <Text style={styles.header}>
          {isSearching ? 
            (searchLoading ? 'Searching...' : 
             searchResults.length > 0 ? `Found ${searchResults.length} festival${searchResults.length > 1 ? 's' : ''}` : 
             'No festivals found') : 
            'Upcoming Festivals'}
        </Text>

        {/* Content */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff6b6b" />
            <Text style={styles.loadingText}>
              {loading ? 'Loading festivals...' : 'Searching festivals...'}
            </Text>
          </View>
        ) : displayData.length === 0 && isSearching ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>🎪</Text>
            <Text style={styles.noResultsTitle}>No festivals found</Text>
            <Text style={styles.noResultsSubtitle}>Try searching for "rock", "vibes", or "sunshine"</Text>
          </View>
        ) : (
          displayData.map((item, index) => renderFestivalCard(item, index))
        )}
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  // Search Styles
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchHint: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
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
    paddingVertical: 60,
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
  // No Results Styles
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
