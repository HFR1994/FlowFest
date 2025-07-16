import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import RSVPScreen from './screens/RSVPScreen';
import ArtistDetailScreen from './screens/ArtistDetailScreen';
import GenericArtistScreen from './screens/GenericArtistScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="RSVP" component={RSVPScreen} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
        <Stack.Screen name="GenericArtist" component={GenericArtistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
