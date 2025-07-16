import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SimpleArtistList from '../components/SimpleArtistList';
import { genericArtistDatabase } from '../data/artistDatabase';

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
  GenericArtist: { artist: any };
};

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type EventDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;


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
          festivalName={festival.name} 
          lineup={festival.lineup} 
          onArtistPress={(artistName) => {
            const artistInfo = genericArtistDatabase[artistName];
            if (artistInfo) {
              navigation.navigate('GenericArtist', { artist: artistInfo });
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
