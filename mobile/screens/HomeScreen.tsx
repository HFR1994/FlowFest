import React from 'react';
import { View, StyleSheet } from 'react-native';
import FestivalInfo from '../components/festival-info/FestivalInfo';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FestivalInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
