import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ShowUserProfile from "./ShowUserProfile";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Nav from "../NavBar/SideNav";
import Myprofile from "./Myprofile.png";
import UserSettings from "../Dashboard/UserSettings";
import UserService from "../../services/user/user";
import { useLocation } from 'react-router-dom';



const LoginButton = styled(Button)({
  marginTop: "1em",
});

const SideBySide = styled("div")({
  display: "flex",
  gap: "5px",
});

interface UserFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  aboutMe: string;
  id:number;
}


interface UserProfile {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  aboutMe: string;
  id: number;
}



const UserProfile: React.FC = () => {
  const location = useLocation();
  const userData = location.state; 
  console.log("USER DATA : ",userData)
  
  const [profileFormData, setProfileFormData] = useState<UserFormState>({
    userName: userData.username || "username",
    firstName: userData.firstName || "first name",
    lastName: userData.lastName || "last name", 
    age: userData.age || 0,
    gender: userData.gender || "Male",
    aboutMe: userData.description || "Description" ,
    id: userData.id || 0 ,
  });

 
  
  
  const [errors, setErrors] = useState<any>();
  const [showUserProfile, setShowUserProfile] = useState(false);

  const validateForm = () => {
    let newErrors: any = {};

    if (!profileFormData.userName) {
      newErrors.userName = "Username is required.";
    }
    if (!profileFormData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!profileFormData.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!profileFormData.age) {
      newErrors.age = "Age is required.";
    }
    if (!profileFormData.gender) {
      newErrors.age = "Gender is required.";
    }
    if (!profileFormData.aboutMe) {
      newErrors.age = "About me is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const profileSubmitData = async (e: any) => {

    const id = localStorage.getItem("id");
    console.log("ID is", id);
    //GENERATE UPDATE USER DTO HERe
    const profileData = {
      firstName: profileFormData.firstName,
      lastName:profileFormData.lastName,
      gender:profileFormData.gender,
      age:profileFormData.age,
      description:profileFormData.aboutMe,
      userId:id,
    }
    console.log("ProfleData : ", profileData);
    
    e.preventDefault();
    setShowUserProfile(false);
    const isValid = validateForm();
    // const updatedProfileFormData = { ...profileFormData};
    if (isValid) {
      //console.log("Form validation", profileData);
      try {
       // const response = await UserService.updateUserProfile(profileData);
       // console.log("Profile updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      setShowUserProfile(true);
      console.log("Form validation failed");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  return (
    <>
      <UserSettings />
      <Nav />
      <Grid container spacing={2} marginTop={"1em"} marginLeft={"7em"}>
        <Grid xs={4}>
          <img
            src={Myprofile}
            style={{ width: "100%", borderRadius: "20px", height: "350px" }}
          />
        </Grid>
        <Grid sx={{ mr: 2, ml: 2 }}>
          <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
            <TextField
              fullWidth
              name="userName"
              value={profileFormData.userName}
              margin="normal"
              id="userName"
              label="Username"
              variant="outlined"
              onChange={handleChange}
              helperText={errors ? errors.userName : ""}
            />
            <SideBySide>
              <TextField
                fullWidth
                margin="normal"
                id="firstName"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={profileFormData.firstName}
                onChange={handleChange}
                helperText={errors ? errors.firstName : ""}
              />
              <TextField
                fullWidth
                margin="normal"
                id="lastName"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={profileFormData.lastName}
                onChange={handleChange}
                helperText={errors ? errors.lastName : ""}
              />
            </SideBySide>
            <SideBySide>
              <TextField
                fullWidth
                margin="normal"
                id="age"
                label="Age"
                variant="outlined"
                name="age"
                value={profileFormData.age}
                onChange={handleChange}
                helperText={errors ? errors.age : ""}
              />
              <FormControl fullWidth style={{ marginTop: "15px" }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="gender"
                  value={profileFormData.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </SideBySide>
            <TextField
              fullWidth
              placeholder="Tell me about yourself..."
              multiline
              margin="normal"
              id="aboutMe"
              label="About Me"
              variant="outlined"
              name="aboutMe"
              value={profileFormData.aboutMe}
              onChange={handleChange}
              rows={2}
              maxRows={4}
              helperText={errors ? errors.aboutMe : ""}
            />
            <LoginButton
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#FDA117" }}
              onClick={profileSubmitData}
            >
              Submit
            </LoginButton>
            <Typography
              variant="body2"
              style={{ marginTop: "1em" }}
            ></Typography>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
