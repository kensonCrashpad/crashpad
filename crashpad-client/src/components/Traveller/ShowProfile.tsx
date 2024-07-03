import React, { useEffect, useState } from "react";
import Nav from "../NavBar/SideNav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicTabs from "./CustomTabs";
import ShowAccomodation from "./ShowAccomodation";
import ShowUserProfile from "./ShowUserProfile";
import UserSettings from "../Dashboard/UserSettings";
import UserService from "../../services/user/user";
import { UserProfile } from "./UserProfile";
import { AccommodationInterface } from "./ShowAccomodation";

const Booking: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userAccomodation, setUserAccomodation] = useState<AccommodationInterface | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
        
        const profileResponse = await UserService.getUserProfile(userId);
        setUserProfile(profileResponse.data);

        const accommodationResponse = await UserService.getUserAccommodation(userId);
        setUserAccomodation(accommodationResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <UserSettings />
      <Nav />
      <Box sx={{ flexGrow: 1, m: 5, marginLeft: "8em" }}>
        <Grid container spacing={1} sx={{ height: "90vh", marginLeft: "15em"}}>
          <Grid item xs={12} md={6} sx={{ minWidth: "40%" }}>
            <ShowUserProfile userProfile={userProfile} />
            <ShowAccomodation userAccomodation={userAccomodation} />
          </Grid>
          {/* <Grid item xs={12} md={6} sx={{ minWidth: "40%" }}>
            
          </Grid> */}
        </Grid>
        <BasicTabs />
      </Box>
    </>
  );
};

export default Booking;