import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ShowUserProfile from "./ShowUserProfile";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FlashOffOutlined } from "@mui/icons-material";
// import ResponsiveAppBar from "../Navbar";
import Nav from "../NavBar/SideNav";
import Myprofile from "./Myprofile.png";
import UserSettings from "../Dashboard/UserSettings";

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
}

const UserProfile: React.FC = () => {
  const [profileFormData, setProfileFormData] = useState<UserFormState>({
    userName: "Kenson",
    firstName: "Kenson",
    lastName: "Pribyl",
    age: 30,
    gender: "Male",
    aboutMe: "I love traveling different places!",
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

  const profileSubmitData = (e: any) => {
    e.preventDefault();
    setShowUserProfile(false);

    const isValid = validateForm();

    if (isValid) {
      console.log("Form validation", profileFormData);
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
            // style={{ width: "100%", borderRadius: "20px" }}
            style={{ width: "100%", borderRadius: "20px", height: "350px" }}
          />
        </Grid>
        {
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
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
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
        }
      </Grid>
    </>
  );
};

export default UserProfile;
