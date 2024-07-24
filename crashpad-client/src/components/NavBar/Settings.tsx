import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function Settings() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setRole(user.role);
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (role === "HOST") {
      if (location.pathname !== "/hostprofile") {
        navigate("/hostprofile");
      }
    } else if (role === "TRAVELER") {
      if (location.pathname !== "/travelerprofile") {
        navigate("/travelerprofile");
      }
    }
  }, [role, location, navigate]);

  return (
    <div>
      
    </div>
  );
}

export default Settings;