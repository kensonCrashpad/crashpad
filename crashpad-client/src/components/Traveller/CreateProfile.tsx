import React, { useState, useEffect } from "react";
import { Avatar, TextField, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Paper } from "@mui/material";
import UserService from "../../services/user/user";
import Box from "@mui/material/Box";
import { useLocation } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

interface UserFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  travelerImage: string;
}

const Sidebar = styled(Paper)({
  padding: "1em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "1em",
  width: "250px",
});

const MainContent = styled(Box)({
  flexGrow: 1,
});

const SaveChangeButton = styled(Button)({
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  },
  width: 'auto',
  height: '50px',
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

const UploadButton = styled(Button)({
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  },
  height: '54px',
  marginTop: '1em',
  marginLeft: '3em',
  position: 'relative',
  overflow: 'hidden',
});

const HiddenFileInput = styled('input')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

const CreateProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  
  const [travelerImage, setTravelerImage] = useState<string | null>(state?.travelerImage || null);

  const handleTravelerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setTravelerImage(reader.result as string); // Base64 string of the image
          setTravelerFormData(prevState => ({
            ...prevState,
            travelerImage: reader.result as string // Append base64 string to form data
          }));
          setRvFormData(prevState => ({
            ...prevState,
            travelerImage: reader.result as string // Append base64 string to form data
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initialTravelerFormData: UserFormState = {
    userName: state?.userName || "",
    firstName: state?.firstName || "",
    lastName: state?.lastName || "",
    age: state?.age || 0,
    gender: state?.gender || "",
    location: state?.location || "",
    email: state?.email || "",
    phone: state?.phone || "",
    description: state?.description || "",
    travelerImage: state?.travelerImage || ""
  };

  const initialRvFormData = {
    type: state?.type || '',
    length: state?.length || '',
    width: state?.width || '',
    height: state?.height || '',
    year: state?.year || '',
    make: state?.make || '',
    model: state?.model || '',
    vehicleDescription: state?.vehicleDescription || '',
    rvImage: state?.rvImage || [], 
    imagePreviews: state?.imagePreviews || [], 
    travelerImage: state?.travelerImage || ""
  };

  const [travelerFormData, setTravelerFormData] = useState<UserFormState>(initialTravelerFormData);
  const [rvFormData, setRvFormData] = useState(initialRvFormData);

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
    if (!travelerFormData.description) {
      newErrors.description = "About me is required.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
        const updatedProfileData = {
            ...travelerFormData,
            ...rvFormData
        };

        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.id;
            await UserService.saveTravelerAndRvDetails(userId, travelerFormData, rvFormData);
            console.log("Profile updated successfully:", updatedProfileData);
            navigate('/showProfile', { state: updatedProfileData });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    } else {
        console.log("Form validation failed");
    }
};

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
        if (userId) {
          const response = await UserService.getUserProfile(userId);
          const userData = response.data;
          setTravelerFormData({
            userName: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            gender: userData.gender,
            location: userData.location,
            email: userData.email,
            phone: userData.phone,
            description: userData.description,
            travelerImage: userData.travelerImage,
          });
        }
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleTravelerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTravelerFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRVChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRvFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTravelerFormData({ ...travelerFormData, [name]: value });
  };

  const handleRVImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const fileURLs = filesArray.map((file) => URL.createObjectURL(file));
      
      setRvFormData((prevState) => ({
        ...prevState,
        rvImage: [...prevState.rvImage, ...filesArray],
        imagePreviews: [...prevState.imagePreviews, ...fileURLs],
      }));
    }
  };

  return (
    <>
        <Box sx={{ marginLeft: "5em" }}>
          <Grid container spacing={1} sx={{ marginTop: "-40px" }}>
            <Grid item sx= {{ marginTop: "3rem" }} >
              <Sidebar elevation={3}>
                <Avatar 
                  variant="square"
                  src={travelerImage || undefined} 
                  sx={{ width: 'auto', height: 'auto', mb: 2, borderRadius: 3 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="traveler-image-upload"
                  type="file"
                  onChange={handleTravelerImageChange}
                />
                <label htmlFor="traveler-image-upload">
                  <Button variant="contained" component="span" style={{ backgroundColor: "#FDA117"}}>
                    Edit Image
                  </Button>
                </label>
              </Sidebar>
            </Grid>
            <Grid item xs>
              <MainContent>
                  <FormContainer>
                    <StyledPaper elevation={3}>
                      <Grid container spacing={2} >
                        <Grid item xs={12} sx={{ mr: 2, ml: 2 }}>
                          <Typography variant="h5" component="div" gutterBottom>
                            Traveler Details
                          </Typography>
                          <form noValidate autoComplete="off" onSubmit={handleProfileSubmit}>
                            <Typography variant="h5" color="primary">
                            Please fill your basic information, for a faster booking experience
                            </Typography>
                            <Grid item xs={4}>
                              <TextField
                                label="User Name"
                                name="userName"
                                value={travelerFormData.userName}
                                onChange={handleTravelerChange}
                                fullWidth
                                margin="normal"
                              />
                              </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="firstName"
                                  value={travelerFormData.firstName}
                                  onChange={handleTravelerChange}
                                  label="First Name"
                                  error={!!errors.firstName}
                                  helperText={errors.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="lastName"
                                  value={travelerFormData.lastName}
                                  onChange={handleTravelerChange}
                                  label="Last Name"
                                  error={!!errors.lastName}
                                  helperText={errors.lastName}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  type="number"
                                  name="age"
                                  value={travelerFormData.age}
                                  onChange={handleTravelerChange}
                                  label="Age"
                                  error={!!errors.age}
                                  helperText={errors.age}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.gender}>
                                  <InputLabel>Gender</InputLabel>
                                  <Select
                                    name="gender"
                                    value={travelerFormData.gender}
                                    onChange={handleSelectChange}
                                    label="Gender"
                                  >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                  </Select>
                                  {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="phone"
                                  value={travelerFormData.phone}
                                  onChange={handleTravelerChange}
                                  label="Phone"
                                  error={!!errors.phone}
                                  helperText={errors.phone}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="email"
                                  value={travelerFormData.email}
                                  onChange={handleTravelerChange}
                                  label="Email"
                                  error={!!errors.email}
                                  helperText={errors.email}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  name="description"
                                  value={travelerFormData.description}
                                  onChange={handleTravelerChange}
                                  label="About Me"
                                  multiline
                                  rows={4}
                                  error={!!errors.description}
                                  helperText={errors.description}
                                />
                              </Grid>
                            </Grid>
                            <SaveChangeButton variant="contained" type="submit">
                              Save My Changes
                            </SaveChangeButton>
                            <Typography variant="h5" component="div" gutterBottom sx={{ mt: 4 }}>
                              RV Details
                            </Typography>
                              <Grid item xs={12} sm={8} container alignItems="center">
                                <Grid item xs={8}>
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
                              </Grid>
                              <Grid container spacing={2}>
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
                                <Grid item xs={8}>
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
                                    rows={5}
                                    maxRows={4}
                                    helperText={errors.vehicleDescription}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                <UploadButton variant="contained">
                                    Upload RV Images
                                    <HiddenFileInput type="file" multiple onChange={handleRVImageChange} />
                                  </UploadButton>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1em' }}>
                                    {rvFormData.imagePreviews.map((preview: string, index: number) => (
                                      <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                      />
                                    ))}
                                  </Box>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="center" spacing={2}>
                              <Grid item>
                                <SaveChangeButton variant="contained" type="submit" >
                                  Save My Changes
                                </SaveChangeButton>
                              </Grid>
                            </Grid>
                          </form>
                        </Grid>
                      </Grid>
                    </StyledPaper>
                  </FormContainer>
              </MainContent>
            </Grid>
          </Grid>
        </Box>
    </>
  );
};

export default CreateProfile;
