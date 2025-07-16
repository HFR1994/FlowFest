import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Animated, PanResponder, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Festival } from './EventDetailScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: Festival };
  RSVP: { festival: Festival };
  GenericArtist: { artist: any };
};

type RSVPRouteProp = RouteProp<RootStackParamList, 'RSVP'>;
type RSVPNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RSVP'>;

interface NewsItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'announcement' | 'update' | 'reminder' | 'alert';
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Festival Schedule Update',
    message: 'The Electric Waves performance has been moved to the main stage at 9:00 PM. Don\'t miss this incredible show!',
    timestamp: '2 hours ago',
    type: 'update'
  },
  {
    id: '2',
    title: 'Weather Alert',
    message: 'Light rain expected tomorrow evening. Bring a light jacket and waterproof gear for outdoor stages.',
    timestamp: '4 hours ago',
    type: 'alert'
  },
  {
    id: '3',
    title: 'New Food Vendor Added',
    message: 'Tokyo Street Food has joined our vendor lineup! Try their authentic ramen and takoyaki near the East entrance.',
    timestamp: '6 hours ago',
    type: 'announcement'
  },
  {
    id: '4',
    title: 'Parking Reminder',
    message: 'Remember to arrive early as parking fills up quickly. Alternative transportation options are available.',
    timestamp: '8 hours ago',
    type: 'reminder'
  },
  {
    id: '5',
    title: 'Artist Meet & Greet',
    message: 'Sunset Riders will be signing autographs at the merchandise tent from 3:00-4:00 PM today!',
    timestamp: '12 hours ago',
    type: 'announcement'
  },
  {
    id: '6',
    title: 'Stage Setup Complete',
    message: 'All stages are now ready! Sound checks begin at 2:00 PM. The festival officially starts at 5:00 PM.',
    timestamp: '1 day ago',
    type: 'update'
  },
  {
    id: '7',
    title: 'Lost & Found',
    message: 'Lost something? Check our Lost & Found booth near the main entrance. We have phones, keys, and more!',
    timestamp: '1 day ago',
    type: 'announcement'
  },
  {
    id: '8',
    title: 'Hydration Stations',
    message: 'Free water refill stations are located throughout the venue. Stay hydrated and enjoy the festival safely!',
    timestamp: '2 days ago',
    type: 'reminder'
  }
];

const scheduleData = [
  {
    stageName: 'Main Stage',
    events: [
      {
        id: 'e1',
        time: '6:00 PM - 7:00 PM',
        festival: {
          id: '1',
          name: 'The Electric Waves',
          location: 'Main Stage',
          dates: 'June 10, 2024',
          description: 'Pioneers of electronic music blending synthesized beats with organic sounds.',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
          lineup: ['The Electric Waves'],
          ticketPrice: '$50',
          venue: 'Main Stage',
          capacity: '5000',
          genre: 'Electronic/Synthwave',
        },
      },
      {
        id: 'e2',
        time: '7:30 PM - 8:30 PM',
        festival: {
          id: '2',
          name: 'Sunset Riders',
          location: 'Main Stage',
          dates: 'June 10, 2024',
          description: 'Country Rock/Folk band with high-energy performances and storytelling lyrics.',
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
          lineup: ['Sunset Riders'],
          ticketPrice: '$45',
          venue: 'Main Stage',
          capacity: '5000',
          genre: 'Country Rock/Folk',
        },
      },
    ],
  },
  {
    stageName: 'Electronic Tent',
    events: [
      {
        id: 'e3',
        time: '8:00 PM - 9:00 PM',
        festival: {
          id: '3',
          name: 'Neon Dreams',
          location: 'Electronic Tent',
          dates: 'June 10, 2024',
          description: 'Immersive electronic experiences with spectacular light shows.',
          image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
          lineup: ['Neon Dreams'],
          ticketPrice: '$40',
          venue: 'Electronic Tent',
          capacity: '2000',
          genre: 'Electronic/Ambient',
        },
      },
      {
        id: 'e4',
        time: '9:30 PM - 10:30 PM',
        festival: {
          id: '4',
          name: 'Crystal Echo',
          location: 'Electronic Tent',
          dates: 'June 10, 2024',
          description: 'Ethereal soundscapes blending electronic and acoustic elements.',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
          lineup: ['Crystal Echo'],
          ticketPrice: '$40',
          venue: 'Electronic Tent',
          capacity: '2000',
          genre: 'Electronic/Ambient',
        },
      },
    ],
  },
];

