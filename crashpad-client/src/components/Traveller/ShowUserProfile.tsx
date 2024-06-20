import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Myprofile from "./Myprofile.png";
import { useNavigate } from "react-router-dom";
import { UserProfile } from './UserProfile';

const EditButton = styled(Button)({
  backgroundColor: "#FDA117",
  padding: "10px 20px",
  height: "30px",
  minWidth: "fit-content",
  marginTop: "1em",
});

interface UserFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  aboutMe: string;
}

interface ShowUserProfileProps {
  userProfile: UserProfile | null;
}
const ShowUserProfile: React.FC<ShowUserProfileProps> = ({ userProfile }) => {
  
  const [profileFormData, setProfileFormData] = useState<UserFormState>({
    userName: "Kenson",
    firstName: "Kenson",
    lastName: "Pribyl",
    age: 30,
    gender: "Male",
    aboutMe: "I love traveling different places!",
  });

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editprofile");
  };

  useEffect(() => {
    if (userProfile) {
      console.log("UserProfile details printed from SHOW USER PROFILE FILE: ", userProfile);
      setProfileFormData({
        userName: userProfile.username,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        age: userProfile.age,
        gender: userProfile.gender,
        aboutMe: userProfile.description || "I love traveling different places!",
      });
    }
  }, [userProfile]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>Traveller Details</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <img
          src={Myprofile}
          style={{ width: "100%", borderRadius: "20px", height: "230px" }}
          alt="Profile"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>User Name: </span>
          {profileFormData.userName}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Name: </span>
          {profileFormData.firstName} {profileFormData.lastName}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Gender: </span>
          {profileFormData.gender}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Age: </span>
          {profileFormData.age} years
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>About: </span>
          {profileFormData.aboutMe}
        </p>
        <EditButton variant="contained" onClick={handleEdit}>
          Edit
        </EditButton>
      </Grid>
    </Grid>
  );
};

export default ShowUserProfile;
