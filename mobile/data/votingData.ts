export interface ArtistVote {
  artistName: string;
  vote: number; // -2 to +2
  timestamp: Date;
}

export interface SongVote {
  songId: string;
  songTitle: string;
  artistName: string;
  vote: number; // -2 to +2
  timestamp: Date;
}

export interface UserVotingData {
  userId: string;
  votes: { [artistName: string]: ArtistVote };
  songVotes: { [songId: string]: SongVote };
  lastUpdated: Date;
}

// Mock user voting data - in a real app this would be stored in a database
export const mockUserVotes: UserVotingData = {
  userId: "user123",
  votes: {},
  songVotes: {},
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

// Song voting functions
export const saveSongVote = (songId: string, songTitle: string, artistName: string, vote: number): void => {
  mockUserVotes.songVotes[songId] = {
    songId,
    songTitle,
    artistName,
    vote,
    timestamp: new Date()
  };
  mockUserVotes.lastUpdated = new Date();
  console.log(`Song vote saved: ${songTitle} by ${artistName} = ${vote}`);
};

export const getSongVote = (songId: string): number | null => {
  const vote = mockUserVotes.songVotes[songId];
  return vote !== undefined ? vote.vote : null;
};

export const getAllSongVotes = (): { [songId: string]: SongVote } => {
  return mockUserVotes.songVotes;
};

export const getSongsByArtistVotes = (artistName: string): SongVote[] => {
  return Object.values(mockUserVotes.songVotes).filter(vote => vote.artistName === artistName);
};

export const getSongPreferenceScore = (songId: string): number => {
  const vote = getSongVote(songId);
  return vote !== null ? vote : 0;
};

// Generate a preferred schedule based on user votes
export const generatePreferredSchedule = () => {
  const votes = getAllVotes();
  const songVotes = getAllSongVotes();
  
  const artistScores = Object.entries(votes).map(([artistName, vote]) => ({
    artistName,
    score: vote.vote,
    timestamp: vote.timestamp
  }));
  
  // Sort by preference score (highest first)
  artistScores.sort((a, b) => b.score - a.score);
  
  const songScores = Object.entries(songVotes).map(([songId, vote]) => ({
    songId,
    songTitle: vote.songTitle,
    artistName: vote.artistName,
    score: vote.vote,
    timestamp: vote.timestamp
  }));
  
  // Sort songs by preference score (highest first)
  songScores.sort((a, b) => b.score - a.score);
  
  return {
    preferredArtists: artistScores.filter(artist => artist.score > 0),
    neutralArtists: artistScores.filter(artist => artist.score === 0),
    avoidArtists: artistScores.filter(artist => artist.score < 0),
    totalVotes: artistScores.length,
    averageScore: artistScores.length > 0 
      ? artistScores.reduce((sum, artist) => sum + artist.score, 0) / artistScores.length 
      : 0,
    preferredSongs: songScores.filter(song => song.score > 0),
    neutralSongs: songScores.filter(song => song.score === 0),
    avoidSongs: songScores.filter(song => song.score < 0),
    totalSongVotes: songScores.length,
    averageSongScore: songScores.length > 0 
      ? songScores.reduce((sum, song) => sum + song.score, 0) / songScores.length 
      : 0
  };
};
