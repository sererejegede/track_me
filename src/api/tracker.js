import axios from 'axios';

export default axios.create({
  baseURL: 'https://limitless-shore-49927.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
