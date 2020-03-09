import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'
import Loader from './Loader'
import { getRegionForCoordinates } from '../utilities/utils'

const Map = ({ isCreate, locations: viewLocations }) => {
  const longitudeDelta = 0.01
  const latitudeDelta = 0.01
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext)

  const [ viewCurrentLocation, setViewCurrentLocation ] = useState(null)

  useEffect(() => {
    if (!isCreate) {
      setViewCurrentLocation(viewLocations[0].coords)
      // console.log('location map', getRegionForCoordinates(viewLocations.map(location => location.coords)))
    }
  })
  
  if (isCreate && !currentLocation || !isCreate && !viewCurrentLocation) {
    return <Loader loading />
  }

  const CreateTrack = () => {
    return isCreate ?
    <MapView
      initialRegion={{
        ...currentLocation,
        latitudeDelta,
        longitudeDelta
      }}
      region={{
        ...currentLocation,
        latitudeDelta,
        longitudeDelta
      }}
      style={styles.mapContainer}
    >
      <Circle
        center={currentLocation}
        radius={20}
        strokeColor="rgba(190, 10, 190, 1)"
        fillColor="rgba(190, 10, 190, 0.3)"
      />
      <Polyline coordinates={locations.map(location => location.coords)} />
    </MapView> : null
  }

  const ViewTrack = () => {
    return !isCreate ?
    <MapView
      initialRegion={{
        ...getRegionForCoordinates(viewLocations.map(location => location.coords))
      }}
      style={styles.mapContainer}
    >
      <Polyline coordinates={viewLocations.map(location => location.coords)} />
    </MapView> : null
  }

  return <View>{isCreate ? <CreateTrack /> : <ViewTrack/> }</View>
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 350,
    marginBottom: 10
  }
})

export default Map
