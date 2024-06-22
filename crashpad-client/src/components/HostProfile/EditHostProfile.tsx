import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
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
  aboutMe: string;
  id: number;
}

const EditHostProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hostData = location.state as HostFormState;

  const [hostFormData, setHostFormData] = useState<HostFormState>({
    userName: hostData.userName || '',
    firstName: hostData.firstName || '',
    lastName: hostData.lastName || '',
    age: hostData.age || 0,
    gender: hostData.gender || '',
    aboutMe: hostData.aboutMe || '',
    id: hostData.id || 0,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setHostFormData({
      userName: hostData.userName || '',
      firstName: hostData.firstName || '',
      lastName: hostData.lastName || '',
      age: hostData.age || 0,
      gender: hostData.gender || '',
      aboutMe: hostData.aboutMe || '',
      id: hostData.id || 0,
    });
  }, [hostData]);

  const validateForm = () => {
    let newErrors: any = {};

    if (!hostFormData.userName) {
      newErrors.userName = "Username is required.";
    }
    if (!hostFormData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!hostFormData.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!hostFormData.age) {
      newErrors.age = "Age is required.";
    }
    if (!hostFormData.gender) {
      newErrors.gender = "Gender is required.";
    }
    if (!hostFormData.aboutMe) {
      newErrors.aboutMe = "About me is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    console.log("ID is", id);

    const updatedProfileData = {
      firstName: hostFormData.firstName,
      lastName: hostFormData.lastName,
      gender: hostFormData.gender,
      age: hostFormData.age,
      description: hostFormData.aboutMe,
      userId: id,
    };

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await UserService.updateUserProfile(updatedProfileData);
        console.log("Profile updated successfully:", response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setHostFormData({ ...hostFormData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setHostFormData({ ...hostFormData, gender: value });
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
            alt="Profile"
          />
        </Grid>
        <Grid sx={{ mr: 2, ml: 2 }}>
          <form noValidate autoComplete="off" onSubmit={handleProfileSubmit}>
            <TextField
              fullWidth
              name="userName"
              value={hostFormData.userName}
              margin="normal"
              id="userName"
              label="Username"
              variant="outlined"
              onChange={handleChange}
              helperText={errors.userName}
            />
            <SideBySide>
              <TextField
                fullWidth
                margin="normal"
                id="firstName"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={hostFormData.firstName}
                onChange={handleChange}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                margin="normal"
                id="lastName"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={hostFormData.lastName}
                onChange={handleChange}
                helperText={errors.lastName}
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
                type="number"
                value={hostFormData.age}
                onChange={handleChange}
                helperText={errors.age}
              />
              <FormControl fullWidth style={{ marginTop: "15px" }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={hostFormData.gender}
                  onChange={handleSelectChange}
                  label="Gender"
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
              value={hostFormData.aboutMe}
              onChange={handleChange}
              rows={2}
              maxRows={4}
              helperText={errors.aboutMe}
            />
            <LoginButton
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#FDA117", marginTop: "1em" }}
              type="submit"
            >
              Submit
            </LoginButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditHostProfile;