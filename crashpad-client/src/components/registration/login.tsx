import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "./accountForm";
import AuthService from "../../services/registration/authentication";

const Login: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (username: string, email: string, password: string) => {
    AuthService.login(username, password).then(
      (response) => {
        //navigate("/dashboard");
        window.location.href = '/dashboard';
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 401) {
          setMessage("Invalid username or password. Please try again.");
        } else {
          setMessage(resMessage);
        }
      }
    );
  };

  return (
    <AccountForm
      isLogin={true}
      onSubmit={handleLogin}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default Login;
