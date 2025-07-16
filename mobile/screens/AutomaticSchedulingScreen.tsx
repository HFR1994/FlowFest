import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Alert,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { weeklyPlaylists, WeeklyPlaylist, PlaylistTrack } from '../data/playlistData';
import { generatePreferredSchedule, getAllVotes, getAllSongVotes } from '../data/votingData';
import { genericArtistDatabase } from '../data/artistDatabase';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.75;
const CARD_HEIGHT = screenHeight * 0.6;
const CARD_SPACING = 20;

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  GenericArtist: { artist: any };
  ArtistDetail: { artist: any };
  AutomaticScheduling: undefined;
  ArtistSongs: { artist: ArtistWithSongs };
  WeeklyPlaylist: { playlist: WeeklyPlaylist };
};

type AutomaticSchedulingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AutomaticScheduling'>;

interface ArtistWithSongs {
  name: string;
  songs: PlaylistTrack[];
  image: string;
  genre: string;
  bio: string;
  popularity: number;
}

export default function AutomaticSchedulingScreen() {
  const navigation = useNavigation<AutomaticSchedulingNavigationProp>();
  const [totalVotes, setTotalVotes] = useState(0);
  const [preferenceStats, setPreferenceStats] = useState({
    preferred: 0,
    neutral: 0,
    avoided: 0,
    averageScore: 0
  });
  const [songStats, setSongStats] = useState({
    totalSongVotes: 0,
    preferredSongs: 0,
    neutralSongs: 0,
    avoidedSongs: 0,
    averageSongScore: 0
  });
  const [artistsWithSongs, setArtistsWithSongs] = useState<ArtistWithSongs[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    groupSongsByArtist();
    updateStats();
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  const groupSongsByArtist = () => {
    const artistMap: { [key: string]: PlaylistTrack[] } = {};
    
    // Group all songs by artist across all playlists
    weeklyPlaylists.forEach(playlist => {
      playlist.tracks.forEach(track => {
        if (!artistMap[track.artist]) {
          artistMap[track.artist] = [];
        }
        artistMap[track.artist].push(track);
      });
    });

    // Convert to array with artist info
    const artists: ArtistWithSongs[] = Object.keys(artistMap).map(artistName => {
      const artistInfo = genericArtistDatabase[artistName];
      return {
        name: artistName,
        songs: artistMap[artistName],
        image: artistInfo?.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genre: artistInfo?.genre || 'Unknown',
        bio: artistInfo?.bio || 'No bio available',
        popularity: artistInfo?.popularity?.score || 0
      };
    });

    // Sort by popularity
    artists.sort((a, b) => b.popularity - a.popularity);
    setArtistsWithSongs(artists);
  };

  const updateStats = () => {
    const votes = getAllVotes();
    const songVotes = getAllSongVotes();
    const voteCount = Object.keys(votes).length;
    const songVoteCount = Object.keys(songVotes).length;
    
    setTotalVotes(voteCount);

    if (voteCount > 0 || songVoteCount > 0) {
      const schedule = generatePreferredSchedule();
      setPreferenceStats({
        preferred: schedule.preferredArtists.length,
        neutral: schedule.neutralArtists.length,
        avoided: schedule.avoidArtists.length,
        averageScore: schedule.averageScore
      });
      
      setSongStats({
        totalSongVotes: schedule.totalSongVotes,
        preferredSongs: schedule.preferredSongs.length,
        neutralSongs: schedule.neutralSongs.length,
        avoidedSongs: schedule.avoidSongs.length,
        averageSongScore: schedule.averageSongScore
      });
    } else {
      setPreferenceStats({
        preferred: 0,
        neutral: 0,
        avoided: 0,
        averageScore: 0
      });
      
      setSongStats({
        totalSongVotes: 0,
        preferredSongs: 0,
        neutralSongs: 0,
        avoidedSongs: 0,
        averageSongScore: 0
      });
    }
  };

  const handleArtistPress = (artist: ArtistWithSongs) => {
    // Add artist info from database to the artist object
    const artistWithFullInfo = {
      ...artist,
      artistInfo: genericArtistDatabase[artist.name]
    };
    navigation.navigate('ArtistSongs', { artist: artistWithFullInfo });
  };

  const handleGenerateSchedule = () => {
    if (totalVotes === 0 && songStats.totalSongVotes === 0) {
      Alert.alert(
        'No Votes Yet',
        'Please vote on some artists or songs first to generate your personalized schedule.',
        [{ text: 'OK' }]
      );
      return;
    }

    const schedule = generatePreferredSchedule();
    
    let message = `Based on your voting activity:\n\n`;
    
    if (totalVotes > 0) {
      message += `🎤 ARTIST VOTES (${totalVotes}):\n`;
      message += `✅ Preferred: ${schedule.preferredArtists.length}\n`;
      message += `😐 Neutral: ${schedule.neutralArtists.length}\n`;
      message += `❌ Avoid: ${schedule.avoidArtists.length}\n`;
      message += `📊 Avg Score: ${schedule.averageScore.toFixed(1)}/2\n\n`;
    }
    
    if (songStats.totalSongVotes > 0) {
      message += `🎵 SONG VOTES (${songStats.totalSongVotes}):\n`;
      message += `✅ Liked Songs: ${songStats.preferredSongs}\n`;
      message += `😐 Neutral Songs: ${songStats.neutralSongs}\n`;
      message += `❌ Disliked Songs: ${songStats.avoidedSongs}\n`;
      message += `📊 Avg Score: ${songStats.averageSongScore.toFixed(1)}/2\n\n`;
    }
    
    if (schedule.preferredArtists.length > 0) {
      message += `🌟 TOP ARTIST RECOMMENDATIONS:\n`;
      schedule.preferredArtists.slice(0, 3).forEach((artist, index) => {
        message += `${index + 1}. ${artist.artistName} (${artist.score > 0 ? '+' : ''}${artist.score})\n`;
      });
    }
    
    if (schedule.preferredSongs.length > 0) {
      message += `\n🎶 TOP SONG RECOMMENDATIONS:\n`;
      schedule.preferredSongs.slice(0, 3).forEach((song, index) => {
        message += `${index + 1}. "${song.songTitle}" by ${song.artistName} (${song.score > 0 ? '+' : ''}${song.score})\n`;
      });
    }

    Alert.alert('Your Personalized Schedule', message, [{ text: 'Great!' }]);
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
    setCurrentIndex(index);
  };

  const renderArtistCard = (artist: ArtistWithSongs, index: number) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + CARD_SPACING),
      index * (CARD_WIDTH + CARD_SPACING),
      (index + 1) * (CARD_WIDTH + CARD_SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ['45deg', '0deg', '-45deg'],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={artist.name}
        style={[
          styles.artistCard,
          {
            transform: [{ scale }, { rotateY }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => handleArtistPress(artist)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: artist.image }} style={styles.artistImage} />
          
          <View style={styles.artistInfo}>
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.artistGenre}>{artist.genre}</Text>
            <Text style={styles.songCount}>{artist.songs.length} songs</Text>
          </View>

          <View style={styles.songsContainer}>
            <Text style={styles.songsTitle}>Featured Songs:</Text>
            <ScrollView style={styles.songsList} showsVerticalScrollIndicator={false}>
              {artist.songs.map((song, songIndex) => (
                <View key={song.id} style={styles.songItem}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {songIndex + 1}. {song.title}
                  </Text>
                  <Text style={styles.songDuration}>{song.duration}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.popularityContainer}>
            <Text style={styles.popularityLabel}>Popularity</Text>
            <View style={styles.popularityBar}>
              <View 
                style={[
                  styles.popularityFill, 
                  { width: `${artist.popularity}%` }
                ]} 
              />
            </View>
            <Text style={styles.popularityScore}>{artist.popularity}/100</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {artistsWithSongs.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artist Coverflow</Text>
      </View>

      <ScrollView 
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
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
          
          {/* Song Stats Row */}
          {songStats.totalSongVotes > 0 && (
            <>
              <Text style={[styles.statsTitle, { marginTop: 15, marginBottom: 10 }]}>Song Voting Progress</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{songStats.totalSongVotes}</Text>
                  <Text style={styles.statLabel}>Song Votes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{songStats.preferredSongs}</Text>
                  <Text style={styles.statLabel}>Liked</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: '#FF6B6B' }]}>{songStats.avoidedSongs}</Text>
                  <Text style={styles.statLabel}>Disliked</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: '#FFD93D' }]}>
                    {songStats.averageSongScore.toFixed(1)}
                  </Text>
                  <Text style={styles.statLabel}>Song Avg</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Artist Coverflow */}
        <View style={styles.coverflowContainer}>
          <Text style={styles.sectionTitle}>Festival Artists ({artistsWithSongs.length} total)</Text>
          <Text style={styles.sectionSubtitle}>
            Swipe through artists and their songs • Tap to explore
          </Text>
          
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            contentContainerStyle={styles.scrollContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { 
                useNativeDriver: true,
                listener: handleScroll,
              }
            )}
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleScroll}
          >
            {artistsWithSongs.map((artist, index) => renderArtistCard(artist, index))}
          </Animated.ScrollView>

          {/* Pagination Dots */}
          {renderPaginationDots()}
        </View>

        {/* Generate Schedule Button */}
        <View style={styles.generateSection}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              (totalVotes === 0 && songStats.totalSongVotes === 0) && styles.generateButtonDisabled
            ]}
            onPress={handleGenerateSchedule}
            activeOpacity={0.8}
          >
            <Text style={styles.generateButtonIcon}>🎯</Text>
            <Text style={styles.generateButtonText}>Generate My Schedule</Text>
            <Text style={styles.generateButtonSubtext}>
              {totalVotes === 0 && songStats.totalSongVotes === 0
                ? 'Vote on artists or songs first' 
                : `Based on ${totalVotes} artist votes${songStats.totalSongVotes > 0 ? ` & ${songStats.totalSongVotes} song votes` : ''}`
              }
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#000',
    zIndex: 10,
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  statsSection: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
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
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  coverflowContainer: {
    marginBottom: 30,
    minHeight: CARD_HEIGHT + 100,
  },
  scrollContainer: {
    paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
  },
  artistCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: CARD_SPACING / 2,
  },
  cardContent: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  artistImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  artistInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  artistName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  artistGenre: {
    color: '#ff6b6b',
    fontSize: 16,
    marginBottom: 5,
  },
  songCount: {
    color: '#ccc',
    fontSize: 14,
  },
  songsContainer: {
    flex: 1,
    marginBottom: 15,
  },
  songsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songsList: {
    flex: 1,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  songTitle: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  songDuration: {
    color: '#888',
    fontSize: 12,
  },
  popularityContainer: {
    alignItems: 'center',
  },
  popularityLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularityBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 5,
  },
  popularityFill: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 3,
  },
  popularityScore: {
    color: '#ccc',
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ff6b6b',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  generateSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
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
});
