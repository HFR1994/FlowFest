import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessageProvider } from './contexts/MessageContext';
import HomeScreen from './screens/HomeScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import RSVPScreen from './screens/RSVPScreen';
import ArtistDetailScreen from './screens/ArtistDetailScreen';
import GenericArtistScreen from './screens/GenericArtistScreen';
import AutomaticSchedulingScreen from './screens/AutomaticSchedulingScreen';
import ArtistSongsScreen from './screens/ArtistSongsScreen';
import WeeklyPlaylistScreen from './screens/WeeklyPlaylistScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MessageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          <Stack.Screen name="RSVP" component={RSVPScreen} />
          <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
          <Stack.Screen name="GenericArtist" component={GenericArtistScreen} />
          <Stack.Screen name="AutomaticScheduling" component={AutomaticSchedulingScreen} />
          <Stack.Screen name="ArtistSongs" component={ArtistSongsScreen} />
          <Stack.Screen name="WeeklyPlaylist" component={WeeklyPlaylistScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MessageProvider>
  );
}
