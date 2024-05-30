import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/registration/authentication';

const clientId = 'Test_ID';

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    try {
      const token = response.credential;
      const user = await AuthService.loginWithGoogle(token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
