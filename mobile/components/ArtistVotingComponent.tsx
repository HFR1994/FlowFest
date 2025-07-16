import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { saveVote, getVote, voteLabels } from '../data/votingData';

interface ArtistVotingComponentProps {
  artistName: string;
  onVoteChange?: (artistName: string, vote: number) => void;
  compact?: boolean;
}

export default function ArtistVotingComponent({ 
  artistName, 
  onVoteChange, 
  compact = false 
}: ArtistVotingComponentProps) {
  const [currentVote, setCurrentVote] = useState<number | null>(null);
  const [animatedValue] = useState(new Animated.Value(1));

  useEffect(() => {
    // Load existing vote
    const existingVote = getVote(artistName);
    setCurrentVote(existingVote);
  }, [artistName]);

  const handleVote = (vote: number) => {
    // Animate button press
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Always save the vote, including neutral (0)
    setCurrentVote(vote);
    saveVote(artistName, vote);
    
    if (onVoteChange) {
      onVoteChange(artistName, vote);
    }
  };

  const renderVoteButton = (voteValue: number) => {
    const isSelected = currentVote === voteValue;
    const voteInfo = voteLabels[voteValue];
    
    return (
      <Animated.View
        key={voteValue}
        style={[
          { transform: [{ scale: animatedValue }] }
        ]}
      >
        <TouchableOpacity
          style={[
            compact ? styles.compactVoteButton : styles.voteButton,
            isSelected && { 
              backgroundColor: voteInfo.color,
              borderColor: voteInfo.color,
              borderWidth: 2
            }
          ]}
          onPress={() => handleVote(voteValue)}
          activeOpacity={0.7}
        >
          <Text style={[
            compact ? styles.compactVoteEmoji : styles.voteEmoji,
            isSelected && styles.selectedVoteEmoji
          ]}>
            {voteInfo.emoji}
          </Text>
          {!compact && (
            <Text style={[
              styles.voteLabel,
              isSelected && styles.selectedVoteLabel
            ]}>
              {voteInfo.label}
            </Text>
          )}
          {!compact && (
            <Text style={[
              styles.voteNumber,
              isSelected && styles.selectedVoteNumber
            ]}>
              {voteValue > 0 ? `+${voteValue}` : voteValue.toString()}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={compact ? styles.compactContainer : styles.container}>
      {!compact && (
        <Text style={styles.title}>How much do you like {artistName}?</Text>
      )}
      <View style={compact ? styles.compactVotingRow : styles.votingRow}>
        {[-2, -1, 0, 1, 2].map(renderVoteButton)}
      </View>
      {currentVote !== null && !compact && (
        <Text style={[styles.currentVoteText, { color: voteLabels[currentVote].color }]}>
          Your rating: {voteLabels[currentVote].label} ({currentVote > 0 ? '+' : ''}{currentVote})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  compactContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  votingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactVotingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  voteButton: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#333',
  },
  compactVoteButton: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
  voteEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  compactVoteEmoji: {
    fontSize: 18,
  },
  selectedVoteEmoji: {
    transform: [{ scale: 1.2 }],
  },
  voteLabel: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 3,
  },
  voteNumber: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedVoteLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedVoteNumber: {
    color: '#fff',
  },
  currentVoteText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
