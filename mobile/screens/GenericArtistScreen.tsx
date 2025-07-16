import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface GenericArtistInfo {
  name?: string;
  bio?: string;
  genre?: string;
  image?: string;
  popularity?: {
    score: number;
    monthlyListeners: number;
    followers: number;
  };
  discography?: {
    albums: number;
    singles: number;
    collaborations: number;
  };
  achievements?: string[];
  socialMedia?: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  careerHighlights?: string[];
  yearsActive?: string;
  origin?: string;
  labels?: string[];
}

type RootStackParamList = {
  Home: undefined;
  EventDetail: { festival: any };
  RSVP: { festival: any };
  ArtistDetail: { artist: any };
  GenericArtist: { artist: GenericArtistInfo };
};

type GenericArtistRouteProp = RouteProp<RootStackParamList, 'GenericArtist'>;
type GenericArtistNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GenericArtist'>;

export default function GenericArtistScreen() {
  const route = useRoute<GenericArtistRouteProp>();
  const navigation = useNavigation<GenericArtistNavigationProp>();
  const { artist } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowArtist = () => {
    setIsFollowing(!isFollowing);
    const action = !isFollowing ? 'followed' : 'unfollowed';
    Alert.alert(
      'Success',
      `You have ${action} ${artist.name}!`,
      [{ text: 'OK' }]
    );
  };

  const handleSocialPress = (url: string, platform: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
          `Unable to open ${platform}`,
          `Please make sure you have ${platform} installed on your device.`,
          [{ text: 'OK' }]
        );
      }
    });
  };

  const getPopularityLevel = (score: number) => {
    if (score >= 90) return { level: 'Superstar', color: '#FFD700', icon: '⭐' };
    if (score >= 75) return { level: 'Very Popular', color: '#FF6B6B', icon: '🔥' };
    if (score >= 60) return { level: 'Popular', color: '#4ECDC4', icon: '📈' };
    if (score >= 40) return { level: 'Rising', color: '#45B7D1', icon: '🚀' };
    return { level: 'Emerging', color: '#96CEB4', icon: '🌱' };
  };

  const popularityInfo = artist.popularity ? getPopularityLevel(artist.popularity.score) : { level: 'N/A', color: '#888', icon: '❓' };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: artist.image || 'https://via.placeholder.com/400x300?text=No+Image' }} style={styles.artistImage} />
      
      <View style={styles.content}>
        <Text style={styles.artistName}>{artist.name || 'Unknown Artist'}</Text>
        <Text style={styles.artistGenre}>{artist.genre || 'Unknown Genre'}</Text>
        
        {/* Basic Info Section */}
        <View style={styles.basicInfoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🌍 Origin:</Text>
            <Text style={styles.infoValue}>{artist.origin || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Years Active:</Text>
            <Text style={styles.infoValue}>{artist.yearsActive || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🏷️ Labels:</Text>
            <Text style={styles.infoValue}>{artist.labels ? artist.labels.join(', ') : 'N/A'}</Text>
          </View>
        </View>

        {/* Popularity Section */}
        <View style={styles.popularitySection}>
          <Text style={styles.sectionTitle}>Popularity & Stats</Text>
          <View style={styles.popularityCard}>
            <View style={styles.popularityHeader}>
              <Text style={styles.popularityIcon}>{popularityInfo.icon}</Text>
              <View style={styles.popularityInfo}>
                <Text style={styles.popularityScore}>
                  {artist.popularity ? `${artist.popularity.score}/100` : 'N/A'}
                </Text>
                <Text style={[styles.popularityLevel, { color: popularityInfo.color }]}>
                  {popularityInfo.level}
                </Text>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {artist.popularity ? `${(artist.popularity.monthlyListeners / 1000000).toFixed(1)}M` : 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Monthly Listeners</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {artist.popularity ? `${(artist.popularity.followers / 1000).toFixed(0)}K` : 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Discography Section */}
        <View style={styles.discographySection}>
          <Text style={styles.sectionTitle}>Discography</Text>
          <View style={styles.discographyGrid}>
            <View style={styles.discographyItem}>
              <Text style={styles.discographyNumber}>{artist.discography?.albums || 0}</Text>
              <Text style={styles.discographyLabel}>Albums</Text>
            </View>
            <View style={styles.discographyItem}>
              <Text style={styles.discographyNumber}>{artist.discography?.singles || 0}</Text>
              <Text style={styles.discographyLabel}>Singles</Text>
            </View>
            <View style={styles.discographyItem}>
              <Text style={styles.discographyNumber}>{artist.discography?.collaborations || 0}</Text>
              <Text style={styles.discographyLabel}>Collaborations</Text>
            </View>
          </View>
        </View>
        
        {/* Biography Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.bioText}>{artist.bio || 'No biography available.'}</Text>
        </View>

        {/* Career Highlights Section */}
        <View style={styles.highlightsSection}>
          <Text style={styles.sectionTitle}>Career Highlights</Text>
          {artist.careerHighlights && artist.careerHighlights.length > 0 ? (
            artist.careerHighlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <Text style={styles.highlightIcon}>🏆</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>🏆</Text>
              <Text style={styles.highlightText}>No career highlights available.</Text>
            </View>
          )}
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {artist.achievements && artist.achievements.length > 0 ? (
            artist.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🎖️</Text>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))
          ) : (
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🎖️</Text>
              <Text style={styles.achievementText}>No achievements available.</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.followButton, isFollowing && styles.followingButton]}
            onPress={handleFollowArtist}
          >
            <Text style={styles.actionButtonIcon}>{isFollowing ? '❤️' : '🤍'}</Text>
            <Text style={[styles.actionButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow Artist'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Connect</Text>
          <View style={styles.socialButtons}>
            {artist.socialMedia?.spotify && (
              <TouchableOpacity 
                style={[styles.socialButton, styles.spotifyButton]}
                onPress={() => handleSocialPress(artist.socialMedia.spotify, 'Spotify')}
              >
                <Text style={styles.socialIcon}>🎵</Text>
                <Text style={styles.socialText}>Spotify</Text>
              </TouchableOpacity>
            )}

            {artist.socialMedia?.instagram && (
              <TouchableOpacity 
                style={[styles.socialButton, styles.instagramButton]}
                onPress={() => handleSocialPress(artist.socialMedia.instagram!, 'Instagram')}
              >
                <Text style={styles.socialIcon}>📷</Text>
                <Text style={styles.socialText}>Instagram</Text>
              </TouchableOpacity>
            )}

            {artist.socialMedia?.twitter && (
              <TouchableOpacity 
                style={[styles.socialButton, styles.twitterButton]}
                onPress={() => handleSocialPress(artist.socialMedia.twitter!, 'Twitter')}
              >
                <Text style={styles.socialIcon}>🐦</Text>
                <Text style={styles.socialText}>Twitter</Text>
              </TouchableOpacity>
            )}

            {artist.socialMedia?.youtube && (
              <TouchableOpacity 
                style={[styles.socialButton, styles.youtubeButton]}
                onPress={() => handleSocialPress(artist.socialMedia.youtube!, 'YouTube')}
              >
                <Text style={styles.socialIcon}>📺</Text>
                <Text style={styles.socialText}>YouTube</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  artistImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  artistName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistGenre: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
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
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
  discographySection: {
    marginBottom: 25,
  },
  discographyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
  },
  discographyItem: {
    alignItems: 'center',
  },
  discographyNumber: {
    color: '#4ECDC4',
    fontSize: 24,
    fontWeight: 'bold',
  },
  discographyLabel: {
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
  highlightsSection: {
    marginBottom: 25,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  highlightIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  highlightText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  achievementsSection: {
    marginBottom: 25,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  achievementText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
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
  followButton: {
    backgroundColor: 'transparent',
    borderColor: '#ff6b6b',
  },
  followingButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
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
  followingButtonText: {
    color: '#fff',
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
