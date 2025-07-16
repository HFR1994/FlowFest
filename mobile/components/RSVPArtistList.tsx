import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

interface RSVPArtistListProps {
  lineup: string[];
}

export default function RSVPArtistList({ lineup }: RSVPArtistListProps) {
  const navigation = useNavigation<NavigationProp>();
  const [followedArtists, setFollowedArtists] = useState<Set<string>>(new Set());

  const toggleFollow = (artistName: string) => {
    const newFollowed = new Set(followedArtists);
    if (newFollowed.has(artistName)) {
      newFollowed.delete(artistName);
    } else {
      newFollowed.add(artistName);
    }
    setFollowedArtists(newFollowed);
  };

  const handleArtistPress = (artistName: string) => {
    const artistInfo = genericArtistDatabase[artistName];
    if (artistInfo) {
      navigation.navigate('GenericArtist', { artist: artistInfo });
    }
  };

  // Artist list view
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Artists</Text>
      <Text style={styles.subtitle}>Follow artists to get updates</Text>
      <ScrollView style={styles.artistList} showsVerticalScrollIndicator={false}>
        {lineup.map((artist, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.artistItem}
            onPress={() => handleArtistPress(artist)}
            activeOpacity={0.7}
          >
            <View style={styles.artistInfo}>
              <Text style={styles.artistName}>🎤 {artist}</Text>
              <Text style={styles.artistGenre}>
                {genericArtistDatabase[artist]?.genre || 'Electronic/Synthwave'}
              </Text>
              <Text style={styles.tapHint}>Tap for full profile →</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.followButton,
                followedArtists.has(artist) && styles.followingButton
              ]}
              onPress={(e) => {
                e.stopPropagation();
                toggleFollow(artist);
              }}
            >
              <Text style={[
                styles.followButtonText,
                followedArtists.has(artist) && styles.followingButtonText
              ]}>
                {followedArtists.has(artist) ? '❤️ Following' : '🤍 Follow'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {followedArtists.size > 0 && (
        <View style={styles.followedSection}>
          <Text style={styles.followedTitle}>
            Following {followedArtists.size} artist{followedArtists.size !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.followedSubtext}>
            You'll receive notifications about these artists
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  artistList: {
    flex: 1,
  },
  artistItem: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistGenre: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 5,
  },
  tapHint: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  followButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  followingButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  followButtonText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#fff',
  },
  followedSection: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  followedTitle: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  followedSubtext: {
    color: '#ccc',
    fontSize: 14,
  },
  // Artist Detail View Styles
  detailHeader: {
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
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
    borderRadius: 15,
    marginBottom: 20,
  },
  detailContent: {
    paddingBottom: 20,
  },
  detailArtistName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailArtistGenre: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  detailSectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  basicInfoSection: {
    marginBottom: 25,
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
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
    fontWeight: '500',
  },
  popularitySection: {
    marginBottom: 25,
  },
  popularityCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  popularityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  popularityIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  popularityInfo: {
    flex: 1,
  },
  popularityScore: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  popularityLevel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#ff6b6b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  bioSection: {
    marginBottom: 25,
  },
  bioText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtonsSection: {
    marginBottom: 25,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
  },
  actionButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
  },
  socialSection: {
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  instagramButton: {
    backgroundColor: '#E4405F',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
  },
  socialIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  socialText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
