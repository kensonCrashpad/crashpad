import React, { useEffect, useState } from "react";
import Nav from "../NavBar/SideNav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicTabs from "./CustomTabs";
import UserSettings from "../Dashboard/UserSettings";
import UserService from "../../services/user/user"
import {UserProfile} from "./UserProfile";
import CreateProfile from "../Traveller/CreateProfile";

const Booking: React.FC = () => {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
        const response = await UserService.getUserProfile(userId);
        console.log("IN Booking Class : ", response)
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <UserSettings />
      <Nav />
      <Box sx={{ flexGrow: 1, m: 5, marginLeft: "8em" }}>
        <Grid container spacing={1}>
        <CreateProfile/>
        </Grid>
        <BasicTabs />
      </Box>
    </>
  );
};

export default Booking;



