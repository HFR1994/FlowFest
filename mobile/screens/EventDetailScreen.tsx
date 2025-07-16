import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SimpleArtistList from '../components/SimpleArtistList';

export interface Festival {
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
  RSVP: { festival: Festival };
  ArtistDetail: { artist: any };
};

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type EventDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;

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

const artistDatabase: { [key: string]: ArtistInfo } = {
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

export default function EventDetailScreen() {
  const route = useRoute<EventDetailRouteProp>();
  const navigation = useNavigation<EventDetailNavigationProp>();
  const { festival } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: festival.image }} style={styles.heroImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{festival.name}</Text>
        <Text style={styles.genre}>{festival.genre}</Text>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Dates:</Text>
            <Text style={styles.infoValue}>{festival.dates}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Location:</Text>
            <Text style={styles.infoValue}>{festival.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🏟️ Venue:</Text>
            <Text style={styles.infoValue}>{festival.venue}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👥 Capacity:</Text>
            <Text style={styles.infoValue}>{festival.capacity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎫 Ticket Price:</Text>
            <Text style={styles.infoValue}>{festival.ticketPrice}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{festival.description}</Text>
        </View>

        <SimpleArtistList 
          lineup={festival.lineup} 
          onArtistPress={(artistName) => {
            const artistInfo = artistDatabase[artistName];
            if (artistInfo) {
              navigation.navigate('ArtistDetail', { artist: artistInfo });
            }
          }} 
        />

        <TouchableOpacity 
          style={styles.rsvpButton}
          onPress={() => navigation.navigate('RSVP', { festival })}
        >
          <Text style={styles.rsvpButtonIcon}>📝</Text>
          <Text style={styles.rsvpButtonText}>RSVP & Updates</Text>
        </TouchableOpacity>
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
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genre: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  infoLabel: {
    color: '#ccc',
    fontSize: 16,
    width: 120,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  descriptionSection: {
    marginBottom: 25,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  rsvpButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rsvpButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  rsvpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
