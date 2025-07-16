import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { weeklyPlaylists, WeeklyPlaylist } from '../data/playlistData';
import { generatePreferredSchedule, getAllVotes } from '../data/votingData';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  GenericArtist: { artist: any };
  ArtistDetail: { artist: any };
  AutomaticScheduling: undefined;
  WeeklyPlaylist: { playlist: WeeklyPlaylist };
};

type AutomaticSchedulingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AutomaticScheduling'>;

export default function AutomaticSchedulingScreen() {
  const navigation = useNavigation<AutomaticSchedulingNavigationProp>();
  const [totalVotes, setTotalVotes] = useState(0);
  const [preferenceStats, setPreferenceStats] = useState({
    preferred: 0,
    neutral: 0,
    avoided: 0,
    averageScore: 0
  });

  useEffect(() => {
    updateStats();
    // Set up interval to update stats regularly to reflect new votes
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateStats = () => {
    const votes = getAllVotes();
    const voteCount = Object.keys(votes).length;
    setTotalVotes(voteCount);

    if (voteCount > 0) {
      const schedule = generatePreferredSchedule();
      setPreferenceStats({
        preferred: schedule.preferredArtists.length,
        neutral: schedule.neutralArtists.length,
        avoided: schedule.avoidArtists.length,
        averageScore: schedule.averageScore
      });
    } else {
      setPreferenceStats({
        preferred: 0,
        neutral: 0,
        avoided: 0,
        averageScore: 0
      });
    }
  };

  const handlePlaylistPress = (playlist: WeeklyPlaylist) => {
    navigation.navigate('WeeklyPlaylist', { playlist });
  };

  const handleGenerateSchedule = () => {
    if (totalVotes === 0) {
      Alert.alert(
        'No Votes Yet',
        'Please vote on some artists in the weekly playlists first to generate your personalized schedule.',
        [{ text: 'OK' }]
      );
      return;
    }

    const schedule = generatePreferredSchedule();
    
    let message = `Based on your ${totalVotes} votes:\n\n`;
    message += `✅ Preferred Artists: ${schedule.preferredArtists.length}\n`;
    message += `😐 Neutral Artists: ${schedule.neutralArtists.length}\n`;
    message += `❌ Artists to Avoid: ${schedule.avoidArtists.length}\n\n`;
    message += `Average Preference Score: ${schedule.averageScore.toFixed(1)}/2\n\n`;
    
    if (schedule.preferredArtists.length > 0) {
      message += `Top Recommendations:\n`;
      schedule.preferredArtists.slice(0, 3).forEach((artist, index) => {
        message += `${index + 1}. ${artist.artistName} (${artist.score > 0 ? '+' : ''}${artist.score})\n`;
      });
    }

    Alert.alert('Your Personalized Schedule', message, [{ text: 'Great!' }]);
  };

  const renderPlaylistCard = (playlist: WeeklyPlaylist) => {
    return (
      <TouchableOpacity
        key={playlist.weekNumber}
        style={styles.playlistCard}
        onPress={() => handlePlaylistPress(playlist)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: playlist.coverImage }} style={styles.playlistImage} />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>{playlist.weekTitle}</Text>
          <Text style={styles.playlistDescription}>{playlist.description}</Text>
          <View style={styles.playlistMeta}>
            <Text style={styles.playlistDuration}>⏱️ {playlist.totalDuration}</Text>
            <Text style={styles.playlistTracks}>🎵 {playlist.tracks.length} tracks</Text>
          </View>
        </View>
        <View style={styles.playlistArrow}>
          <Text style={styles.arrowText}>▶️</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Automatic Scheduling</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>🎵 Personalized Festival Experience</Text>
          <Text style={styles.introText}>
            Discover curated Spotify playlists organized by weeks leading up to the festival. 
            Vote on artists to help us create your perfect schedule!
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Your Voting Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalVotes}</Text>
              <Text style={styles.statLabel}>Total Votes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{preferenceStats.preferred}</Text>
              <Text style={styles.statLabel}>Preferred</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#FF6B6B' }]}>{preferenceStats.avoided}</Text>
              <Text style={styles.statLabel}>To Avoid</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#FFD93D' }]}>
                {preferenceStats.averageScore.toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </View>

        {/* Weekly Playlists */}
        <View style={styles.playlistsSection}>
          <Text style={styles.sectionTitle}>Weekly Playlists</Text>
          <Text style={styles.sectionSubtitle}>
            Explore and vote on artists from each week's curated playlist
          </Text>
          
          {weeklyPlaylists.map(renderPlaylistCard)}
        </View>

        {/* Generate Schedule Button */}
        <View style={styles.generateSection}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              totalVotes === 0 && styles.generateButtonDisabled
            ]}
            onPress={handleGenerateSchedule}
            activeOpacity={0.8}
          >
            <Text style={styles.generateButtonIcon}>🎯</Text>
            <Text style={styles.generateButtonText}>Generate My Schedule</Text>
            <Text style={styles.generateButtonSubtext}>
              {totalVotes === 0 
                ? 'Vote on artists first' 
                : `Based on ${totalVotes} votes`
              }
            </Text>
          </TouchableOpacity>
        </View>

        {/* How it Works */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Explore Weekly Playlists</Text>
              <Text style={styles.stepDescription}>
                Browse curated Spotify playlists featuring festival artists
              </Text>
            </View>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Vote on Artists</Text>
              <Text style={styles.stepDescription}>
                Rate each artist from -2 (hate) to +2 (love) based on your preferences
              </Text>
            </View>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get Your Schedule</Text>
              <Text style={styles.stepDescription}>
                We'll create a personalized festival schedule based on your votes
              </Text>
            </View>
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
  introSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  introTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  introText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  statsSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 18,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
  playlistsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
  },
  playlistCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playlistDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  playlistMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playlistDuration: {
    color: '#888',
    fontSize: 12,
  },
  playlistTracks: {
    color: '#888',
    fontSize: 12,
  },
  playlistArrow: {
    marginLeft: 10,
  },
  arrowText: {
    fontSize: 20,
  },
  generateSection: {
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#333',
  },
  generateButtonIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  generateButtonSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  howItWorksSection: {
    marginBottom: 30,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
  },
  stepNumber: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
