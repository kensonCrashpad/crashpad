import React from 'react';
import { Typography, Box, Avatar, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

interface ShowUserProfileProps {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  description: string;
  userProfileData: any; 
}

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const ShowUserProfile: React.FC<ShowUserProfileProps> = ({ userName, firstName, lastName, age, gender, email, phone, description, userProfileData }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/travelerprofile', { state: userProfileData });
  };

  return (
    <ProfileContainer>
      <ProfileDetails>
        <Typography variant="h5" component="div" gutterBottom sx={{ mt: 4 }}>
          Hey, {userName}! Check your details below
        </Typography>
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          {firstName && lastName && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>NAME :</strong> {firstName} {lastName}</Typography>
            </Grid>
          )}
          {age && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>AGE :</strong> {age}</Typography>
            </Grid>
          )}
          {gender && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>GENDER :</strong> {gender}</Typography>
            </Grid>
          )}
          {phone && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>MOBILE NUMBER :</strong> {phone}</Typography>
            </Grid>
          )}
          {email && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>EMAIL ID :</strong> {email}</Typography>
            </Grid>
          )}
          {description && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>About Me:</strong> {description}</Typography>
            </Grid>
          )}
        </Grid>
        <Button variant="contained" component="span" style={{ backgroundColor: "#FDA117" }} onClick={handleEditProfile} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default ShowUserProfile;
