# Festival Companion App

A React Native mobile app built with Expo for festival-goers to explore events, artists, and manage their RSVP status.

## Features

- **Festival Information**: Browse festival details, lineup, and venue information
- **Artist Profiles**: View detailed artist information including bio, popularity stats, and social media links
- **Schedule Integration**: Click on artists in the schedule to view their details in the artists tab
- **RSVP Management**: Track your attendance status and follow favorite artists
- **News & Updates**: Stay informed with festival announcements and updates

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd festival-companion-expo
```

2. Install dependencies:
```bash
npm run install-mobile
```

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Use Expo Go app on your phone to scan the QR code, or run on simulator:
```bash
# For iOS simulator
npm run ios

# For Android emulator
npm run android

# For web browser
npm run web
```

## Project Structure

```
mobile/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── components/            # Reusable components
│   ├── RSVPArtistList.tsx # Artist list with detail view
│   └── ...
├── screens/               # App screens
│   ├── RSVPScreen.tsx     # RSVP management screen
│   ├── HomeScreen.tsx     # Home screen
│   └── ...
├── data/                  # Data and mock data
│   └── artistDatabase.ts  # Artist information database
└── assets/               # Images and static assets
```

## Key Implementation

The app features a seamless integration between the schedule and artist details:

- **Schedule → Artist Details**: Clicking on any artist in the schedule automatically switches to the artists tab and displays detailed information about that artist
- **Rich Artist Profiles**: Comprehensive artist information including biography, popularity metrics, social media links, and follow functionality
- **Smooth Navigation**: Users can easily navigate back to the full artist list using the "Back to Artists" button

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library for React Native

## Development

The app is structured as an Expo managed workflow, making it easy to develop and deploy across iOS and Android platforms.

To make changes:
1. Edit files in the `mobile/` directory
2. The Expo development server will automatically reload the app
3. Test on your device using Expo Go or simulators
