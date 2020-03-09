import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator, Modal, View /* StyleSheet,  Button */} from 'react-native'
import { ListItem, Icon, Button, Text } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Loader from '../components/Loader'
import tracker from '../api/tracker'

const TrackListScreen = ({ navigation }) => {
  const { state, getTracks } = useContext(LocationContext)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const deleteTrack = async (track_id) => {
    await tracker.delete(`/track/${track_id}`)
  }
  
  useEffect(() => {
    getTracks()
    setLoading(false)
  }, [])

  if (loading) {
    return <Loader loading />
  }
  return (
    <ScrollView>
      <Modal>
        <View>
          <Icon
            name='warning'
            size={40}
          />
          <Text>Are you sure you want to delete</Text>
          <Button
            title='Yes'
          />
          <Button
            title='No'
          />
        </View>
      </Modal>
      {state.tracks ? state.tracks.map(track => (
        <ListItem
          key={track._id}
          title={track.name}
          onPress={() => navigation.navigate('TrackDetails', { track })}
          style={{ borderBottomColor: '#aeaeae', borderBottomWidth: 1 }}
          rightIcon={
            !deleting
              ?
              <Icon
                name='delete'
                onPress={() => deleteTrack(track._id)}
              />
              :
              <ActivityIndicator />
            
          }
        />
      )) : null}
    </ScrollView>
  )
}

// const styles = StyleSheet.create({})

export default TrackListScreen
