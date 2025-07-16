import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

// Event-specific artist database for SimpleArtistList
const eventArtistDatabase: { [key: string]: ArtistInfo } = {
  'The Electric Waves': {
    name: 'The Electric Waves',
    bio: 'The Electric Waves are pioneers of the electronic music scene, blending synthesized beats with organic sounds to create an otherworldly experience. Formed in 2018, they have quickly risen to become one of the most sought-after acts in the festival circuit.',
    genre: 'Electronic/Synthwave',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    otherEvents: ['Global Beats Festival - Berlin', 'Electric Vibes - Tokyo', 'Summer Sound Waves - Miami'],
    eventDetails: {
      eventName: 'Sunshine Music Fest',
      stage: 'Main Stage',
      time: '6:00 PM - 7:00 PM'
    },
    capacity: {
      current: 3200,
      max: 5000,
      crowdLevel: 'mid'
    },
    spotifyUrl: 'https://open.spotify.com/artist/electricwaves'
  },
  'Sunset Riders': {
    name: 'Sunset Riders',
    bio: 'Sunset Riders bring the spirit of the American West to modern music, combining country, rock, and folk influences. Their high-energy performances and storytelling lyrics have captivated audiences across multiple continents.',
    genre: 'Country Rock/Folk',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    otherEvents: ['Country Music Fest - Nashville', 'Desert Rock Festival - Arizona', 'Acoustic Nights - Colorado'],
    eventDetails: {
      eventName: 'Sunshine Music Fest',
      stage: 'Main Stage',
      time: '7:30 PM - 8:30 PM'
    },
    capacity: {
      current: 4100,
      max: 5000,
      crowdLevel: 'high'
    },
    spotifyUrl: 'https://open.spotify.com/artist/sunsetriders'
  },
  'Neon Dreams': {
    name: 'Neon Dreams',
    bio: 'Neon Dreams creates immersive electronic experiences that transport listeners to futuristic landscapes. Known for their spectacular light shows and innovative use of technology, they represent the cutting edge of live electronic performance.',
    genre: 'Electronic/Ambient',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    otherEvents: ['Electric Vibes - Tokyo', 'Cyber Music Festival - Seoul', 'Digital Dreams - Los Angeles'],
    eventDetails: {
      eventName: 'Sunshine Music Fest',
      stage: 'Electronic Tent',
      time: '8:00 PM - 9:00 PM'
    },
    capacity: {
      current: 800,
      max: 2000,
      crowdLevel: 'low'
    },
    spotifyUrl: 'https://open.spotify.com/artist/neondreams'
  },
  'Crystal Echo': {
    name: 'Crystal Echo',
    bio: 'Crystal Echo specializes in ethereal soundscapes that blend electronic and acoustic elements. Their music creates a meditative atmosphere while maintaining danceable rhythms, perfect for both intimate venues and large festivals.',
    genre: 'Electronic/Ambient',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    otherEvents: ['Ambient Nights - Portland', 'Sound Healing Festival - Sedona', 'Electronic Garden - San Francisco'],
    eventDetails: {
      eventName: 'Sunshine Music Fest',
      stage: 'Electronic Tent',
      time: '9:30 PM - 10:30 PM'
    },
    capacity: {
      current: 1400,
      max: 2000,
      crowdLevel: 'mid'
    },
    spotifyUrl: 'https://open.spotify.com/artist/crystalecho'
  },
  'Solar Flare': {
    name: 'Solar Flare',
    bio: 'Solar Flare brings explosive energy to every performance with their fusion of electronic beats and live instrumentation. Their dynamic stage presence and innovative sound design make them a festival favorite worldwide.',
    genre: 'Electronic/Rock',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    otherEvents: ['Rock Electronic Fusion - Austin', 'Energy Festival - Las Vegas', 'Solar Music Fest - Phoenix'],
    eventDetails: {
      eventName: 'Sunshine Music Fest',
      stage: 'Main Stage',
      time: '9:00 PM - 10:00 PM'
    },
    capacity: {
      current: 4800,
      max: 5000,
      crowdLevel: 'high'
    },
    spotifyUrl: 'https://open.spotify.com/artist/solarflare'
  },
  'African Drums Collective': {
    name: 'African Drums Collective',
    bio: 'The African Drums Collective preserves and celebrates traditional African rhythms while incorporating contemporary elements. Their powerful performances connect audiences to the rich musical heritage of the African continent.',
    genre: 'World Music/Traditional',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    otherEvents: ['World Music Festival - London', 'African Heritage Celebration - New York', 'Rhythm of Life - Cape Town'],
    eventDetails: {
      eventName: 'Global Beats Festival',
      stage: 'World Stage',
      time: '6:00 PM - 7:30 PM'
    },
    capacity: {
      current: 2100,
      max: 3000,
      crowdLevel: 'mid'
    },
    spotifyUrl: 'https://open.spotify.com/artist/africandrums'
  },
  'Latin Fire': {
    name: 'Latin Fire',
    bio: 'Latin Fire ignites stages with passionate performances that blend salsa, reggaeton, and modern pop. Their infectious rhythms and charismatic stage presence create an irresistible party atmosphere.',
    genre: 'Latin/Pop',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    otherEvents: ['Latin Music Awards - Miami', 'Salsa Festival - Barcelona', 'Caribbean Nights - Havana'],
    eventDetails: {
      eventName: 'Global Beats Festival',
      stage: 'Latin Stage',
      time: '8:00 PM - 9:30 PM'
    },
    capacity: {
      current: 2800,
      max: 3500,
      crowdLevel: 'high'
    },
    spotifyUrl: 'https://open.spotify.com/artist/latinfire'
  },
  'Asian Fusion Band': {
    name: 'Asian Fusion Band',
    bio: 'Asian Fusion Band masterfully combines traditional Asian instruments with modern production techniques. Their unique sound bridges ancient musical traditions with contemporary global music trends.',
    genre: 'World Fusion',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    otherEvents: ['Asia Music Festival - Singapore', 'Fusion Nights - Hong Kong', 'Traditional Meets Modern - Kyoto'],
    eventDetails: {
      eventName: 'Global Beats Festival',
      stage: 'Fusion Stage',
      time: '7:00 PM - 8:30 PM'
    },
    capacity: {
      current: 1200,
      max: 2500,
      crowdLevel: 'low'
    },
    spotifyUrl: 'https://open.spotify.com/artist/asianfusion'
  }
};

interface SimpleArtistListProps {
  lineup: string[];
  onArtistPress?: (artistName: string) => void;
}

export default function SimpleArtistList({ lineup, onArtistPress }: SimpleArtistListProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleArtistPress = (artistName: string) => {
    if (onArtistPress) {
      onArtistPress(artistName);
    } else {
      // Default behavior: navigate to ArtistDetail screen (event-specific info)
      const artistInfo = eventArtistDatabase[artistName];
      if (artistInfo) {
        navigation.navigate('ArtistDetail', { artist: artistInfo });
      }
    }
  };

  return (
    <View style={styles.lineupSection}>
      <Text style={styles.sectionTitle}>Lineup</Text>
      <Text style={styles.lineupHint}>Tap on any artist to learn more</Text>
      {lineup.map((artist, index) => (
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
