import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { genericArtistDatabase, GenericArtistInfo } from '../data/artistDatabase';

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  ArtistDetail: { artist: any };
  GenericArtist: { artist: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

// Function to create event artist info from the centralized database
const createEventArtistInfo = (artistName: string): ArtistInfo | null => {
  const genericInfo = genericArtistDatabase[artistName];
  
  if (!genericInfo) {
    return null;
  }
  
  // Use current festival details from the database if available, otherwise provide defaults
  const currentFestival = genericInfo.currentFestival && genericInfo.currentFestival.length > 0 
    ? genericInfo.currentFestival[0] 
    : {
        eventDetails: {
          eventName: 'Music Festival',
          stage: 'Main Stage',
          time: 'TBA'
        },
        capacity: {
          current: 1000,
          max: 2000,
          crowdLevel: 'mid' as const
        }
      };
  
  // Extract other events from all festival entries
  const otherEvents = genericInfo.currentFestival?.map(festival => festival.eventDetails.eventName) || ['Various festivals worldwide'];
  
  return {
    name: genericInfo.name,
    bio: genericInfo.bio,
    genre: genericInfo.genre,
    image: genericInfo.image,
    otherEvents: otherEvents,
    eventDetails: currentFestival.eventDetails,
    capacity: currentFestival.capacity,
    spotifyUrl: genericInfo.socialMedia.spotify
  };
};

interface SimpleArtistListProps {
  lineup: string[];
  festivalName: string;
  onArtistPress?: (artistName: string) => void;
}

function filterLineUp(artistName: string, eventName: string){
  const genericArtist = genericArtistDatabase[artistName]

  return genericArtist && genericArtist.currentFestival.find(u => u.eventDetails.eventName === eventName);
}

export default function SimpleArtistList({ lineup, festivalName, onArtistPress }: SimpleArtistListProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleArtistPress = (artistName: string) => {
    if (onArtistPress) {
      onArtistPress(artistName);
    } else {
      // Default behavior: navigate to ArtistDetail screen (event-specific info)
      const artistInfo = createEventArtistInfo(artistName);
      if (artistInfo) {
        navigation.navigate('ArtistDetail', { artist: artistInfo });
      }
    }
  };

  // Filter lineup to only include artists that exist in the database
  const validArtists = lineup.filter(user => filterLineUp(user, festivalName));

  return (
    <View style={styles.lineupSection}>
      <Text style={styles.sectionTitle}>Lineup</Text>
      <Text style={styles.lineupHint}>Tap on any artist to learn more</Text>
      {validArtists.map((artist, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.artistItem}
          onPress={() => handleArtistPress(artist)}
          activeOpacity={0.7}
        >
          <Text style={styles.artistName}>🎤 {artist}</Text>
          <Text style={styles.artistHint}>Tap for info →</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lineupSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lineupHint: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  artistItem: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 16,
  },
  artistHint: {
    color: '#ff6b6b',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 5,
  },
});