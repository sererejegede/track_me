import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import tracker from '../api/tracker'

export default (callback) => {

  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
      );
    } catch (error) {
      setErr(error);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  useEffect(() => {
    startWatching();
  }, []);

  return [err]
};

export const deleteTrack = async (track_id) => {
  await tracker.delete(`/track/${track_id}`)
}
