import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class Roles {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getTraveler() {
    return axios.get(API_URL + 'traveler', { headers: authHeader() });
  }

  getHost() {
    return axios.get(API_URL + 'host', { headers: authHeader() });
  }
}

export default new Roles();