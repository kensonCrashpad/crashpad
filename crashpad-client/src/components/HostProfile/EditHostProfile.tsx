import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Nav from "../NavBar/SideNav";
import Myprofile from "./Myprofile.png";
import UserSettings from "../Dashboard/UserSettings";
import UserService from "../../services/user/user";
import { useLocation, useNavigate } from 'react-router-dom';

const LoginButton = styled(Button)({
  marginTop: "1em",
});

const SideBySide = styled("div")({
  display: "flex",
  gap: "5px",
});

interface HostFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: string;
  email: string;
  aboutMe: string;
  id: number;
}

const EditHostProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;
  console.log("User Data: ", userData);
  const [profileFormData, setProfileFormData] = useState<HostFormState>({
    userName: userData.userName || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    age: userData.age || 0,
    gender: userData.gender || "Male",
    location: userData.location || "",
    email: userData.email || "",
    aboutMe: userData.aboutMe || "",
    id: userData.id || 0,
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
      newErrors.gender = "Gender is required.";
    }
    if (!profileFormData.location) {
      newErrors.location = "Location is required.";
    }
    if (!profileFormData.email) {
      newErrors.email = "Email is required.";
    }
    if (!profileFormData.aboutMe) {
      newErrors.aboutMe = "About me is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const profileSubmitData = async (e: any) => {
    e.preventDefault();
    setShowUserProfile(false);
    const isValid = validateForm();
    const id = localStorage.getItem("id");
    console.log("ID is", id);
    const profileData = {
      firstName: profileFormData.firstName,
      lastName:profileFormData.lastName,
      gender:profileFormData.gender,
      age:profileFormData.age,
      description:profileFormData.aboutMe,
      userId:id,
    }
    if (isValid) {
      try {
        const response = await UserService.updateUserProfile(profileData);
        console.log("Profile updated successfully:", response.data);
        navigate('/host/profile');
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
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  return (
    <>
      <UserSettings />
      <Nav />
      <Grid container spacing={2} marginTop={"1em"} marginLeft={"7em"}>
        <Grid item xs={4}>
          <img
            src={Myprofile}
            style={{ width: "100%", borderRadius: "20px", height: "350px" }}
          />
        </Grid>
        <Grid item sx={{ mr: 2, ml: 2 }}>
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
              margin="normal"
              id="location"
              label="Location"
              variant="outlined"
              name="location"
              value={profileFormData.location}
              onChange={handleChange}
              helperText={errors ? errors.location : ""}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              name="email"
              value={profileFormData.email}
              onChange={handleChange}
              helperText={errors ? errors.email : ""}
            />
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

export default EditHostProfile;
