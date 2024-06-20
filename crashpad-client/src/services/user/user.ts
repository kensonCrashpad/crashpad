import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class User {
    
    getUserProfile(userId : number) {
        return axios.post(API_URL + 'profile/get', { userId }, { headers: authHeader() });
      }

  updateUserProfile(profileFormData: Record<string, any>) {
    return axios.post(API_URL + 'profile/update', profileFormData, { headers: authHeader() });
  }

  // Add more user-related methods as needed
}

export default new User();
