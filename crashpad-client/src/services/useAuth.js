import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './registration/authentication'; 

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = Authentication.getCurrentUser();
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;
