import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ArtistInfo {
  name: string;
  bio: string;
  genre: string;
  image: string;
  otherEvents: string[];
  eventDetails: {
    eventName: string;
    stage: string;
    time: string;
  };
  capacity: {
    current: number;
    max: number;
    crowdLevel: 'low' | 'mid' | 'high';
  };
  spotifyUrl: string;
}

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  ArtistDetail: { artist: ArtistInfo };
};

type ArtistDetailRouteProp = RouteProp<RootStackParamList, 'ArtistDetail'>;
type ArtistDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArtistDetail'>;

export default function ArtistDetailScreen() {
  const route = useRoute<ArtistDetailRouteProp>();
  const navigation = useNavigation<ArtistDetailNavigationProp>();
  const { artist } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowArtist = () => {
    setIsFollowing(!isFollowing);
    const action = !isFollowing ? 'followed' : 'unfollowed';
    Alert.alert(
      'Success',
      `You have ${action} ${artist.name}!`,
      [{ text: 'OK' }]
    );
  };

  const handleSpotifyPress = (spotifyUrl: string) => {
    Linking.canOpenURL(spotifyUrl).then(supported => {
      if (supported) {
        Linking.openURL(spotifyUrl);
      } else {
        Alert.alert(
          'Unable to open Spotify',
          'Please make sure you have Spotify installed on your device.',
          [{ text: 'OK' }]
        );
      }
    });
  };

  const getCrowdLevelColor = (level: 'low' | 'mid' | 'high') => {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'mid': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getCrowdLevelText = (level: 'low' | 'mid' | 'high') => {
    switch (level) {
      case 'low': return 'Low Crowd';
      case 'mid': return 'Moderate Crowd';
      case 'high': return 'High Crowd';
      default: return 'Unknown';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      
      <View style={styles.content}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistGenre}>{artist.genre}</Text>
        
        {/* Event Details Section */}
        <View style={styles.eventDetailsSection}>
          <Text style={styles.sectionTitle}>Performance Details</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>🎪 Event:</Text>
              <Text style={styles.performanceValue}>{artist.eventDetails.eventName}</Text>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>🎤 Stage:</Text>
              <Text style={styles.performanceValue}>{artist.eventDetails.stage}</Text>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>⏰ Time:</Text>
              <Text style={styles.performanceValue}>{artist.eventDetails.time}</Text>
            </View>
          </View>
        </View>

        {/* Capacity & Crowd Level Section */}
        <View style={styles.capacitySection}>
          <Text style={styles.sectionTitle}>Venue Capacity</Text>
          <View style={styles.capacityCard}>
            <View style={styles.capacityRow}>
              <Text style={styles.capacityLabel}>👥 Current Attendance:</Text>
              <Text style={styles.capacityValue}>{artist.capacity.current.toLocaleString()}</Text>
            </View>
            <View style={styles.capacityRow}>
              <Text style={styles.capacityLabel}>🏟️ Max Capacity:</Text>
              <Text style={styles.capacityValue}>{artist.capacity.max.toLocaleString()}</Text>
            </View>
            <View style={styles.capacityRow}>
              <Text style={styles.capacityLabel}>📊 Crowd Level:</Text>
              <View style={[styles.crowdBadge, { backgroundColor: getCrowdLevelColor(artist.capacity.crowdLevel) }]}>
                <Text style={styles.crowdBadgeText}>{getCrowdLevelText(artist.capacity.crowdLevel)}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Biography</Text>
          <Text style={styles.bioText}>{artist.bio}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.followButton, isFollowing && styles.followingButton]}
            onPress={handleFollowArtist}
          >
            <Text style={styles.actionButtonIcon}>{isFollowing ? '❤️' : '🤍'}</Text>
            <Text style={[styles.actionButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow Artist'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.spotifyButton]}
            onPress={() => handleSpotifyPress(artist.spotifyUrl)}
          >
            <Text style={styles.actionButtonIcon}>🎵</Text>
            <Text style={[styles.actionButtonText, styles.spotifyButtonText]}>Open Spotify</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.otherEventsSection}>
          <Text style={styles.otherEventsTitle}>Other Upcoming Events</Text>
          {artist.otherEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventText}>🎪 {event}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  artistImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  artistName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistGenre: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  eventDetailsSection: {
    marginBottom: 20,
  },
  performanceCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  performanceRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  performanceLabel: {
    color: '#ccc',
    fontSize: 14,
    width: 100,
  },
  performanceValue: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    fontWeight: '600',
  },
  capacitySection: {
    marginBottom: 20,
  },
  capacityCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  capacityRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  capacityLabel: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
  capacityValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  crowdBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  crowdBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bioSection: {
    marginBottom: 25,
  },
  bioTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtonsSection: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 2,
  },
  followButton: {
    backgroundColor: 'transparent',
    borderColor: '#ff6b6b',
  },
  followingButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  actionButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionButtonText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#fff',
  },
  spotifyButtonText: {
    color: '#fff',
  },
  otherEventsSection: {
    marginBottom: 20,
  },
  otherEventsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventText: {
    color: '#fff',
    fontSize: 14,
  },
});
