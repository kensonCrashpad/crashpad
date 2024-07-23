import React from "react";
import Nav from "../NavBar/SideNav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicTabs from "./CustomTabs";
import ShowAccomodation from "./ShowAccomodation";
import ShowUserProfile from "./ShowUserProfile";
import UserSettings from "../Dashboard/UserSettings";
import { useLocation } from 'react-router-dom';
import { Avatar, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  flexDirection: "column"
});

const ShowProfile: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  // Extract state or set defaults
  const {
    userName,
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    description,
    travelerImage,
    type,
    length,
    width,
    height,
    year,
    make,
    model,
    vehicleDescription
  } = state || {};

  // Check if the RV data exists
  const hasRVData = type || length || width || height || year || make || model || vehicleDescription;
  const hasUserData = userName || firstName || lastName || age || gender || email || phone || description;

  return (
    <>
      <UserSettings />
      <Nav />
      <Box sx={{ flexGrow: 1, m: 5, marginLeft: "8em" }}>
        <Grid container spacing={1}>
          <Grid item>
            <Sidebar elevation={3}>
              <Avatar 
                variant="square"
                src={travelerImage || undefined} 
                sx={{ width: 'auto', height: 'auto', mb: 2, borderRadius: 3 }}
              />
            </Sidebar>
          </Grid>
          <Grid item xs>
            <MainContent>
              <Grid container spacing={2}>
                {/* Render ShowUserProfile only if user data is available */}
                {hasUserData && (
                  <Grid item>
                    <ShowUserProfile 
                      userName={userName} 
                      firstName={firstName} 
                      lastName={lastName} 
                      age={age} 
                      gender={gender} 
                      email={email}
                      phone={phone} 
                      description={description}
                      userProfileData={{
                        userName,
                        firstName,
                        lastName,
                        age,
                        gender,
                        email,
                        phone,
                        description,
                        travelerImage
                      }} 
                    />
                  </Grid>
                )}
                {/* Render ShowAccomodation only if RV data is available */}
                {hasRVData && (
                  <Grid item>
                    <ShowAccomodation 
                      type={type} 
                      length={length} 
                      width={width} 
                      height={height} 
                      year={year} 
                      make={make} 
                      model={model} 
                      vehicleDescription={vehicleDescription} 
                      rvFormData={{type, length, width, height, year, make, model, vehicleDescription,travelerImage}} 
                    />
                  </Grid>
                )}
              </Grid>
            </MainContent>
          </Grid>
          <BasicTabs />
        </Grid>
      </Box>
    </>
  );
};

export default ShowProfile;
