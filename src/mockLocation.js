import * as Location from 'expo-location';

const tenMetersWithDegree = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 10000,
    coords: {
      accuracy: 5,
      altitude: 5,
      heading: 0,
      altitudeAccuracy: 5,
      latitude: 6.7043735 - increment * tenMetersWithDegree,
      longitude: 3.3560526 - increment * tenMetersWithDegree,
      speed: 0
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
