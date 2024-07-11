import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const RESET_PASSWORD_URL = "http://localhost:8080/reset/password/";


class Authentication {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("id", JSON.stringify(response.data.id));
          
        }
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string, role: String) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      role
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        
      }
      console.log(response.data);
      // return response.data;
    });
  }

  verifyEmail(email: string)  {
    return axios.post(RESET_PASSWORD_URL + `verifyMail/${email}`);
  };
  
  verifyOtp(otp: string, email: string) {
    return axios.post(RESET_PASSWORD_URL + `verifyOtp/${otp}/${email}`);
  };
  
  changePassword(password: string, repeatPassword: string, email: string) {
    return axios.post(RESET_PASSWORD_URL + `changePassword/${email}`, {
      password,
      repeatPassword
    });
  };
  
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  loginWithGoogle(token: string) {
    return axios
      .post(API_URL + "googleLogin", {
        token
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new Authentication();