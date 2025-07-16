import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { genericArtistDatabase } from '../data/artistDatabase';

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  ArtistDetail: { artist: any };
  GenericArtist: { artist: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
      // Default behavior: navigate to GenericArtist screen
      const artistInfo = genericArtistDatabase[artistName];
      if (artistInfo) {
        navigation.navigate('GenericArtist', { artist: artistInfo });
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
