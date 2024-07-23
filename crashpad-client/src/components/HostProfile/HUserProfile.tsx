import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ProfileImg from '../../images/ProfileImg.png';
import { useNavigate } from 'react-router-dom';
import UserService from "../../services/user/user";
import PropertyService from "../../services/property/propertyService";
import HostForm from "./HostForm";
import ImageCarousel from './ImageCarousel';


const LoginButton = styled(Button)({
  marginTop: '1em',
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  }
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'left',
  marginTop: '2em',
  gap: '80px' 
});

const EditButton = styled(Button)({
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  },
  width: '150px',
  height: '50px'
});

const AddPropertyButton = styled(Button)({
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  },
  width: '150px',
  height: '50px'
});

const LoadMoreButton = styled(Button)({
  marginTop: '1em',
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  }
});

const UserProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2em',
  marginTop: '-50px' 
});

const ProfileImage = styled('img')({
  width: '250px', 
  height: '300px', 
  borderRadius: '25px',
  padding: '10px',
  objectFit: 'cover',
  marginTop: '-20px'
});

const CalendarIframe = styled('iframe')({
  border: 0,
  width: '150%',
  height: '350px',
  marginTop: '0px', 
  marginLeft: '-200px' 
});

const PropertyGrid = styled(Grid)({
  marginTop: '1em',
  paddingLeft: '2em',
  paddingRight: '2em'
});

const EditPropertyButton = styled(Button)({
  backgroundColor: '#FDA117', 
  width: '10%',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400' 
  },
  margin: '10px 0',  
});

interface UserFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: string;
  email: string;
  aboutMe: string;
  profileImage: string;
}

interface Property {
  propertyId: number;
  propertyType: string;
  title: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  capacity: number;
  padMaxLength: string;
  padMaxWidth: string;
  description: string;
  availability: string;
  originalPrice: string;
  discountedPrice: string;
  amenities: string[];
  imageUrls: string[];
  userCreationDate: string;
  userModifyDate: string;
}

const HUserProfile: React.FC = () => {
  const [profileFormData, setProfileFormData] = useState<UserFormState>({
    userName: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    location: '',
    email: '',
    aboutMe: "",
    profileImage: ""
  });

  const [errors, setErrors] = useState<any>();
  const [showUserProfile, setShowUserProfile] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const propertiesPerPage = 3;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
        if (userId) {
          const response = await UserService.getUserProfile(userId);
          const userData = response.data;
          setProfileFormData({
            userName: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            gender: userData.gender,
            location: userData.location,
            email: userData.email,
            aboutMe: userData.description,
            profileImage: userData.profileImage,
          });

          // const propertiesResponse = await PropertyService.getUserProperties(userId);
          // setUserProperties(propertiesResponse);
          // console.log("Get propertiesResponse properties - ", propertiesResponse)
          // setDisplayedProperties(propertiesResponse.slice(0, propertiesPerPage));

          const propertiesResponse = await PropertyService.getUserProperties(userId);
          const sortedProperties = propertiesResponse.sort((a: Property, b: Property) =>
            new Date(b.userCreationDate).getTime() - new Date(a.userCreationDate).getTime()
          );
          setUserProperties(sortedProperties);
          setDisplayedProperties(sortedProperties.slice(0, propertiesPerPage));

        }
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const loadMoreProperties = () => {
    const nextPage = page + 1;
    const newProperties = userProperties.slice(0, nextPage * propertiesPerPage);
    setDisplayedProperties(newProperties);
    setPage(nextPage);
  };

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
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const navigate = useNavigate();
  const handleShowProfile = () => {
    navigate('/host/edit', { state: profileFormData });
  };

  const handleAddProperty = () => {
    navigate('/createproperty');
  };
  const handleEditProperty = (propertyId: number) => {
    navigate('/host/editproperty', { state: { propertyId: propertyId } });
  };
  

  return (
    <>
      <UserProfileContainer>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4} lg={3}>
            <ProfileImage src={profileFormData.profileImage} alt="Profile" />
          </Grid>
          <Grid item xs={12} md={4} lg={6} style={{ textAlign: 'left' }}>
            {showUserProfile ? (
              <HostForm profileFormData={profileFormData} />
            ) : (
              <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
                <TextField
                  label="User Name"
                  name="userName"
                  value={profileFormData.userName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  value={profileFormData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={profileFormData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Age"
                  name="age"
                  value={profileFormData.age}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={profileFormData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  name="location"
                  value={profileFormData.location}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={profileFormData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="About Me"
                  name="aboutMe"
                  value={profileFormData.aboutMe}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <LoginButton
                  fullWidth
                  variant="contained"
                  onClick={profileSubmitData}
                >
                  Submit
                </LoginButton>
              </form>
            )}
            <ButtonContainer>
              <EditButton
                fullWidth
                variant="contained"
                onClick={handleShowProfile}
              >
                Edit Profile
              </EditButton>
              <AddPropertyButton
                fullWidth
                variant="contained"
                onClick={handleAddProperty}
              >
                Add Property
              </AddPropertyButton>
            </ButtonContainer>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <CalendarIframe
              src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIME_ZONE"
              title="Google Calendar"
            ></CalendarIframe>
          </Grid>
        </Grid>

        <PropertyGrid container spacing={2}>
          {displayedProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
              <Card
              sx={{
                maxWidth: 345,
                position: "relative",
                cursor: "pointer",
                margin: "0px",
                borderRadius: "15px"
              }}>

                <ImageCarousel images={property.imageUrls} />
                <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {property.title}
                  </Typography>
                  <EditPropertyButton
                    variant="contained"
                    onClick={() => handleEditProperty(property.propertyId)}
                  >
                    Edit
                  </EditPropertyButton>
                </Box>
                  <Typography variant="body2" color="text.secondary">
                    {property.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {property.city}, {property.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Capacity: {property.capacity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${property.discountedPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </PropertyGrid>
        
        {displayedProperties.length < userProperties.length && (
          <Grid container justifyContent="center">
            <LoadMoreButton onClick={loadMoreProperties}>
              Load More
            </LoadMoreButton>
          </Grid>
        )}
      </UserProfileContainer>
    </>
  );
}

export default HUserProfile;


