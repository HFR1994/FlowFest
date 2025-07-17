import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { weeklyPlaylists, PlaylistTrack } from '../data/playlistData';
import { genericArtistDatabase } from '../data/artistDatabase';
import { generatePreferredSchedule, getAllVotes, getAllSongVotes, voteLabels } from '../data/votingData';
import { useMessages } from '../contexts/MessageContext';
import { MessageModal } from '../components/messaging/MessageModal';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  GenericArtist: { artist: any };
  ArtistDetail: { artist: any };
  AutomaticScheduling: undefined;
  ArtistSongs: { artist: any };
};

type AutomaticSchedulingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AutomaticScheduling'>;

interface GroupedArtist {
  artistName: string;
  songs: PlaylistTrack[];
  artistInfo: any;
  popularityScore: number;
  totalDuration: string;
}

export default function AutomaticSchedulingScreen() {
  const navigation = useNavigation<AutomaticSchedulingNavigationProp>();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [groupedArtists, setGroupedArtists] = useState<GroupedArtist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(weeklyPlaylists[0]);
  const [pollingResults, setPollingResults] = useState<any>(null);
  
  // Message context
  const { toggleModal, unreadCount } = useMessages();

  useEffect(() => {
    groupSongsByArtistForWeek(selectedWeek);
    updatePollingResults();
  }, [selectedWeek]);

  const updatePollingResults = () => {
    const results = generatePreferredSchedule();
    setPollingResults(results);
  };

  const calculateTotalDuration = (songs: PlaylistTrack[]): string => {
    let totalSeconds = 0;
    songs.forEach(song => {
      const [minutes, seconds] = song.duration.split(':').map(Number);
      totalSeconds += minutes * 60 + seconds;
    });
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${totalMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const groupSongsByArtistForWeek = (weekNumber: number) => {
    const playlist = weeklyPlaylists.find(p => p.weekNumber === weekNumber);
    if (!playlist) return;

    setCurrentPlaylist(playlist);

    const artistMap: { [key: string]: PlaylistTrack[] } = {};
    
    playlist.tracks.forEach(track => {
      if (!artistMap[track.artist]) {
        artistMap[track.artist] = [];
      }
      artistMap[track.artist].push(track);
    });

    const grouped: GroupedArtist[] = Object.keys(artistMap).map(artistName => ({
      artistName,
      songs: artistMap[artistName],
      artistInfo: genericArtistDatabase[artistName],
      popularityScore: genericArtistDatabase[artistName]?.popularity?.score ?? 0,
      totalDuration: calculateTotalDuration(artistMap[artistName]),
    }));

    grouped.sort((a, b) => b.popularityScore - a.popularityScore);
    setGroupedArtists(grouped);
  };

  const handleArtistPress = (artist: GroupedArtist) => {
    const artistWithFullInfo = {
      name: artist.artistName,
      songs: artist.songs,
      image: artist.artistInfo?.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      genre: artist.artistInfo?.genre || 'Unknown',
      bio: artist.artistInfo?.bio || 'No bio available',
      popularity: artist.popularityScore,
      artistInfo: artist.artistInfo,
    };
    navigation.navigate('ArtistSongs', { artist: artistWithFullInfo });
  };

  const handleGenerateSchedule = () => {
    const results = generatePreferredSchedule();
    
    if (results.totalVotes === 0) {
      Alert.alert(
        'No Votes Yet',
        'Please vote on some artists and songs first to generate your personalized schedule.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Schedule Generated Successfully! 🎉',
      `Your personalized schedule has been created based on ${results.totalVotes} artist votes and ${results.totalSongVotes} song votes. You'll love ${results.preferredArtists.length} artists and want to avoid ${results.avoidArtists.length} artists.`,
      [
        {
          text: 'View Schedule',
          onPress: () => {
            // Navigate back to RSVP screen with schedule tab active
            navigation.navigate('RSVP', { 
              festival: { 
                name: 'Global Beats Festival',
                location: 'Festival Grounds',
                dates: 'June 10-12, 2024'
              } 
            });
          }
        }
      ]
    );
  };

  const renderWeekButton = (playlist: any) => (
    <TouchableOpacity
      key={playlist.weekNumber}
      style={[
        styles.weekButton,
        selectedWeek === playlist.weekNumber && styles.weekButtonActive,
      ]}
      onPress={() => setSelectedWeek(playlist.weekNumber)}
    >
      <Text style={[
        styles.weekButtonText,
        selectedWeek === playlist.weekNumber && styles.weekButtonTextActive,
      ]}>
        Week {playlist.weekNumber}
      </Text>
      <Text style={[
        styles.weekButtonSubtext,
        selectedWeek === playlist.weekNumber && styles.weekButtonSubtextActive,
      ]}>
        {playlist.tracks.length} tracks
      </Text>
    </TouchableOpacity>
  );

  const renderArtistListItem = ({ item: artist }: { item: GroupedArtist }) => (
    <TouchableOpacity
      style={styles.artistListItem}
      onPress={() => handleArtistPress(artist)}
    >
      <Image
        source={{ 
          uri: artist.artistInfo?.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' 
        }}
        style={styles.artistListImage}
      />
      <View style={styles.artistListContent}>
        <View style={styles.artistListHeader}>
          <Text style={styles.artistListName}>{artist.artistName}</Text>
          <View style={styles.popularityBadgeSmall}>
            <Text style={styles.popularityTextSmall}>{artist.popularityScore}</Text>
          </View>
        </View>
        <Text style={styles.artistListGenre}>{artist.artistInfo?.genre || 'Unknown Genre'}</Text>
        <View style={styles.artistListStats}>
          <Text style={styles.artistListStat}>{artist.songs.length} songs</Text>
          <Text style={styles.artistListStat}>•</Text>
          <Text style={styles.artistListStat}>{artist.totalDuration}</Text>
          <Text style={styles.artistListStat}>•</Text>
          <Text style={styles.artistListStat}>
            {artist.artistInfo?.popularity?.monthlyListeners 
              ? `${(artist.artistInfo.popularity.monthlyListeners / 1000000).toFixed(1)}M listeners`
              : 'New Artist'
            }
          </Text>
        </View>
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weekly Playlists</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Week Selector */}
        <View style={styles.weekSelectorContainer}>
          <Text style={styles.sectionTitle}>Choose Your Week</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weekSelectorContent}
          >
            {weeklyPlaylists.map(renderWeekButton)}
          </ScrollView>
        </View>

        {/* Current Playlist Info */}
        <View style={styles.playlistInfoContainer}>
          <Image 
            source={{ uri: currentPlaylist.coverImage }}
            style={styles.playlistCoverImage}
          />
          <View style={styles.playlistInfoOverlay}>
            <Text style={styles.playlistTitle}>{currentPlaylist.weekTitle}</Text>
            <Text style={styles.playlistDescription}>{currentPlaylist.description}</Text>
            <View style={styles.playlistStats}>
              <Text style={styles.playlistStat}>{currentPlaylist.tracks.length} tracks</Text>
              <Text style={styles.playlistStat}>•</Text>
              <Text style={styles.playlistStat}>{currentPlaylist.totalDuration}</Text>
              <Text style={styles.playlistStat}>•</Text>
              <Text style={styles.playlistStat}>{groupedArtists.length} artists</Text>
            </View>
          </View>
        </View>

        {/* Polling Results Section */}
        {pollingResults && pollingResults.totalVotes > 0 && (
          <View style={styles.pollingSection}>
            <Text style={styles.sectionTitle}>Your Voting Results</Text>
            <View style={styles.pollingStats}>
              <View style={styles.pollingStatItem}>
                <Text style={styles.pollingStatNumber}>{pollingResults.totalVotes}</Text>
                <Text style={styles.pollingStatLabel}>Artist Votes</Text>
              </View>
              <View style={styles.pollingStatItem}>
                <Text style={styles.pollingStatNumber}>{pollingResults.totalSongVotes}</Text>
                <Text style={styles.pollingStatLabel}>Song Votes</Text>
              </View>
              <View style={styles.pollingStatItem}>
                <Text style={styles.pollingStatNumber}>{pollingResults.averageScore.toFixed(1)}</Text>
                <Text style={styles.pollingStatLabel}>Avg Score</Text>
              </View>
            </View>
            
            <View style={styles.pollingBreakdown}>
              <View style={styles.pollingCategory}>
                <Text style={styles.pollingCategoryTitle}>
                  ❤️ Preferred Artists ({pollingResults.preferredArtists.length})
                </Text>
                {pollingResults.preferredArtists.slice(0, 3).map((artist: any, index: number) => (
                  <Text key={index} style={styles.pollingArtistItem}>
                    {voteLabels[artist.score].emoji} {artist.artistName}
                  </Text>
                ))}
              </View>
              
              {pollingResults.avoidArtists.length > 0 && (
                <View style={styles.pollingCategory}>
                  <Text style={styles.pollingCategoryTitle}>
                    ❌ Artists to Avoid ({pollingResults.avoidArtists.length})
                  </Text>
                  {pollingResults.avoidArtists.slice(0, 2).map((artist: any, index: number) => (
                    <Text key={index} style={styles.pollingArtistItem}>
                      {voteLabels[artist.score].emoji} {artist.artistName}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* All Artists List */}
        <View style={styles.allArtistsSection}>
          <Text style={styles.sectionTitle}>All Artists This Week</Text>
          <Text style={styles.sectionSubtitle}>
            Tap any artist to explore their songs and rate them
          </Text>
          <FlatList
            data={groupedArtists}
            renderItem={renderArtistListItem}
            keyExtractor={(item) => item.artistName}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Generate Schedule Button */}
        <View style={styles.generateScheduleSection}>
          <TouchableOpacity
            style={styles.generateScheduleButton}
            onPress={handleGenerateSchedule}
            activeOpacity={0.8}
          >
            <Text style={styles.generateScheduleIcon}>🎯</Text>
            <View style={styles.generateScheduleContent}>
              <Text style={styles.generateScheduleTitle}>Generate My Schedule</Text>
              <Text style={styles.generateScheduleSubtitle}>
                Create your personalized festival schedule based on your votes
              </Text>
            </View>
            <Text style={styles.generateScheduleArrow}>→</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  
  // Week Selector Styles
  weekSelectorContainer: {
    marginBottom: 25,
  },
  weekSelectorContent: {
    paddingHorizontal: 15,
  },
  weekButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  weekButtonActive: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff8a8a',
  },
  weekButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  weekButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weekButtonSubtext: {
    color: '#888',
    fontSize: 11,
    marginTop: 2,
  },
  weekButtonSubtextActive: {
    color: '#fff',
  },

  // Playlist Info Styles
  playlistInfoContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
  },
  playlistCoverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playlistInfoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playlistDescription: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  playlistStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistStat: {
    color: '#ccc',
    fontSize: 14,
    marginRight: 8,
  },

  // Polling Results Styles
  pollingSection: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  pollingStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  pollingStatItem: {
    alignItems: 'center',
  },
  pollingStatNumber: {
    color: '#ff6b6b',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pollingStatLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  pollingBreakdown: {
    marginTop: 15,
  },
  pollingCategory: {
    marginBottom: 15,
  },
  pollingCategoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pollingArtistItem: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
    paddingLeft: 10,
  },

  // Generate Schedule Button Styles
  generateScheduleSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  generateScheduleButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  generateScheduleIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  generateScheduleContent: {
    flex: 1,
  },
  generateScheduleTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  generateScheduleSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  generateScheduleArrow: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  // All Artists List Styles
  allArtistsSection: {
    marginBottom: 30,
  },
  artistListItem: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  artistListImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  artistListContent: {
    flex: 1,
  },
  artistListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  artistListName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  popularityBadgeSmall: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  popularityTextSmall: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  artistListGenre: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  artistListStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistListStat: {
    color: '#888',
    fontSize: 12,
    marginRight: 6,
  },
  chevron: {
    marginLeft: 10,
  },
  chevronText: {
    color: '#666',
    fontSize: 24,
    fontWeight: '300',
  },
  separator: {
    height: 12,
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
