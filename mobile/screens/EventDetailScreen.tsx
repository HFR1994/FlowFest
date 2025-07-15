import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

        <View style={styles.lineupSection}>
          <Text style={styles.sectionTitle}>Lineup</Text>
          {festival.lineup.map((artist, index) => (
            <View key={index} style={styles.artistItem}>
              <Text style={styles.artistName}>🎤 {artist}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.buyTicketButton}>
          <Text style={styles.buyTicketText}>Buy Tickets</Text>
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
  lineupSection: {
    marginBottom: 30,
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
  buyTicketButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buyTicketText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
