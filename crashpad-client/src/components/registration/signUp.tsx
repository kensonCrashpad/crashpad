import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "./accountForm";
import AuthService from "../../services/registration/authentication";

const SignUp: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (username: string, email: string, password: string, role: string) => {
    AuthService.register(username, email, password, role).then(
      (response) => {
        //setMessage(response.data.message);
        navigate("/dashboard");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <AccountForm
      isLogin={false}
      onSubmit={handleRegister}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default SignUp;
