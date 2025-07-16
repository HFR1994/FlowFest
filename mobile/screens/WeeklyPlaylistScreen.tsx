import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Linking,
  Alert
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WeeklyPlaylist, PlaylistTrack } from '../data/playlistData';
import ArtistVotingComponent from '../components/ArtistVotingComponent';
import { getAllVotes } from '../data/votingData';

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  GenericArtist: { artist: any };
  ArtistDetail: { artist: any };
  AutomaticScheduling: undefined;
  WeeklyPlaylist: { playlist: WeeklyPlaylist };
};

type WeeklyPlaylistRouteProp = RouteProp<RootStackParamList, 'WeeklyPlaylist'>;
type WeeklyPlaylistNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WeeklyPlaylist'>;

export default function WeeklyPlaylistScreen() {
  const route = useRoute<WeeklyPlaylistRouteProp>();
  const navigation = useNavigation<WeeklyPlaylistNavigationProp>();
  const { playlist } = route.params;
  const [votedArtists, setVotedArtists] = useState<Set<string>>(new Set());
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  useEffect(() => {
    // Load existing votes
    updateVotedArtists();
  }, [playlist]);

  const updateVotedArtists = () => {
    const votes = getAllVotes();
    const artistsWithVotes = new Set(
      playlist.tracks
        .map(track => track.artist)
        .filter(artist => votes[artist] !== undefined)
    );
    setVotedArtists(artistsWithVotes);
  };

  const handleVoteChange = (artistName: string, vote: number) => {
    // Update voted artists set - all votes count, including neutral (0)
    const newVotedArtists = new Set(votedArtists);
    newVotedArtists.add(artistName);
    setVotedArtists(newVotedArtists);
  };

  const handleSpotifyPress = async (spotifyUrl: string, trackTitle: string) => {
    try {
      const supported = await Linking.canOpenURL(spotifyUrl);
      if (supported) {
        await Linking.openURL(spotifyUrl);
      } else {
        Alert.alert(
          'Spotify Not Available',
          `Cannot open Spotify link for "${trackTitle}". Please make sure Spotify is installed.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open Spotify link');
    }
  };

  const handlePlayPreview = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      // In a real app, this would play the preview audio
      setTimeout(() => setPlayingTrack(null), 30000); // Auto-stop after 30 seconds
    }
  };

  const getUniqueArtists = () => {
    const artistSet = new Set(playlist.tracks.map(track => track.artist));
    return Array.from(artistSet);
  };

  const getVotingProgress = () => {
    const uniqueArtists = getUniqueArtists();
    const votedCount = uniqueArtists.filter(artist => votedArtists.has(artist)).length;
    return {
      voted: votedCount,
      total: uniqueArtists.length,
      percentage: uniqueArtists.length > 0 ? (votedCount / uniqueArtists.length) * 100 : 0
    };
  };

  const renderTrackItem = (track: PlaylistTrack, index: number) => {
    const isPlaying = playingTrack === track.id;
    
    return (
      <View key={track.id} style={styles.trackItem}>
        <View style={styles.trackHeader}>
          <View style={styles.trackNumber}>
            <Text style={styles.trackNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>
            <Text style={styles.trackDuration}>{track.duration}</Text>
          </View>
          <View style={styles.trackActions}>
            <TouchableOpacity
              style={[styles.playButton, isPlaying && styles.playButtonActive]}
              onPress={() => handlePlayPreview(track.id)}
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.spotifyButton}
              onPress={() => handleSpotifyPress(track.spotifyUrl, track.title)}
            >
              <Text style={styles.spotifyButtonText}>🎵</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Artist Voting Component */}
        <ArtistVotingComponent
          artistName={track.artist}
          onVoteChange={handleVoteChange}
          compact={true}
        />
      </View>
    );
  };

  const renderArtistVotingSection = () => {
    const uniqueArtists = getUniqueArtists();
    
    return (
      <View style={styles.artistVotingSection}>
        <Text style={styles.sectionTitle}>Vote on Artists</Text>
        <Text style={styles.sectionSubtitle}>
          Rate each artist to help personalize your festival schedule
        </Text>
        
        {uniqueArtists.map(artist => (
          <ArtistVotingComponent
            key={artist}
            artistName={artist}
            onVoteChange={handleVoteChange}
            compact={false}
          />
        ))}
      </View>
    );
  };

  const progress = getVotingProgress();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Week {playlist.weekNumber}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Playlist Header */}
        <View style={styles.playlistHeader}>
          <Image source={{ uri: playlist.coverImage }} style={styles.coverImage} />
          <View style={styles.playlistInfo}>
            <Text style={styles.playlistTitle}>{playlist.weekTitle}</Text>
            <Text style={styles.playlistDescription}>{playlist.description}</Text>
            <View style={styles.playlistMeta}>
              <Text style={styles.metaText}>⏱️ {playlist.totalDuration}</Text>
              <Text style={styles.metaText}>🎵 {playlist.tracks.length} tracks</Text>
              <Text style={styles.metaText}>👥 {getUniqueArtists().length} artists</Text>
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Voting Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress.percentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {progress.voted} of {progress.total} artists voted ({Math.round(progress.percentage)}%)
          </Text>
        </View>

        {/* Tracks List */}
        <View style={styles.tracksSection}>
          <Text style={styles.sectionTitle}>Playlist Tracks</Text>
          <Text style={styles.sectionSubtitle}>
            Listen to previews and vote on each artist
          </Text>
          
          {playlist.tracks.map(renderTrackItem)}
        </View>

        {/* Artist Voting Section */}
        {renderArtistVotingSection()}

        {/* Spotify Integration */}
        <View style={styles.spotifySection}>
          <Text style={styles.sectionTitle}>🎵 Listen on Spotify</Text>
          <Text style={styles.sectionSubtitle}>
            Open individual tracks in Spotify for full listening experience
          </Text>
          <TouchableOpacity
            style={styles.spotifyPlaylistButton}
            onPress={() => Alert.alert(
              'Spotify Playlist',
              'In a real app, this would open the full playlist in Spotify',
              [{ text: 'OK' }]
            )}
          >
            <Text style={styles.spotifyPlaylistButtonText}>
              🎵 Open Full Playlist in Spotify
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🎧</Text>
            <Text style={styles.tipText}>
              Use headphones for the best preview experience
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>⭐</Text>
            <Text style={styles.tipText}>
              Vote honestly - this helps create your perfect schedule
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🔄</Text>
            <Text style={styles.tipText}>
              You can change your votes anytime before the festival
            </Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playlistHeader: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playlistDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  playlistMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaText: {
    color: '#888',
    fontSize: 12,
    marginRight: 15,
    marginBottom: 5,
  },
  progressSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    backgroundColor: '#333',
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    backgroundColor: '#ff6b6b',
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  tracksSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
  },
  trackItem: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  trackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackNumber: {
    backgroundColor: '#333',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trackNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  trackArtist: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 3,
  },
  trackDuration: {
    color: '#888',
    fontSize: 12,
  },
  trackActions: {
    flexDirection: 'row',
  },
  playButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  playButtonActive: {
    backgroundColor: '#ff6b6b',
  },
  playButtonText: {
    fontSize: 16,
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotifyButtonText: {
    fontSize: 16,
  },
  artistVotingSection: {
    marginBottom: 20,
  },
  spotifySection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  spotifyPlaylistButton: {
    backgroundColor: '#1DB954',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  spotifyPlaylistButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  tipText: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
});
