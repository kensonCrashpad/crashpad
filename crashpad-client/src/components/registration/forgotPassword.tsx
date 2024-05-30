import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import AuthService from "../../services/registration/authentication";
import "../../styles/ForgotPasswordModal.css";

interface ForgotPasswordProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ open, onClose }) => {
  const [forgotUserName, setForgotUserName] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [step, setStep] = useState(1);

  const resetState = () => {
    setForgotUserName("");
    setOtp("");
    setNewPassword("");
    setRepeatPassword("");
    setForgotMessage("");
    setStep(1);
  };

  const handleForgotPasswordSubmit = () => {
    AuthService.verifyEmail(forgotUserName).then(
      (response) => {
        setForgotMessage("An OTP has been sent to your email.");
        setStep(2);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setForgotMessage(resMessage);
      }
    );
  };

  const handleVerifyOtp = () => {
    AuthService.verifyOtp(otp, forgotUserName).then(
      (response) => {
        setForgotMessage("Your email has been verified.");
        setStep(3);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setForgotMessage(resMessage);
      }
    );
  };

  const handleChangePassword = () => {
    
    if (newPassword !== repeatPassword) {
      setForgotMessage("Passwords do not match!");
      return;
    }
  
    AuthService.changePassword(newPassword, repeatPassword, forgotUserName).then(
      (response) => {
        setForgotMessage("Password has been changed!");
        setTimeout(() => {
          resetState();
          onClose(); 
        }, 2000); 
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setForgotMessage(resMessage);
      }
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-box">
        <Typography variant="h5" className="modal-title">
            Forgot your Password?
        </Typography>
        {step === 1 && (
          <>
            <p>Please enter your email address.</p>
            <p>We will email you an otp to reset your password. </p>
            <TextField
              fullWidth
              margin="normal"
              id="forgot-username"
              label="Email Address"
              variant="outlined"
              value={forgotUserName}
              onChange={(e) => setForgotUserName(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleForgotPasswordSubmit}
              className="modal-button"
            >
              Send OTP
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <p>Please check your registered email address for the otp. </p>
            <TextField
              fullWidth
              margin="normal"
              id="otp"
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOtp}
              className="modal-button"
            >
              Verify OTP
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <p>Please set a new password. </p>
            <TextField
              fullWidth
              margin="normal"
              id="new-password"
              label="New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="repeat-password"
              label="Repeat Password"
              type="password"
              variant="outlined"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleChangePassword}
              className="modal-button"
            >
              Change Password
            </Button>
          </>
        )}
        {forgotMessage && (
          <div className="form-group">
            <div
              className={forgotMessage.includes("An OTP has been sent to your email.") || forgotMessage.includes("Your email has been verified.") || forgotMessage.includes("Password has been changed") ? "alert alert-success" : "alert alert-danger"}
              role="alert"
            >
              {forgotMessage}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPassword;
