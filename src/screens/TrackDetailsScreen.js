import React from 'react';
import { SafeAreaView } from 'react-navigation'
// import { View/* , StyleSheet */, Text } from 'react-native';
import Map from '../components/Map'

const TrackDetailsScreen = ({ navigation }) => {
  const track = navigation.getParam('track')
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Map
        showDot={false}
        locations={track.locations}
      />
    </SafeAreaView>

  );
};

// const styles = StyleSheet.create({});

export default TrackDetailsScreen;
