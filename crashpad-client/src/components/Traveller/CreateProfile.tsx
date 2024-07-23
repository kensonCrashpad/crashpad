import React, { useState } from "react";
import { TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import Nav from "../NavBar/SideNav";

const LoginButton = styled(Button)({
  marginTop: "1em",
});

const FormContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1em",
  marginTop: "1em",
});

const StyledPaper = styled(Paper)({
  padding: "2em",
  margin: "1em",
  width: "80%",
});

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();

  const [travelerFormData, setTravelerFormData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    phone: '',
    aboutMe: '',
    travelerImage: null as File | null,
  });

  const [rvFormData, setRvFormData] = useState({
    type: '',
    length: '',
    width: '',
    height: '',
    year: '',
    make: '',
    model: '',
    vehicleDescription: '',
    rvImage: null as File | null,
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    let newErrors: any = {};

    // Traveler form validation
    if (!travelerFormData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!travelerFormData.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!travelerFormData.age) {
      newErrors.age = "Age is required.";
    }
    if (!travelerFormData.gender) {
      newErrors.gender = "Gender is required.";
    }
    if (!travelerFormData.phone) {
      newErrors.phone = "Phone number is required.";
    }
    if (!travelerFormData.aboutMe) {
      newErrors.aboutMe = "About me is required.";
    }

    // RV form validation
    // if (!rvFormData.type) {
    //   newErrors.type = "RV type is required.";
    // }
    // if (!rvFormData.length) {
    //   newErrors.length = "RV length is required.";
    // }
    // if (!rvFormData.width) {
    //   newErrors.width = "RV width is required.";
    // }
    // if (!rvFormData.height) {
    //   newErrors.height = "RV height is required.";
    // }
    // if (!rvFormData.year) {
    //   newErrors.year = "RV year is required.";
    // }
    // if (!rvFormData.make) {
    //   newErrors.make = "RV make is required.";
    // }
    // if (!rvFormData.model) {
    //   newErrors.model = "RV model is required.";
    // }
    // if (!rvFormData.vehicleDescription) {
    //   newErrors.vehicleDescription = "Vehicle description is required.";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const updatedProfileData = {
        ...travelerFormData,
        ...rvFormData,
      };
      console.log("Profile created successfully:", updatedProfileData);
      navigate('/showProfile', { state: updatedProfileData });
    } else {
      console.log("Form validation failed");
    }
  };

  const handleTravelerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTravelerFormData({ ...travelerFormData, [name]: value });
  };

  const handleRVChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRvFormData({ ...rvFormData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTravelerFormData({ ...travelerFormData, [name]: value });
  };

  const handleTravelerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTravelerFormData({ ...travelerFormData, travelerImage: e.target.files[0] });
    }
  };

  const handleRVImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRvFormData({ ...rvFormData, rvImage: e.target.files[0] });
    }
  };

  return (
    <>
      <Nav />
      <FormContainer>
        <StyledPaper elevation={3}>
          <Grid container spacing={2} >
            <Grid item xs={12} sx={{ mr: 2, ml: 2 }}>
              <Typography variant="h5" component="div" gutterBottom>
                Traveler Details
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleProfileSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      value={travelerFormData.firstName}
                      margin="normal"
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      onChange={handleTravelerChange}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      value={travelerFormData.lastName}
                      margin="normal"
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      onChange={handleTravelerChange}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="age"
                      label="Age"
                      variant="outlined"
                      name="age"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      value={travelerFormData.age}
                      onChange={handleTravelerChange}
                      helperText={errors.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={travelerFormData.gender}
                        onChange={handleSelectChange}
                        label="Gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="phone"
                      value={travelerFormData.phone}
                      margin="normal"
                      id="phone"
                      label="Phone"
                      variant="outlined"
                      onChange={handleTravelerChange}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Tell me about yourself..."
                      multiline
                      margin="normal"
                      id="aboutMe"
                      label="About Me"
                      variant="outlined"
                      name="aboutMe"
                      value={travelerFormData.aboutMe}
                      onChange={handleTravelerChange}
                      rows={2}
                      maxRows={4}
                      helperText={errors.aboutMe}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="traveler-image-upload"
                      type="file"
                      onChange={handleTravelerImageChange}
                    />
                    <label htmlFor="traveler-image-upload">
                      <Button variant="contained" color="primary" component="span" >
                        Upload Traveler Image
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Typography variant="h5" component="div" gutterBottom>
                  RV Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="type"
                      value={rvFormData.type}
                      margin="normal"
                      id="type"
                      label="Type"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.type}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="length"
                      value={rvFormData.length}
                      margin="normal"
                      id="length"
                      label="Length"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.length}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="width"
                      value={rvFormData.width}
                      margin="normal"
                      id="width"
                      label="Width"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.width}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="height"
                      value={rvFormData.height}
                      margin="normal"
                      id="height"
                      label="Height"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.height}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="year"
                      value={rvFormData.year}
                      margin="normal"
                      id="year"
                      label="Year"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.year}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="make"
                      value={rvFormData.make}
                      margin="normal"
                      id="make"
                      label="Make"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.make}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="model"
                      value={rvFormData.model}
                      margin="normal"
                      id="model"
                      label="Model"
                      variant="outlined"
                      onChange={handleRVChange}
                      helperText={errors.model}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Describe your vehicle..."
                      multiline
                      margin="normal"
                      id="vehicleDescription"
                      label="Vehicle Description"
                      variant="outlined"
                      name="vehicleDescription"
                      value={rvFormData.vehicleDescription}
                      onChange={handleRVChange}
                      rows={2}
                      maxRows={4}
                      helperText={errors.vehicleDescription}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="rv-image-upload"
                      type="file"
                      onChange={handleRVImageChange}
                    />
                    <label htmlFor="rv-image-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload RV Image
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    <LoginButton variant="contained" color="primary" type="submit" sx={{ width: '300px' }}>
                      Create Profile
                    </LoginButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </StyledPaper>
      </FormContainer>
    </>
  );
};

export default CreateProfile;