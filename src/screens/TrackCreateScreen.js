// import '../mockLocation';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
  Accuracy
} from 'expo-location';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import tracker from '../api/tracker';

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
  const saveTrack = () => {
    tracker.post('/track', {})
  };

  const [err, setErr] = useState(null);
  const [name, setName] = useState('');
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
      <View style={styles.form_container}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Button title="Save" onPress={saveTrack} buttonStyle={{marginTop: 10}}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    fontStyle: 'italic',
    color: '#EF1232'
  },
  form_container: {
    padding: 10,
    marginTop: 20
  }
});

export default TrackCreateScreen;
