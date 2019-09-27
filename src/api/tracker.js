import axios from 'axios';

export default axios.create({
  baseURL: 'http://8142bcb4.ngrok.io',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
