export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  spotifyUrl: string;
  previewUrl?: string;
}

export interface WeeklyPlaylist {
  weekNumber: number;
  weekTitle: string;
  description: string;
  tracks: PlaylistTrack[];
  totalDuration: string;
  coverImage: string;
}

export const weeklyPlaylists: WeeklyPlaylist[] = [
  {
    weekNumber: 1,
    weekTitle: "Electric Escapade",
    description: "Dive into the pulse of cutting-edge electronic sounds with synths, beats, and ambient textures.",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "1",
        title: "Digital Horizons",
        artist: "The Electric Waves",
        duration: "4:12",
        spotifyUrl: "https://open.spotify.com/artist/electricwaves"
      },
      {
        id: "2",
        title: "Neon Sky",
        artist: "Neon Dreams",
        duration: "3:58",
        spotifyUrl: "https://open.spotify.com/artist/neondreams"
      },
      {
        id: "3",
        title: "Crystal Vision",
        artist: "Crystal Echo",
        duration: "4:45",
        spotifyUrl: "https://open.spotify.com/artist/crystalecho"
      },
      {
        id: "4",
        title: "Desert Circuit",
        artist: "Electric Nomads",
        duration: "5:10",
        spotifyUrl: "https://open.spotify.com/artist/electricnomads"
      },
      {
        id: "5",
        title: "Bassquake",
        artist: "Bass Revolution",
        duration: "3:35",
        spotifyUrl: "https://open.spotify.com/artist/bassrevolution"
      }
    ],
    totalDuration: "21:40"
  },
  {
    weekNumber: 2,
    weekTitle: "Global Groove",
    description: "A celebration of world fusion, Latin beats, and the vibrant pulse of traditional music reimagined.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "6",
        title: "Fuego y Ritmo",
        artist: "Latin Fire",
        duration: "3:33",
        spotifyUrl: "https://open.spotify.com/artist/latinfire"
      },
      {
        id: "7",
        title: "Desert Mirage",
        artist: "Electric Nomads",
        duration: "4:25",
        spotifyUrl: "https://open.spotify.com/artist/electricnomads"
      },
      {
        id: "8",
        title: "Silk and Bass",
        artist: "Asian Fusion Band",
        duration: "5:02",
        spotifyUrl: "https://open.spotify.com/artist/asianfusion"
      },
      {
        id: "9",
        title: "Unity Drums",
        artist: "African Drums Collective",
        duration: "4:10",
        spotifyUrl: "https://open.spotify.com/artist/africandrums"
      },
      {
        id: "10",
        title: "Roots & Rhythms",
        artist: "Rhythm Collective",
        duration: "4:30",
        spotifyUrl: "https://open.spotify.com/artist/rhythmcollective"
      }
    ],
    totalDuration: "21:40"
  },
  {
    weekNumber: 3,
    weekTitle: "Night Pulse",
    description: "For the midnight wanderers — dark techno, deep vibes, and late-night energy.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "11",
        title: "Nocturnal Flow",
        artist: "Midnight Pulse",
        duration: "5:00",
        spotifyUrl: "https://open.spotify.com/artist/midnightpulse"
      },
      {
        id: "12",
        title: "Voltage Drive",
        artist: "The Electric Waves",
        duration: "4:15",
        spotifyUrl: "https://open.spotify.com/artist/electricwaves"
      },
      {
        id: "13",
        title: "Shadow Lights",
        artist: "Neon Dreams",
        duration: "4:45",
        spotifyUrl: "https://open.spotify.com/artist/neondreams"
      },
      {
        id: "14",
        title: "Pulse of the Void",
        artist: "Bass Revolution",
        duration: "4:20",
        spotifyUrl: "https://open.spotify.com/artist/bassrevolution"
      },
      {
        id: "15",
        title: "Echo Chamber",
        artist: "Crystal Echo",
        duration: "4:10",
        spotifyUrl: "https://open.spotify.com/artist/crystalecho"
      }
    ],
    totalDuration: "22:30"
  },
  {
    weekNumber: 4,
    weekTitle: "Retro Future",
    description: "Where analog nostalgia meets futuristic synths — retro-wave and vapor vibes collide.",
    coverImage: "https://images.unsplash.com/photo-1581349481581-594cb0de1b69?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "16",
        title: "Electric Memory",
        artist: "The Electric Waves",
        duration: "4:18",
        spotifyUrl: "https://open.spotify.com/artist/electricwaves"
      },
      {
        id: "17",
        title: "Dream Circuit",
        artist: "Neon Dreams",
        duration: "4:32",
        spotifyUrl: "https://open.spotify.com/artist/neondreams"
      },
      {
        id: "18",
        title: "Glass Pulse",
        artist: "Crystal Echo",
        duration: "4:07",
        spotifyUrl: "https://open.spotify.com/artist/crystalecho"
      },
      {
        id: "19",
        title: "Fade Into Light",
        artist: "Midnight Pulse",
        duration: "4:50",
        spotifyUrl: "https://open.spotify.com/artist/midnightpulse"
      },
      {
        id: "20",
        title: "Rising Neon",
        artist: "Neon Dreams",
        duration: "4:11",
        spotifyUrl: "https://open.spotify.com/artist/neondreams"
      }
    ],
    totalDuration: "21:58"
  },
  {
    weekNumber: 5,
    weekTitle: "Festival Fire",
    description: "High-energy anthems straight from the main stage — feel the crowd and ignite the dancefloor.",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "21",
        title: "Inferno Drop",
        artist: "Bass Revolution",
        duration: "3:55",
        spotifyUrl: "https://open.spotify.com/artist/bassrevolution"
      },
      {
        id: "22",
        title: "Mirage Lights",
        artist: "Electric Nomads",
        duration: "4:43",
        spotifyUrl: "https://open.spotify.com/artist/electricnomads"
      },
      {
        id: "23",
        title: "Synth Warrior",
        artist: "The Electric Waves",
        duration: "4:30",
        spotifyUrl: "https://open.spotify.com/artist/electricwaves"
      },
      {
        id: "24",
        title: "Midnight Heat",
        artist: "Midnight Pulse",
        duration: "4:00",
        spotifyUrl: "https://open.spotify.com/artist/midnightpulse"
      },
      {
        id: "25",
        title: "Drop the Beat",
        artist: "Bass Revolution",
        duration: "3:50",
        spotifyUrl: "https://open.spotify.com/artist/bassrevolution"
      }
    ],
    totalDuration: "21:00"
  },
  {
    weekNumber: 6,
    weekTitle: "Roots & Fusion",
    description: "Celebrate global sound — from tribal drums to electric sitars, it’s all about unity in rhythm.",
    coverImage: "https://images.unsplash.com/photo-1581993192009-10dc8d1a6f84?w=800&h=400&fit=crop",
    tracks: [
      {
        id: "26",
        title: "Tribal Echo",
        artist: "African Drums Collective",
        duration: "4:00",
        spotifyUrl: "https://open.spotify.com/artist/africandrums"
      },
      {
        id: "27",
        title: "Silken Road",
        artist: "Asian Fusion Band",
        duration: "5:25",
        spotifyUrl: "https://open.spotify.com/artist/asianfusion"
      },
      {
        id: "28",
        title: "Global Spirit",
        artist: "Rhythm Collective",
        duration: "4:15",
        spotifyUrl: "https://open.spotify.com/artist/rhythmcollective"
      },
      {
        id: "29",
        title: "Nomad’s Heartbeat",
        artist: "Electric Nomads",
        duration: "4:10",
        spotifyUrl: "https://open.spotify.com/artist/electricnomads"
      },
      {
        id: "30",
        title: "Carnaval",
        artist: "Latin Fire",
        duration: "3:44",
        spotifyUrl: "https://open.spotify.com/artist/latinfire"
      }
    ],
    totalDuration: "21:34"
  }
];

