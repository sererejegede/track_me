import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <View>
      <View>
        <MapView
          initialRegion={{
            latitude: 6.619095,
            longitude: 3.356168,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          style={styles.mapContainer}
        />
      </View>
      <Text>Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 350
  }
});

export default Map;
