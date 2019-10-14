import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (callback) => {

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
      );
    } catch (err) {
      setErr(err);
      console.log(err);
    }
  };

  const [err, setErr] = useState(null);

  useEffect(() => {
    startWatching();
  }, []);

  return [err]
};
