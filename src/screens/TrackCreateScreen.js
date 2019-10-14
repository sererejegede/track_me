// import '../mockLocation';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import tracker from '../api/tracker';
import useLocation from "../hooks/useLocation";

const TrackCreateScreen = ({ isFocused }) => {


  const saveTrack = () => {
    tracker.post('/track', {
      name, locations
    })
  };

  const [name, setName] = useState('');
  const { addLocation, state: { locations } } = useContext(LocationContext);
  const [ err ] = useLocation(addLocation);

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

export default withNavigationFocus(TrackCreateScreen);
