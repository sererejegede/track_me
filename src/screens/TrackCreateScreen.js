// import '../mockLocation';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
  Accuracy
} from 'expo-location';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
  // Request for location services permission
  const getPosition = async () => {
    const p = await getCurrentPositionAsync();
    // console.log(p);
  };
  useEffect(() => {
    getPosition();
    requestPermission();
  }, []);

  const [err, setErr] = useState(null);
  const { addLocation } = useContext(LocationContext);
  const requestPermission = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        location => {
          addLocation(location.coords);
        }
      );
    } catch (err) {
      setErr(err);
      console.log(err);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text>TrackCreateScreen</Text>
      <Map />
      {err ? <Text style={styles.error}>Please enable Location</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    fontStyle: 'italic',
    color: '#EF1232'
  }
});

export default TrackCreateScreen;
