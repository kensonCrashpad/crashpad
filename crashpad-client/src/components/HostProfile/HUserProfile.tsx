

// import React, { useState, useEffect } from "react";
// import { TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import ProfileImg from '../../images/ProfileImg.png';
// import { useNavigate } from 'react-router-dom';
// import UserService from "../../services/user/user";
// import HostForm from "./HostForm";
// import PropertyService from "../../services/property/propertyService";

// const LoginButton = styled(Button)({
//   marginTop: '1em'
// });

// const AddPropertyButton = styled(Button)({
//   marginTop: '1em',
//   backgroundColor: '#FDA117',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#E59400'
//   }
// });

// const SideBySide = styled('div')({
//   display: 'flex',
//   gap: '5px',
// });

// interface UserFormState {
//   userName: string;
//   firstName: string;
//   lastName: string;
//   age: number;
//   gender: string;
//   location: string;
//   email: string;
//   aboutMe: string;
// }

// const HUserProfile: React.FC = () => {
//   const [profileFormData, setProfileFormData] = useState<UserFormState>({
//     userName: "",
//     firstName: "",
//     lastName: "",
//     age: 0,
//     gender: "",
//     location: '',
//     email: '',
//     aboutMe: ""
//   });

//   const [errors, setErrors] = useState<any>();
//   const [showUserProfile, setShowUserProfile] = useState(true);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         const userId = user.id;
//         if (userId) {
//           const response = await UserService.getUserProfile(userId);
//           const userData = response.data;
//           setProfileFormData({
//             userName: userData.username,
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             age: userData.age,
//             gender: userData.gender,
//             location: userData.location,
//             email: userData.email,
//             aboutMe: userData.description,
//           });
//         }

//          // Fetch user properties after fetching the profile
//          const userProperties = await PropertyService.getUserProperties(userId);
//          console.log("User Properties:", userProperties);
        
//       } catch (error) {
//         console.error('Error fetching profile', error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const validateForm = () => {
//     let newErrors: any = {};

//     if (!profileFormData.userName) {
//       newErrors.userName = "Username is required.";
//     }
//     if (!profileFormData.firstName) {
//       newErrors.firstName = "First Name is required.";
//     }
//     if (!profileFormData.lastName) {
//       newErrors.lastName = "Last Name is required.";
//     }
//     if (!profileFormData.age) {
//       newErrors.age = "Age is required.";
//     }
//     if (!profileFormData.gender) {
//       newErrors.gender = "Gender is required.";
//     }
//     if (!profileFormData.location) {
//       newErrors.location = "Location is required.";
//     }
//     if (!profileFormData.email) {
//       newErrors.email = "Email is required.";
//     }
//     if (!profileFormData.aboutMe) {
//       newErrors.aboutMe = "About me is required.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const profileSubmitData = (e: any) => {
//     e.preventDefault();
//     setShowUserProfile(false);

//     const isValid = validateForm();

//     if (isValid) {
//       console.log("Form validation", profileFormData);
//     } else {
//       setShowUserProfile(true);
//       console.log("Form validation failed");
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setProfileFormData({ ...profileFormData, [name]: value });
//   };

//   const navigate = useNavigate();
//   const handleShowProfile = () => {
//     navigate('/host/edit', { state: profileFormData });
//   };

//   const handleAddProperty = () => {
//     navigate('/createproperty');
//   };

//   return (
//     <>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ marginTop: '-100px' }}>
//           <img src={ProfileImg} style={{ width: "80%", height: "450px", borderRadius: "10%", padding: "20px" }} alt="Profile" />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ padding: '0 0px', marginTop: '-100px' }}>
//           {showUserProfile ? (
//             <HostForm profileFormData={profileFormData} onClickEdit={handleShowProfile} />
//           ) : (
//             <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
//               <TextField
//                 label="User Name"
//                 name="userName"
//                 value={profileFormData.userName}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="First Name"
//                 name="firstName"
//                 value={profileFormData.firstName}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Last Name"
//                 name="lastName"
//                 value={profileFormData.lastName}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Age"
//                 name="age"
//                 value={profileFormData.age}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={profileFormData.gender}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Male">Male</MenuItem>
//                   <MenuItem value="Female">Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Location"
//                 name="location"
//                 value={profileFormData.location}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={profileFormData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="About Me"
//                 name="aboutMe"
//                 value={profileFormData.aboutMe}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <LoginButton
//                 fullWidth
//                 variant="contained"
//                 style={{ backgroundColor: '#FDA117' }}
//                 onClick={profileSubmitData}
//               >
//                 Submit
//               </LoginButton>
//             </form>
//           )}
//           <AddPropertyButton
//             fullWidth
//             variant="contained"
//             onClick={handleAddProperty}
//           >
//             Add Property
//           </AddPropertyButton>
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
//           <iframe
//             src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIME_ZONE"
//             style={{ border: 0, width: '100%', height: '450px' }}
//             frameBorder="0"
//             scrolling="no"
//             title="Google Calendar"
//           ></iframe>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default HUserProfile;


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
  gap: '80px' // Add gap between buttons
});

const EditButton = styled(Button)({
  backgroundColor: '#FDA117',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E59400'
  },
  width: '100px',
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
  marginTop: '-50px' // Move content closer to the top
});

const ProfileImage = styled('img')({
  width: '250px', // Adjust size as needed
  height: '300px', // Adjust size as needed
  borderRadius: '50%',
  padding: '10px',
  objectFit: 'cover',
  marginTop: '-30px' // Move image closer to the top
});

const CalendarIframe = styled('iframe')({
  border: 0,
  width: '150%',
  height: '350px',
  marginTop: '0px', // Move calendar closer to the top
  marginLeft: '-200px' // Adjust position as needed
});

const PropertyGrid = styled(Grid)({
  marginTop: '1em',
  paddingLeft: '2em',
  paddingRight: '2em'
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
    aboutMe: ""
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
          });

          const propertiesResponse = await PropertyService.getUserProperties(userId);
          setUserProperties(propertiesResponse);
          setDisplayedProperties(propertiesResponse.slice(0, propertiesPerPage));
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

  return (
    <>
      <UserProfileContainer>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4} lg={3}>
            <ProfileImage src={ProfileImg} alt="Profile" />
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
                Edit
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
              <Card>
                {property.imageUrls && property.imageUrls.length > 0 && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080${property.imageUrls[0]}`} // Adjust the path to your image directory
                    alt={property.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.title}
                  </Typography>
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
