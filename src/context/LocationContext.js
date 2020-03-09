import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import tracker from '../api/tracker'

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_track':
      return {
        ...state,
        currentLocation: action.payload.coords,
        locations: [...state.locations, action.payload]
      }
    case 'get_tracks':
      return { ...state, tracks: action.payload }
    case 'delete_track':
      return { ...state, tracks: state.tracks.filter(track => track._id !== action.payload)}
    case 'start_recording':
      return { ...state, recording: true }
    case 'stop_recording':
      return { ...state, recording: false }
    default:
      return state
  }
}

const addTrack = dispatch => track => {
  dispatch({ type: 'add_track', payload: track })
}

const getTracks = dispatch => async () => {
  let tracks
  try {
    tracks = await AsyncStorage.getItem('tracks')
    if (!tracks) {
      tracks = await tracker.get('track')
    }
  } catch (error) {
    tracks = await tracker.get('track').data
    await AsyncStorage.setItem('tracks', tracks)
  }
  dispatch({ type: 'get_tracks', payload: tracks.data.data })
}

const deleteTrack = dispatch => async (track_id) => {
  await tracker.delete(`/track/${track_id}`)
  dispatch({ type: 'delete_track', payload: track_id })
}

// const updateTrack = dispatch => 

const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' })
}
const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' })
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { addTrack, getTracks, deleteTrack, startRecording, stopRecording },
  { recording: false, currentLocation: null, locations: [] }
)
