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
    weekTitle: "Electronic Vibes Week",
    description: "Start your festival journey with electronic beats and synthwave sounds",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    totalDuration: "2h 15m",
    tracks: [
      {
        id: "t1",
        title: "Neon Nights",
        artist: "The Electric Waves",
        duration: "4:32",
        spotifyUrl: "https://open.spotify.com/track/electricwaves1",
        previewUrl: "https://sample-audio.com/preview1.mp3"
      },
      {
        id: "t2",
        title: "Digital Dreams",
        artist: "Neon Dreams",
        duration: "5:18",
        spotifyUrl: "https://open.spotify.com/track/neondreams1",
        previewUrl: "https://sample-audio.com/preview2.mp3"
      },
      {
        id: "t3",
        title: "Crystal Frequencies",
        artist: "Crystal Echo",
        duration: "6:45",
        spotifyUrl: "https://open.spotify.com/track/crystalecho1",
        previewUrl: "https://sample-audio.com/preview3.mp3"
      },
      {
        id: "t4",
        title: "Solar Storm",
        artist: "Solar Flare",
        duration: "4:12",
        spotifyUrl: "https://open.spotify.com/track/solarflare1",
        previewUrl: "https://sample-audio.com/preview4.mp3"
      }
    ]
  },
  {
    weekNumber: 2,
    weekTitle: "World Fusion Week",
    description: "Explore global sounds and cultural rhythms from around the world",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    totalDuration: "2h 35m",
    tracks: [
      {
        id: "t5",
        title: "Rhythms of Ghana",
        artist: "African Drums Collective",
        duration: "5:23",
        spotifyUrl: "https://open.spotify.com/track/africandrums1",
        previewUrl: "https://sample-audio.com/preview5.mp3"
      },
      {
        id: "t6",
        title: "Fuego Latino",
        artist: "Latin Fire",
        duration: "3:45",
        spotifyUrl: "https://open.spotify.com/track/latinfire1",
        previewUrl: "https://sample-audio.com/preview6.mp3"
      },
      {
        id: "t7",
        title: "Eastern Winds",
        artist: "Asian Fusion Band",
        duration: "7:12",
        spotifyUrl: "https://open.spotify.com/track/asianfusion1",
        previewUrl: "https://sample-audio.com/preview7.mp3"
      },
      {
        id: "t8",
        title: "Caribbean Waves",
        artist: "Rhythm Collective",
        duration: "4:45",
        spotifyUrl: "https://open.spotify.com/track/rhythmcollective1",
        previewUrl: "https://sample-audio.com/preview8.mp3"
      },
      {
        id: "t9",
        title: "Desert Mirage",
        artist: "Electric Nomads",
        duration: "6:12",
        spotifyUrl: "https://open.spotify.com/track/electricnomads1",
        previewUrl: "https://sample-audio.com/preview9.mp3"
      }
    ]
  },
  {
    weekNumber: 3,
    weekTitle: "Rock & Electronic Week",
    description: "Get ready for high-energy performances with rock and electronic fusion",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
    totalDuration: "2h 18m",
    tracks: [
      {
        id: "t10",
        title: "Highway Dreams",
        artist: "Sunset Riders",
        duration: "4:15",
        spotifyUrl: "https://open.spotify.com/track/sunsetriders1",
        previewUrl: "https://sample-audio.com/preview10.mp3"
      },
      {
        id: "t11",
        title: "Bass Drop Revolution",
        artist: "Bass Revolution",
        duration: "3:45",
        spotifyUrl: "https://open.spotify.com/track/bassrevolution1",
        previewUrl: "https://sample-audio.com/preview11.mp3"
      },
      {
        id: "t12",
        title: "Dark Frequencies",
        artist: "Midnight Pulse",
        duration: "6:18",
        spotifyUrl: "https://open.spotify.com/track/midnightpulse1",
        previewUrl: "https://sample-audio.com/preview12.mp3"
      }
    ]
  },
  {
    weekNumber: 4,
    weekTitle: "Festival Finale Mix",
    description: "A curated mix featuring unique tracks from all artists for the ultimate festival experience",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    totalDuration: "3h 45m",
    tracks: [
      {
        id: "t13",
        title: "Voltage Rising",
        artist: "The Electric Waves",
        duration: "4:45",
        spotifyUrl: "https://open.spotify.com/track/electricwaves2",
        previewUrl: "https://sample-audio.com/preview13.mp3"
      },
      {
        id: "t14",
        title: "Passion Fire",
        artist: "Latin Fire",
        duration: "3:28",
        spotifyUrl: "https://open.spotify.com/track/latinfire2",
        previewUrl: "https://sample-audio.com/preview14.mp3"
      },
      {
        id: "t15",
        title: "Tribal Unity",
        artist: "African Drums Collective",
        duration: "6:15",
        spotifyUrl: "https://open.spotify.com/track/africandrums2",
        previewUrl: "https://sample-audio.com/preview15.mp3"
      },
      {
        id: "t16",
        title: "Harmony Bridge",
        artist: "Asian Fusion Band",
        duration: "5:47",
        spotifyUrl: "https://open.spotify.com/track/asianfusion2",
        previewUrl: "https://sample-audio.com/preview16.mp3"
      },
      {
        id: "t17",
        title: "Midnight Rider",
        artist: "Sunset Riders",
        duration: "4:33",
        spotifyUrl: "https://open.spotify.com/track/sunsetriders2",
        previewUrl: "https://sample-audio.com/preview17.mp3"
      },
      {
        id: "t18",
        title: "Cosmic Journey",
        artist: "Neon Dreams",
        duration: "7:22",
        spotifyUrl: "https://open.spotify.com/track/neondreams2",
        previewUrl: "https://sample-audio.com/preview18.mp3"
      },
      {
        id: "t19",
        title: "Ethereal Meditation",
        artist: "Crystal Echo",
        duration: "8:30",
        spotifyUrl: "https://open.spotify.com/track/crystalecho2",
        previewUrl: "https://sample-audio.com/preview19.mp3"
      },
      {
        id: "t20",
        title: "Electric Storm",
        artist: "Solar Flare",
        duration: "3:52",
        spotifyUrl: "https://open.spotify.com/track/solarflare2",
        previewUrl: "https://sample-audio.com/preview20.mp3"
      },
      {
        id: "t21",
        title: "Island Rhythms",
        artist: "Rhythm Collective",
        duration: "4:12",
        spotifyUrl: "https://open.spotify.com/track/rhythmcollective2",
        previewUrl: "https://sample-audio.com/preview21.mp3"
      },
      {
        id: "t22",
        title: "Nomadic Dreams",
        artist: "Electric Nomads",
        duration: "5:55",
        spotifyUrl: "https://open.spotify.com/track/electricnomads2",
        previewUrl: "https://sample-audio.com/preview22.mp3"
      },
      {
        id: "t23",
        title: "Bass Earthquake",
        artist: "Bass Revolution",
        duration: "4:38",
        spotifyUrl: "https://open.spotify.com/track/bassrevolution2",
        previewUrl: "https://sample-audio.com/preview23.mp3"
      },
      {
        id: "t24",
        title: "Midnight Shadows",
        artist: "Midnight Pulse",
        duration: "5:22",
        spotifyUrl: "https://open.spotify.com/track/midnightpulse2",
        previewUrl: "https://sample-audio.com/preview24.mp3"
      }
    ]
  }
];
