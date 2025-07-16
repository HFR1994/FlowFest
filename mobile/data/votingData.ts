export interface ArtistVote {
  artistName: string;
  vote: number; // -2 to +2
  timestamp: Date;
}

export interface UserVotingData {
  userId: string;
  votes: { [artistName: string]: ArtistVote };
  lastUpdated: Date;
}

// Mock user voting data - in a real app this would be stored in a database
export const mockUserVotes: UserVotingData = {
  userId: "user123",
  votes: {},
  lastUpdated: new Date()
};

export const voteLabels: { [key: number]: { label: string; emoji: string; color: string } } = {
  [-2]: { label: "Hate it", emoji: "😡", color: "#FF4444" },
  [-1]: { label: "Dislike", emoji: "👎", color: "#FF8888" },
  [0]: { label: "Neutral", emoji: "😐", color: "#CCCCCC" },
  [1]: { label: "Like it", emoji: "👍", color: "#88FF88" },
  [2]: { label: "Love it", emoji: "😍", color: "#44FF44" }
};

export const saveVote = (artistName: string, vote: number): void => {
  mockUserVotes.votes[artistName] = {
    artistName,
    vote,
    timestamp: new Date()
  };
  mockUserVotes.lastUpdated = new Date();
  // In a real app, this would save to AsyncStorage or send to a server
  console.log(`Vote saved: ${artistName} = ${vote}`);
};

export const getVote = (artistName: string): number | null => {
  const vote = mockUserVotes.votes[artistName];
  return vote !== undefined ? vote.vote : null;
};

export const getAllVotes = (): { [artistName: string]: ArtistVote } => {
  return mockUserVotes.votes;
};

export const getArtistPreferenceScore = (artistName: string): number => {
  const vote = getVote(artistName);
  return vote !== null ? vote : 0;
};

// Generate a preferred schedule based on user votes
export const generatePreferredSchedule = () => {
  const votes = getAllVotes();
  const artistScores = Object.entries(votes).map(([artistName, vote]) => ({
    artistName,
    score: vote.vote,
    timestamp: vote.timestamp
  }));
  
  // Sort by preference score (highest first)
  artistScores.sort((a, b) => b.score - a.score);
  
  return {
    preferredArtists: artistScores.filter(artist => artist.score > 0),
    neutralArtists: artistScores.filter(artist => artist.score === 0),
    avoidArtists: artistScores.filter(artist => artist.score < 0),
    totalVotes: artistScores.length,
    averageScore: artistScores.length > 0 
      ? artistScores.reduce((sum, artist) => sum + artist.score, 0) / artistScores.length 
      : 0
  };
};