interface SwipeableNewsItemProps {
  item: NewsItem;
  onDismiss: (id: string) => void;
}

const SwipeableNewsItem: React.FC<SwipeableNewsItemProps> = ({ item, onDismiss }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      const swipeThreshold = screenWidth * 0.3;
      
      if (Math.abs(gestureState.dx) > swipeThreshold) {
        // Dismiss the item
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: gestureState.dx > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDismiss(item.id);
        });
      } else {
        // Snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'announcement': return '📢';
      case 'update': return '🔄';
      case 'reminder': return '⏰';
      case 'alert': return '⚠️';
      default: return '📰';
    }
  };

  const getNewsColor = (type: string) => {
    switch (type) {
      case 'announcement': return '#4CAF50';
      case 'update': return '#2196F3';
      case 'reminder': return '#FF9800';
      case 'alert': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <Animated.View
      style={[
        styles.newsItemContainer,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.newsItem}>
        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>← Swipe to dismiss →</Text>
        </View>
        <View style={styles.newsHeader}>
          <View style={styles.newsIconContainer}>
            <Text style={styles.newsIcon}>{getNewsIcon(item.type)}</Text>
          </View>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
          </View>
          <View style={[styles.newsTypeBadge, { backgroundColor: getNewsColor(item.type) }]}>
            <Text style={styles.newsTypeText}>{item.type.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.newsMessage}>{item.message}</Text>
      </View>
    </Animated.View>
  );
};

export default function RSVPScreen() {
  const route = useRoute<RSVPRouteProp>();
  const navigation = useNavigation<RSVPNavigationProp>();
  const { festival } = route.params;
  const [activeTab, setActiveTab] = useState<'news' | 'schedule' | 'map'>('news');
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not-going' | null>(null);
  const [newsData, setNewsData] = useState<NewsItem[]>(mockNewsData);

  const handleRSVP = (status: 'going' | 'maybe' | 'not-going') => {
    setRsvpStatus(status);
  };

  const handleDismissNews = (id: string) => {
    setNewsData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleArtistSelect = (artistFestival: Festival) => {
    // Navigate to GenericArtist screen instead of showing modal
    const artistInfo = require('../data/artistDatabase').genericArtistDatabase[artistFestival.name];
    if (artistInfo) {
      navigation.navigate('GenericArtist', { artist: artistInfo });
    }
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <SwipeableNewsItem item={item} onDismiss={handleDismissNews} />
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'news':
        return (
          <FlatList
            data={newsData}
            keyExtractor={(item) => item.id}
            renderItem={renderNewsItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.newsList}
          />
        );
      case 'schedule':
        if (!scheduleData || scheduleData.length === 0) {
          return (
            <View style={styles.tabContent}>
              <Text style={styles.comingSoonText}>Schedule Coming Soon</Text>
              <Text style={styles.comingSoonSubtext}>Festival schedule will be available here</Text>
            </View>
          );
        }
        return (
          <ScrollView style={styles.scheduleContainer}>
            {scheduleData.map((stage) => (
              <View key={stage.stageName} style={styles.stageSection}>
                <Text style={styles.stageTitle}>{stage.stageName}</Text>
                {stage.events.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.eventItem}
                    onPress={() => handleArtistSelect(event.festival)}
                  >
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <Text style={styles.eventArtist}>{event.festival.name}</Text>
                    <Text style={styles.eventGenre}>{event.festival.genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        );
      case 'map':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Interactive Map Coming Soon</Text>
            <Text style={styles.comingSoonSubtext}>Festival venue map will be available here</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RSVP & Updates</Text>
      </View>

      {/* Festival Info */}
      <View style={styles.festivalInfo}>
        <Text style={styles.festivalName}>{festival.name}</Text>
        <Text style={styles.festivalDetails}>{festival.dates} • {festival.location}</Text>
      </View>

      {/* RSVP Section */}
      <View style={styles.rsvpSection}>
        <Text style={styles.rsvpTitle}>Will you be attending?</Text>
        <View style={styles.rsvpButtons}>
          <TouchableOpacity 
            style={[styles.rsvpButton, rsvpStatus === 'going' && styles.rsvpButtonActive]}
            onPress={() => handleRSVP('going')}
          >
            <Text style={styles.rsvpButtonIcon}>✅</Text>
            <Text style={[styles.rsvpButtonText, rsvpStatus === 'going' && styles.rsvpButtonTextActive]}>Going</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.rsvpButton, rsvpStatus === 'maybe' && styles.rsvpButtonActive]}
            onPress={() => handleRSVP('maybe')}
          >
            <Text style={styles.rsvpButtonIcon}>🤔</Text>
            <Text style={[styles.rsvpButtonText, rsvpStatus === 'maybe' && styles.rsvpButtonTextActive]}>Maybe</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.rsvpButton, rsvpStatus === 'not-going' && styles.rsvpButtonActive]}
            onPress={() => handleRSVP('not-going')}
          >
            <Text style={styles.rsvpButtonIcon}>❌</Text>
            <Text style={[styles.rsvpButtonText, rsvpStatus === 'not-going' && styles.rsvpButtonTextActive]}>Can't Go</Text>
          </TouchableOpacity>
        </View>
        {rsvpStatus && (
          <Text style={styles.rsvpConfirmation}>
            Thanks for your response! We'll keep you updated.
          </Text>
        )}
      </View>

      {/* Tab Content - Full Screen */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>

      {/* Bottom Fixed Tabs */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity 
          style={[styles.bottomTab, activeTab === 'news' && styles.activeBottomTab]}
          onPress={() => setActiveTab('news')}
        >
          <Text style={styles.bottomTabIcon}>📰</Text>
          <Text style={[styles.bottomTabText, activeTab === 'news' && styles.activeBottomTabText]}>
            News
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.bottomTab, activeTab === 'schedule' && styles.activeBottomTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={styles.bottomTabIcon}>📅</Text>
          <Text style={[styles.bottomTabText, activeTab === 'schedule' && styles.activeBottomTabText]}>
            Schedule
          </Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity 
          style={[styles.bottomTab, activeTab === 'map' && styles.activeBottomTab]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={styles.bottomTabIcon}>🗺️</Text>
          <Text style={[styles.bottomTabText, activeTab === 'map' && styles.activeBottomTabText]}>
            Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  festivalInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  festivalName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  festivalDetails: {
    color: '#ccc',
    fontSize: 16,
  },
  rsvpSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rsvpTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rsvpButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rsvpButton: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rsvpButtonActive: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  rsvpButtonIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  rsvpButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  rsvpButtonTextActive: {
    color: '#fff',
  },
  rsvpConfirmation: {
    color: '#4CAF50',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 100, // Space for bottom tabs
  },
  newsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  newsItemContainer: {
    marginBottom: 15,
  },
  newsItem: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    width: screenWidth - 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  swipeHint: {
    alignItems: 'center',
    marginBottom: 10,
  },
  swipeHintText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  newsIconContainer: {
    marginRight: 15,
  },
  newsIcon: {
    fontSize: 24,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsTimestamp: {
    color: '#888',
    fontSize: 14,
  },
  newsTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  newsTypeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newsMessage: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  comingSoonSubtext: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
  },
  // Bottom Tab Styles
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 20,
    paddingTop: 15,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeBottomTab: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  bottomTabIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  bottomTabText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
  },
  activeBottomTabText: {
    color: '#ff6b6b',
  },
  // Schedule Styles
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stageSection: {
    marginBottom: 30,
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
  },
  stageTitle: {
    color: '#ff6b6b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ff6b6b',
    paddingBottom: 10,
  },
  eventItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  eventTime: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventArtist: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventGenre: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
