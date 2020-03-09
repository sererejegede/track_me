import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'https://limitless-shore-49927.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
);

export default instance;
