export interface GenericArtistInfo {
  name: string;
  bio: string;
  genre: string;
  image: string;
  popularity: {
    score: number;
    monthlyListeners: number;
    followers: number;
  };
  discography: {
    albums: number;
    singles: number;
    collaborations: number;
  };
  achievements: string[];
  socialMedia: {
    spotify: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  careerHighlights: string[];
  yearsActive: string;
  origin: string;
  labels: string[];
  currentFestival: {
    eventDetails: {
      eventName: string;
      stage: string;
      time: string;
    };
    capacity: {
      current: number;
      max: number;
      crowdLevel: 'low' | 'mid' | 'high';
    };
  }[];
}

export const genericArtistDatabase: { [key: string]: GenericArtistInfo } = {
  'The Electric Waves': {
    name: 'The Electric Waves',
    bio: 'The Electric Waves emerged from the underground electronic scene in Berlin in 2018, quickly establishing themselves as pioneers of the neo-synthwave movement. Their unique approach combines vintage analog synthesizers with cutting-edge digital production techniques, creating soundscapes that feel both nostalgic and futuristic. The duo, consisting of Alex Voltage and Maya Frequency, met at a music technology conference and bonded over their shared love of 80s sci-fi soundtracks and modern electronic dance music.',
    genre: 'Electronic/Synthwave',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    popularity: {
      score: 78,
      monthlyListeners: 2400000,
      followers: 850000,
    },
    discography: {
      albums: 3,
      singles: 12,
      collaborations: 8,
    },
    achievements: [
      'Grammy nomination for Best Electronic Album (2023)',
      'Billboard Electronic Chart #1 for 6 consecutive weeks',
      'Over 100 million streams on Spotify',
      'Featured in Netflix series "Neon Dreams" soundtrack',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/electricwaves',
      instagram: 'https://instagram.com/electricwaves',
      twitter: 'https://twitter.com/electricwaves',
      youtube: 'https://youtube.com/electricwaves',
    },
    careerHighlights: [
      'Headlined Coachella 2023 Electronic Stage',
      'Sold out world tour across 40 cities',
      'Collaborated with legendary producer Giorgio Moroder',
      'Created soundtrack for major video game "Cyber City 2077"',
    ],
    yearsActive: '2018 - Present',
    origin: 'Berlin, Germany',
    labels: ['Neon Records', 'Electronic Arts Music'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Main Stage',
          time: '8:00 PM - 9:30 PM',
        },
        capacity: {
          current: 4000,
          max: 5000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Synth Dome',
          time: '10:00 PM - 11:30 PM',
        },
        capacity: {
          current: 3200,
          max: 3500,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Electro Stage',
          time: '7:00 PM - 8:30 PM',
        },
        capacity: {
          current: 2200,
          max: 3000,
          crowdLevel: 'mid',
        },
      },
    ]
  },
  'Sunset Riders': {
    name: 'Sunset Riders',
    bio: 'Sunset Riders brings the spirit of the American frontier to modern music, blending traditional country instrumentation with rock energy and folk storytelling. Founded by lead vocalist Jake "Dusty" Morrison and guitarist Sarah "Red" Thompson in Nashville, the band has become synonymous with authentic Americana music that speaks to both rural and urban audiences. Their music tells stories of love, loss, adventure, and the enduring spirit of the American West.',
    genre: 'Country Rock/Folk',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    popularity: {
      score: 85,
      monthlyListeners: 3200000,
      followers: 1200000,
    },
    discography: {
      albums: 5,
      singles: 18,
      collaborations: 12,
    },
    achievements: [
      'Country Music Association Award for Best New Artist (2020)',
      'Academy of Country Music Award for Song of the Year',
      'Platinum certification for album "Desert Dreams"',
      'Grand Ole Opry member since 2022',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/sunsetriders',
      instagram: 'https://instagram.com/sunsetriders',
      twitter: 'https://twitter.com/sunsetriders',
      youtube: 'https://youtube.com/sunsetriders',
    },
    careerHighlights: [
      'Performed at the Grand Ole Opry 25+ times',
      'Headlined Stagecoach Country Music Festival',
      'Featured in Ken Burns documentary "Country Music"',
      'Collaborated with Willie Nelson on "Highway Memories"',
    ],
    yearsActive: '2017 - Present',
    origin: 'Nashville, Tennessee, USA',
    labels: ['Big Machine Records', 'Country Roads Music'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Main Stage',
          time: '7:30 PM - 9:00 PM',
        },
        capacity: {
          current: 4500,
          max: 6000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Acoustic Stage',
          time: '3:00 PM - 4:00 PM',
        },
        capacity: {
          current: 1200,
          max: 2000,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Rock the Valley',
          stage: 'Valley Stage',
          time: '5:00 PM - 6:30 PM',
        },
        capacity: {
          current: 1100,
          max: 1800,
          crowdLevel: 'mid',
        },
      },
    ]
  },
  'Neon Dreams': {
    name: 'Neon Dreams',
    bio: 'Neon Dreams creates immersive electronic experiences that transport listeners to futuristic landscapes filled with wonder and possibility. The project, helmed by visionary producer Luna Starlight, combines ambient textures with danceable rhythms, creating music that works equally well in headphones and on massive festival sound systems. Known for spectacular live performances featuring custom LED installations and synchronized light shows.',
    genre: 'Electronic/Ambient',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    popularity: {
      score: 72,
      monthlyListeners: 1800000,
      followers: 650000,
    },
    discography: {
      albums: 4,
      singles: 15,
      collaborations: 6,
    },
    achievements: [
      'Electronic Music Awards Best Ambient Album (2022)',
      'Resident DJ at Ibiza\'s legendary Space nightclub',
      'Music featured in Apple iPhone commercial',
      'Remix for Radiohead reached #1 on Beatport',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/neondreams',
      instagram: 'https://instagram.com/neondreams',
      youtube: 'https://youtube.com/neondreams',
    },
    careerHighlights: [
      'Performed at Burning Man\'s main stage three consecutive years',
      'Created installation art for Museum of Modern Art',
      'Scored independent film "Electric Sheep"',
      'Headlined Ultra Music Festival Miami',
    ],
    yearsActive: '2019 - Present',
    origin: 'Los Angeles, California, USA',
    labels: ['Anjunadeep', 'Future Classic'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Synth Dome',
          time: '9:00 PM - 10:30 PM',
        },
        capacity: {
          current: 2700,
          max: 3200,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Main Stage',
          time: '8:00 PM - 9:30 PM',
        },
        capacity: {
          current: 3500,
          max: 4000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Pop Stage',
          time: '7:00 PM - 8:00 PM',
        },
        capacity: {
          current: 2400,
          max: 3000,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Aurora Soundscape',
          stage: 'Northern Lights Stage',
          time: '6:00 PM - 7:30 PM',
        },
        capacity: {
          current: 1100,
          max: 1600,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Rock the Valley',
          stage: 'Valley Stage',
          time: '5:00 PM - 6:30 PM',
        },
        capacity: {
          current: 1300,
          max: 2000,
          crowdLevel: 'mid',
        },
      },
    ],
  },
  'Crystal Echo': {
    name: 'Crystal Echo',
    bio: 'Crystal Echo specializes in ethereal soundscapes that blend electronic production with organic instrumentation, creating music that feels both ancient and futuristic. The project combines field recordings from natural environments with synthesized textures, often incorporating live instruments like hang drums, singing bowls, and various world percussion. Their music has been described as "meditation music for the digital age."',
    genre: 'Electronic/Ambient',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    popularity: {
      score: 68,
      monthlyListeners: 1200000,
      followers: 420000,
    },
    discography: {
      albums: 6,
      singles: 22,
      collaborations: 9,
    },
    achievements: [
      'New Age Music Award for Best Electronic Album',
      'Music used in Netflix meditation series "Mindful Moments"',
      'Collaborated with Tibetan monks on "Sacred Frequencies"',
      'Performed at the United Nations World Peace Day ceremony',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/crystalecho',
      instagram: 'https://instagram.com/crystalecho',
      youtube: 'https://youtube.com/crystalecho',
    },
    careerHighlights: [
      'Performed sound healing sessions at major wellness festivals',
      'Created music for NASA space meditation program',
      'Collaborated with renowned meditation teacher Deepak Chopra',
      'Music featured in luxury spa chains worldwide',
    ],
    yearsActive: '2016 - Present',
    origin: 'Sedona, Arizona, USA',
    labels: ['New Earth Records', 'Sounds True'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Wellness Stage',
          time: '11:00 AM - 12:30 PM',
        },
        capacity: {
          current: 600,
          max: 1000,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Meditation Dome',
          time: '6:00 PM - 7:00 PM',
        },
        capacity: {
          current: 300,
          max: 500,
          crowdLevel: 'low',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Chill Stage',
          time: '4:00 PM - 5:30 PM',
        },
        capacity: {
          current: 1200,
          max: 2000,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Rock the Valley',
          stage: 'Main Stage',
          time: '2:00 PM - 3:30 PM',
        },
        capacity: {
          current: 1400,
          max: 2500,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Jazz in the Dunes',
          stage: 'Sunset Stage',
          time: '6:00 PM - 7:30 PM',
        },
        capacity: {
          current: 700,
          max: 1200,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Aurora Soundscape',
          stage: 'Ambient Stage',
          time: '8:00 PM - 9:30 PM',
        },
        capacity: {
          current: 900,
          max: 1500,
          crowdLevel: 'mid',
        },
      },
    ]
  },
  'Solar Flare': {
    name: 'Solar Flare',
    bio: 'Solar Flare brings explosive energy to every performance with their fusion of electronic beats and live rock instrumentation. The band seamlessly blends EDM production techniques with traditional rock band setup, creating a sound that\'s both familiar and revolutionary. Their high-energy performances feature live drums, guitar, and bass synchronized with electronic elements, creating an experience that\'s part concert, part rave.',
    genre: 'Electronic/Rock',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    popularity: {
      score: 82,
      monthlyListeners: 2800000,
      followers: 950000,
    },
    discography: {
      albums: 4,
      singles: 16,
      collaborations: 11,
    },
    achievements: [
      'Rock/Electronic Crossover Artist of the Year (2023)',
      'Headlined Download Festival Electronic Stage',
      'Collaborated with Skrillex on "Electric Storm"',
      'Music featured in Fast & Furious movie soundtrack',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/solarflare',
      instagram: 'https://instagram.com/solarflare',
      twitter: 'https://twitter.com/solarflare',
      youtube: 'https://youtube.com/solarflare',
    },
    careerHighlights: [
      'Performed at both EDC and Rock am Ring in same year',
      'Created anthem for League of Legends World Championship',
      'Sold out Madison Square Garden in under 10 minutes',
      'Featured on cover of Rolling Stone Electronic Issue',
    ],
    yearsActive: '2019 - Present',
    origin: 'Austin, Texas, USA',
    labels: ['Atlantic Records', 'OWSLA'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Main Stage',
          time: '8:00 PM - 9:30 PM',
        },
        capacity: {
          current: 5200,
          max: 7000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Fusion Stage',
          time: '4:00 PM - 5:30 PM',
        },
        capacity: {
          current: 2800,
          max: 3500,
          crowdLevel: 'high',
        },
      },
    ]
  },
  'African Drums Collective': {
    name: 'African Drums Collective',
    bio: 'The African Drums Collective preserves and celebrates the rich rhythmic traditions of the African continent while incorporating contemporary elements that make the music accessible to global audiences. Founded by master drummer Kwame Asante, the collective features musicians from Ghana, Senegal, Mali, and South Africa, each bringing their unique cultural perspectives and traditional techniques to create a unified yet diverse sound.',
    genre: 'World Music/Traditional',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    popularity: {
      score: 75,
      monthlyListeners: 1600000,
      followers: 580000,
    },
    discography: {
      albums: 7,
      singles: 14,
      collaborations: 20,
    },
    achievements: [
      'World Music Grammy Award (2021)',
      'UNESCO Cultural Ambassador designation',
      'Performed for Nelson Mandela\'s 100th birthday celebration',
      'Featured in Disney\'s "The Lion King" Broadway production',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/africandrums',
      instagram: 'https://instagram.com/africandrums',
      youtube: 'https://youtube.com/africandrums',
    },
    careerHighlights: [
      'Performed at the opening ceremony of FIFA World Cup',
      'Collaborated with Paul Simon on "Graceland 35th Anniversary"',
      'Established music education programs in 12 African countries',
      'Performed at the Kennedy Center Honors',
    ],
    yearsActive: '2010 - Present',
    origin: 'Accra, Ghana',
    labels: ['World Circuit Records', 'Putumayo World Music'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'World Music Stage',
          time: '5:00 PM - 6:30 PM'
        },
        capacity: {
          current: 2200,
          max: 3000,
          crowdLevel: 'high'
        }
      },
      {
        eventDetails: {
          eventName: 'Jazz in the Dunes',
          stage: 'Cultural Stage',
          time: '1:00 PM - 2:00 PM'
        },
        capacity: {
          current: 1500,
          max: 2500,
          crowdLevel: 'mid'
        }
      }
    ],
  },
  'Latin Fire': {
    name: 'Latin Fire',
    bio: 'Latin Fire ignites stages worldwide with their passionate blend of traditional Latin rhythms and contemporary pop sensibilities. The band, led by charismatic vocalist Carlos "Fuego" Rodriguez and producer Maria "Ritmo" Santos, creates music that celebrates Latin culture while appealing to international audiences. Their infectious energy and authentic approach have made them ambassadors of Latin music across the globe.',
    genre: 'Latin/Pop',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    popularity: {
      score: 88,
      monthlyListeners: 4200000,
      followers: 1800000,
    },
    discography: {
      albums: 6,
      singles: 24,
      collaborations: 18,
    },
    achievements: [
      'Latin Grammy Award for Best Pop Album (2022)',
      'Billboard Latin Music Award for Artist of the Year',
      'Performed at the Latin American Music Awards',
      'Collaborated with Shakira on "Fuego y Pasión"',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/latinfire',
      instagram: 'https://instagram.com/latinfire',
      twitter: 'https://twitter.com/latinfire',
      youtube: 'https://youtube.com/latinfire',
    },
    careerHighlights: [
      'Headlined Coachella\'s Latin music showcase',
      'Performed at the Super Bowl halftime show',
      'Music featured in major telenovela soundtracks',
      'Sold out tour across Latin America and Spain',
    ],
    yearsActive: '2015 - Present',
    origin: 'Miami, Florida, USA / Medellín, Colombia',
    labels: ['Sony Music Latin', 'Universal Music Latino'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Main Stage',
          time: '9:00 PM - 10:30 PM',
        },
        capacity: {
          current: 6800,
          max: 8000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Latin Stage',
          time: '6:30 PM - 7:30 PM',
        },
        capacity: {
          current: 3200,
          max: 4000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Rock the Valley',
          stage: 'Rock Stage',
          time: '4:00 PM - 5:30 PM',
        },
        capacity: {
          current: 1300,
          max: 2100,
          crowdLevel: 'mid',
        },
      },
    ],
  },
  'Asian Fusion Band': {
    name: 'Asian Fusion Band',
    bio: 'Asian Fusion Band masterfully bridges the gap between ancient Eastern musical traditions and contemporary global sounds. The ensemble features traditional instruments like the erhu, koto, tabla, and gamelan alongside modern production techniques. Led by composer and multi-instrumentalist Yuki Tanaka, the band creates music that honors their diverse Asian heritage while speaking to universal human experiences.',
    genre: 'World Fusion',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    popularity: {
      score: 71,
      monthlyListeners: 1400000,
      followers: 520000,
    },
    discography: {
      albums: 5,
      singles: 19,
      collaborations: 14,
    },
    achievements: [
      'World Music Award for Best Fusion Album',
      'Performed at the Asian Games opening ceremony',
      'Music featured in Studio Ghibli documentary',
      'Collaborated with Yo-Yo Ma on "Silk Road Revisited"',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/asianfusion',
      instagram: 'https://instagram.com/asianfusion',
      youtube: 'https://youtube.com/asianfusion',
    },
    careerHighlights: [
      'Performed at the United Nations Cultural Diversity Day',
      'Created soundtrack for acclaimed film "East Meets West"',
      'Established cultural exchange program between Asian countries',
      'Performed at the Nobel Peace Prize ceremony',
    ],
    yearsActive: '2014 - Present',
    origin: 'Tokyo, Japan / Singapore',
    labels: ['Nonesuch Records', 'ECM Records'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'World Fusion Stage',
          time: '4:30 PM - 6:00 PM',
        },
        capacity: {
          current: 1800,
          max: 2500,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Cultural Stage',
          time: '12:00 PM - 1:30 PM',
        },
        capacity: {
          current: 900,
          max: 1500,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Electronic Stage',
          time: '3:00 PM - 4:30 PM',
        },
        capacity: {
          current: 1300,
          max: 2200,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Jazz in the Dunes',
          stage: 'Desert Courtyard',
          time: '5:00 PM - 6:30 PM',
        },
        capacity: {
          current: 650,
          max: 1100,
          crowdLevel: 'mid',
        },
      },
    ],
  },
  'Midnight Pulse': {
    name: 'Midnight Pulse',
    bio: 'Midnight Pulse creates dark, atmospheric electronic music that perfectly captures the energy of late-night dance floors. Their signature sound combines deep bass lines with ethereal melodies, creating an immersive experience that transports listeners to another dimension.',
    genre: 'Dark Electronic/Techno',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    popularity: {
      score: 73,
      monthlyListeners: 1900000,
      followers: 720000,
    },
    discography: {
      albums: 3,
      singles: 14,
      collaborations: 7,
    },
    achievements: [
      'Beatport #1 for Dark Techno category',
      'Performed at Berghain Berlin',
      'Remix for Deadmau5 reached top 10',
      'Featured in Netflix thriller series soundtrack',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/midnightpulse',
      instagram: 'https://instagram.com/midnightpulse',
      youtube: 'https://youtube.com/midnightpulse',
    },
    careerHighlights: [
      'Headlined Movement Detroit Electronic Music Festival',
      'Collaborated with Charlotte de Witte',
      'Created soundtrack for indie horror game',
      'Performed 50+ shows across Europe in 2023',
    ],
    yearsActive: '2020 - Present',
    origin: 'Amsterdam, Netherlands',
    labels: ['Drumcode', 'Afterlife'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Techno Stage',
          time: '11:00 PM - 12:30 AM',
        },
        capacity: {
          current: 2500,
          max: 3000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Underground Stage',
          time: '1:00 AM - 2:30 AM',
        },
        capacity: {
          current: 1200,
          max: 1800,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Night Stage',
          time: '10:00 PM - 11:30 PM',
        },
        capacity: {
          current: 1600,
          max: 2500,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Aurora Soundscape',
          stage: 'Northern Lights Stage',
          time: '9:00 PM - 10:30 PM',
        },
        capacity: {
          current: 700,
          max: 1200,
          crowdLevel: 'mid',
        },
      },
    ],
  },
  'Rhythm Collective': {
    name: 'Rhythm Collective',
    bio: 'Rhythm Collective brings together the best of Afro-Caribbean rhythms with modern production techniques. This dynamic group features musicians from Jamaica, Trinidad, and Ghana, creating a unique fusion that celebrates the African diaspora through music.',
    genre: 'Afro-Caribbean/World Beat',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    popularity: {
      score: 79,
      monthlyListeners: 2100000,
      followers: 890000,
    },
    discography: {
      albums: 4,
      singles: 16,
      collaborations: 15,
    },
    achievements: [
      'Caribbean Music Award for Best Fusion Album',
      'Performed at Bob Marley One Love Festival',
      'Collaborated with Damian Marley',
      'Music featured in Black Panther: Wakanda Forever',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/rhythmcollective',
      instagram: 'https://instagram.com/rhythmcollective',
      youtube: 'https://youtube.com/rhythmcollective',
    },
    careerHighlights: [
      'Performed at Reggae Sumfest Jamaica',
      'Toured with Steel Pulse',
      'Created anthem for Caribbean Games 2023',
      'Featured on BBC World Music showcase',
    ],
    yearsActive: '2016 - Present',
    origin: 'Kingston, Jamaica / Port of Spain, Trinidad',
    labels: ['VP Records', 'Greensleeves Records'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Reggae Stage',
          time: '7:00 PM - 8:30 PM'
        },
        capacity: {
          current: 3800,
          max: 5000,
          crowdLevel: 'high'
        }
      }
    ],
  },
  'Electric Nomads': {
    name: 'Electric Nomads',
    bio: 'Electric Nomads are pioneers of the "desert electronic" genre, blending traditional Middle Eastern instruments with cutting-edge electronic production. Their music tells stories of ancient trade routes and modern digital highways, creating a bridge between past and future.',
    genre: 'Desert Electronic/World Fusion',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    popularity: {
      score: 76,
      monthlyListeners: 1700000,
      followers: 630000,
    },
    discography: {
      albums: 5,
      singles: 13,
      collaborations: 9,
    },
    achievements: [
      'World Music Award for Innovation',
      'Performed at Burning Man main stage',
      'Soundtrack for BBC documentary "Silk Road"',
      'Collaborated with Nusrat Fateh Ali Khan Foundation',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/electricnomads',
      instagram: 'https://instagram.com/electricnomads',
      youtube: 'https://youtube.com/electricnomads',
    },
    careerHighlights: [
      'Performed at WOMAD Festival worldwide',
      'Created installation for Dubai Expo 2020',
      'Toured with Anoushka Shankar',
      'Featured in Coachella Do LaB stage',
    ],
    yearsActive: '2017 - Present',
    origin: 'Marrakech, Morocco / Berlin, Germany',
    labels: ['Real World Records', 'Ninja Tune'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'World Fusion Stage',
          time: '8:30 PM - 10:00 PM',
        },
        capacity: {
          current: 2800,
          max: 3500,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Electronic Stage',
          time: '5:30 PM - 6:30 PM',
        },
        capacity: {
          current: 1600,
          max: 2200,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Jazz in the Dunes',
          stage: 'Sahara Tent',
          time: '7:00 PM - 8:30 PM',
        },
        capacity: {
          current: 550,
          max: 900,
          crowdLevel: 'mid',
        },
      },
      {
        eventDetails: {
          eventName: 'Aurora Soundscape',
          stage: 'Northern Fusion Stage',
          time: '6:00 PM - 7:30 PM',
        },
        capacity: {
          current: 800,
          max: 1300,
          crowdLevel: 'mid',
        },
      },
    ]
  },
  'Bass Revolution': {
    name: 'Bass Revolution',
    bio: 'Bass Revolution pushes the boundaries of electronic music with earth-shaking bass lines and innovative sound design. This collective of producers and DJs from around the world creates music that physically moves audiences, combining dubstep, drum & bass, and experimental electronic elements.',
    genre: 'Bass Music/Dubstep',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    popularity: {
      score: 81,
      monthlyListeners: 2600000,
      followers: 1100000,
    },
    discography: {
      albums: 2,
      singles: 20,
      collaborations: 18,
    },
    achievements: [
      'EDM Award for Best Bass Music Act',
      'Headlined Lost Lands Festival',
      'Collaborated with Skrillex and Zomboy',
      'Over 500 million streams across platforms',
    ],
    socialMedia: {
      spotify: 'https://open.spotify.com/artist/bassrevolution',
      instagram: 'https://instagram.com/bassrevolution',
      twitter: 'https://twitter.com/bassrevolution',
      youtube: 'https://youtube.com/bassrevolution',
    },
    careerHighlights: [
      'Performed at EDC Las Vegas main stage',
      'Created anthem for Call of Duty game',
      'Sold out Red Rocks Amphitheatre',
      'Featured on Monstercat label compilation',
    ],
    yearsActive: '2019 - Present',
    origin: 'Los Angeles, California, USA / London, UK',
    labels: ['Never Say Die Records', 'Monstercat'],
    currentFestival: [
      {
        eventDetails: {
          eventName: 'Electric Vibes',
          stage: 'Bass Stage',
          time: '10:30 PM - 12:00 AM',
        },
        capacity: {
          current: 4200,
          max: 5500,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Sunshine Music Fest',
          stage: 'Electronic Stage',
          time: '8:00 PM - 9:00 PM',
        },
        capacity: {
          current: 3500,
          max: 4500,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Global Beats Festival',
          stage: 'Dance Hall',
          time: '9:00 PM - 10:30 PM',
        },
        capacity: {
          current: 2800,
          max: 4000,
          crowdLevel: 'high',
        },
      },
      {
        eventDetails: {
          eventName: 'Aurora Soundscape',
          stage: 'Experimental Bass Stage',
          time: '7:00 PM - 8:30 PM',
        },
        capacity: {
          current: 1100,
          max: 1700,
          crowdLevel: 'mid',
        },
      },
    ],
  },
};
