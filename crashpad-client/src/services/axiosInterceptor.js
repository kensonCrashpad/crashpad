import axios from 'axios';
import authHeader from '../services/user/auth-header';
import Authentication from './registration/authentication'; // Adjust the import path if necessary

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

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       Authentication.logout();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );