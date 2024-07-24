import axios from 'axios';
import authHeader from '../services/user/auth-header';

axios.interceptors.request.use(
  config => {
    const token = authHeader().Authorization;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
