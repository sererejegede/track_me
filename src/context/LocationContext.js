import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_location':
      return { ...state, currentLocation: action.payload.coords, locations: [...state.locations, action.payload] };
    case 'start_recording':
      return { ...state, recording: true };
    case 'stop_recording':
      return { ...state, recording: false };
    default:
      return state;
  }
};

const addLocation = dispatch => location => {
  dispatch({ type: 'add_location', payload: location });
};

const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' });
};
const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { addLocation, startRecording, stopRecording },
  { recording: false, currentLocation: null, locations: [] }
);
