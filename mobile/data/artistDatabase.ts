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
  },
};
