import React from 'react';
import { Navigate } from 'react-router-dom';
import Authentication from './registration/authentication'; // Adjust the import path if necessary

const ProtectedRoute = ({ children }) => {
  const user = Authentication.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
