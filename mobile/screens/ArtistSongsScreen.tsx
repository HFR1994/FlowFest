import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert,
  Linking
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { weeklyPlaylists, PlaylistTrack } from '../data/playlistData';
import { genericArtistDatabase, GenericArtistInfo } from '../data/artistDatabase';
import { getSongsByArtistVotes, getAllSongVotes } from '../data/votingData';
import SongVotingComponent from '../components/SongVotingComponent';
import ArtistVotingComponent from '../components/ArtistVotingComponent';
import { useMessages } from '../contexts/MessageContext';
import { MessageModal } from '../components/messaging/MessageModal';

interface ArtistWithSongs {
  name: string;
  songs: PlaylistTrack[];
  image: string;
  genre: string;
  bio: string;
  popularity: number;
  artistInfo?: GenericArtistInfo;
}

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  GenericArtist: { artist: any };
  ArtistDetail: { artist: any };
  AutomaticScheduling: undefined;
  ArtistSongs: { artist: ArtistWithSongs };
  WeeklyPlaylist: { playlist: any };
};

type ArtistSongsRouteProp = RouteProp<RootStackParamList, 'ArtistSongs'>;
type ArtistSongsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArtistSongs'>;

export default function ArtistSongsScreen() {
  const route = useRoute<ArtistSongsRouteProp>();
  const navigation = useNavigation<ArtistSongsNavigationProp>();
  const { artist } = route.params;
  const [songVoteStats, setSongVoteStats] = useState({
    totalVotes: 0,
    preferred: 0,
    neutral: 0,
    avoided: 0,
    averageScore: 0
  });

  // Message context
  const { toggleModal, unreadCount } = useMessages();

  useEffect(() => {
    updateSongStats();
    const interval = setInterval(updateSongStats, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateSongStats = () => {
    const artistSongVotes = getSongsByArtistVotes(artist.name);
    const totalVotes = artistSongVotes.length;
    
    if (totalVotes > 0) {
      const preferred = artistSongVotes.filter(vote => vote.vote > 0).length;
      const neutral = artistSongVotes.filter(vote => vote.vote === 0).length;
      const avoided = artistSongVotes.filter(vote => vote.vote < 0).length;
      const averageScore = artistSongVotes.reduce((sum, vote) => sum + vote.vote, 0) / totalVotes;
      
      setSongVoteStats({
        totalVotes,
        preferred,
        neutral,
        avoided,
        averageScore
      });
    } else {
      setSongVoteStats({
        totalVotes: 0,
        preferred: 0,
        neutral: 0,
        avoided: 0,
        averageScore: 0
      });
    }
  };

  const handleSongVoteChange = (songId: string, vote: number) => {
    // Update stats when a vote changes
    setTimeout(updateSongStats, 100);
  };

  const handleSpotifyPress = (spotifyUrl: string, songTitle: string) => {
    Linking.canOpenURL(spotifyUrl).then(supported => {
      if (supported) {
        Linking.openURL(spotifyUrl);
      } else {
        Alert.alert(
          'Unable to open Spotify',
          `Please make sure you have Spotify installed to listen to "${songTitle}".`,
          [{ text: 'OK' }]
        );
      }
    });
  };

  const renderSongItem = (song: PlaylistTrack, index: number) => {
    return (
      <View key={song.id} style={styles.songCard}>
        <View style={styles.songHeader}>
          <View style={styles.songInfo}>
            <Text style={styles.songNumber}>{index + 1}</Text>
            <View style={styles.songDetails}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.songDuration}>{song.duration}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.spotifyButton}
            onPress={() => handleSpotifyPress(song.spotifyUrl, song.title)}
          >
            <Text style={styles.spotifyIcon}>🎵</Text>
          </TouchableOpacity>
        </View>
        
        <SongVotingComponent
          songId={song.id}
          songTitle={song.title}
          artistName={artist.name}
          onVoteChange={handleSongVoteChange}
          compact={true}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Artist Songs</Text>
        </View>

        {/* Artist Info Section */}
        <View style={styles.artistSection}>
          <Image source={{ uri: artist.image }} style={styles.artistImage} />
          <View style={styles.artistInfo}>
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.artistGenre}>{artist.genre}</Text>
            <Text style={styles.songCount}>{artist.songs.length} songs available</Text>
          </View>
        </View>

        {/* Artist Voting Section */}
        <View style={styles.artistVotingSection}>
          <Text style={styles.sectionTitle}>Rate this Artist</Text>
          <ArtistVotingComponent 
            artistName={artist.name}
            compact={false}
          />
        </View>

        {/* Song Vote Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Your Song Voting Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{songVoteStats.totalVotes}</Text>
              <Text style={styles.statLabel}>Song Votes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{songVoteStats.preferred}</Text>
              <Text style={styles.statLabel}>Liked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#FF6B6B' }]}>{songVoteStats.avoided}</Text>
              <Text style={styles.statLabel}>Disliked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#FFD93D' }]}>
                {songVoteStats.averageScore.toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </View>

        {/* Songs List */}
        <View style={styles.songsSection}>
          <Text style={styles.sectionTitle}>Songs by {artist.name}</Text>
          <Text style={styles.sectionSubtitle}>
            Rate each song to help personalize your festival experience
          </Text>
          
          {artist.songs.map((song, index) => renderSongItem(song, index))}
        </View>

        {/* Artist Bio Section */}
        {artist.artistInfo && (
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>About {artist.name}</Text>
            <Text style={styles.bioText}>{artist.artistInfo.bio}</Text>
            
            {artist.artistInfo.achievements.length > 0 && (
              <View style={styles.achievementsSection}>
                <Text style={styles.achievementsTitle}>Achievements</Text>
                {artist.artistInfo.achievements.slice(0, 3).map((achievement, index) => (
                  <Text key={index} style={styles.achievementItem}>
                    • {achievement}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Message Button */}
      <TouchableOpacity 
        style={styles.floatingMessageButton}
        onPress={toggleModal}
        activeOpacity={0.8}
      >
        <Text style={styles.messageIcon}>💬</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Message Modal */}
      <MessageModal />
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
  artistSection: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistGenre: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  songCount: {
    color: '#ccc',
    fontSize: 12,
  },
  artistVotingSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  statsSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
    fontSize: 11,
    marginTop: 5,
  },
  songsSection: {
    marginBottom: 20,
  },
  songCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  songHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songNumber: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  songDuration: {
    color: '#888',
    fontSize: 12,
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  spotifyIcon: {
    fontSize: 16,
  },
  bioSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  bioText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  achievementsSection: {
    marginTop: 10,
  },
  achievementsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achievementItem: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
  },
  // Floating Message Button Styles
  floatingMessageButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  messageIcon: {
    fontSize: 24,
    color: '#fff',
  },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
