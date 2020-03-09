// import '../mockLocation'
import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import tracker from '../api/tracker'
import useLocation from "../hooks/useLocation"

const TrackCreateScreen = () => {

  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { addTrack, state: { locations } } = useContext(LocationContext)
  const [ err ] = useLocation(addTrack)

  const saveTrack = () => {
    setSaving(true)
    tracker.post('/track', {
      name, locations
    }).then(res => {
      if (res.data.message) {
        setMessage(res.data.message)
        setName('')
      }
    }).catch(e => {
      
    })
    setSaving(false)
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Map isCreate />
      {err ? <Text style={styles.error}>Please enable Location</Text> : null}
      <View style={styles.form_container}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Button
          title="Save"
          onPress={saveTrack}
          buttonStyle={{ marginTop: 10 }}
          loading={saving}
        />
        {message ? <Text style={{ color: '#49d350' }}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  error: {
    fontStyle: 'italic',
    color: '#EF1232'
  },
  form_container: {
    padding: 10,
    marginTop: 20
  }
})

export default withNavigationFocus(TrackCreateScreen)
