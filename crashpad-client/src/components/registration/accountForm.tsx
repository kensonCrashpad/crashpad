import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Typography, Link, Container } from "@mui/material";
import logoImage from "../../images/registration/CPlogo.png";
import loginBG from "../../images/registration/loginBG5.jpg";
import ForgotPassword from "./forgotPassword";
import GoogleLoginButton from "./googleLoginButton"; 
import "../../styles/AccountForm.css";


interface AccountFormProps {
  isLogin: boolean;
  onSubmit: (username: string, email: string, password: string, role: string) => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AccountForm: React.FC<AccountFormProps> = ({ isLogin, onSubmit, message, setMessage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTraveller, setIsTraveller] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!username) {
      tempErrors.username = "This field is required!";
    } else if (username.length < 4 || username.length > 20) {
      tempErrors.username = "The username must be between 4 and 20 characters.";
    }

    if (!isLogin) {
      if (!email) {
        tempErrors.email = "This field is required!";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "This is not a valid email.";
      }
    }

    if (!password) {
      tempErrors.password = "This field is required!";
    } else if (password.length < 6 || password.length > 20) {
      tempErrors.password = "The password must be between 6 and 20 characters.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    setMessage("");
    const role = isTraveller ? 'TRAVELER' : 'HOST';

    onSubmit(username, email, password, role);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setErrors((prevErrors) => {
      const { [field]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleTravellerChange = () => {
    setIsTraveller(!isTraveller);
    if (!isTraveller) {
      setIsHost(false); // Disable host if traveller is selected
    }
  };

  const handleHostChange = () => {
    setIsHost(!isHost);
    if (!isHost) {
      setIsTraveller(false); // Disable traveller if host is selected
    }
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  return (
    <div className="root-container" style={{ backgroundImage: `url(${loginBG})` }}>
      <Container className="account-form-container">
        <div className="account-box">
          <img src={logoImage} alt="Crashpad Logo" className="logo-image" />
          <TextField
            fullWidth
            margin="normal"
            id="username"
            label="User Name"
            variant="outlined"
            value={username}
            onChange={handleInputChange(setUsername, "username")}
            error={!!errors.username}
            helperText={errors.username}
          />
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              error={!!errors.email}
              helperText={errors.email}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            error={!!errors.password}
            helperText={errors.password}
          />
          {!isLogin && (
            <div className="account-type">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTraveller}
                    onChange={handleTravellerChange}
                    disabled={isHost} // Disable traveller if host is selected
                  />
                }
                label="Traveller"
              />
              <Typography variant="body1">Or</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isHost}
                    onChange={handleHostChange}
                    disabled={isTraveller} // Disable host if traveller is selected
                  />
                }
                label="Host"
              />
            </div>
          )}
          <Button className="account-button" fullWidth variant="contained" onClick={handleSubmit}>
            {isLogin ? "Login" : "Create account"}
          </Button>

          {message && (
            <div className="form-group">
              <div className={message.includes("Invalid") ? "alert alert-danger" : "alert alert-success"} role="alert">
                {message}
              </div>
            </div>
          )}
          {isLogin && (
            <Typography variant="body2" style={{ marginTop: "1em", textAlign: "center" }}>
              <Link onClick={handleForgotPasswordOpen} underline="none" style={{ cursor: "pointer" }}>
                Forgot Password?
              </Link>
            </Typography>
          )}
          <Typography variant="body2" style={{ marginTop: "1em", textAlign: "center" }}>
            {isLogin ? "New to Crashpad? " : "Existing user? "}
            <Link href={isLogin ? "/signup" : "/login"} underline="none">
              {isLogin ? "Create an account" : "Login"}
            </Link>
          </Typography>
          <div className = "google-button"><GoogleLoginButton /></div>
        </div>
      </Container>

      <ForgotPassword open={forgotPasswordOpen} onClose={handleForgotPasswordClose} />
    </div>
  );
};

export default AccountForm;
