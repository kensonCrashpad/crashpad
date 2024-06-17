import React from "react";
import Nav from "../NavBar/SideNav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicTabs from "./CustomTabs";
import ShowAccomodation from "./ShowAccomodation";
import ShowUserProfile from "./ShowUserProfile";
import { Link, useNavigate } from "react-router-dom";
import UserSettings from "../Dashboard/UserSettings";

const Booking: React.FC = () => {
  return (
    <>
      <UserSettings />
      <Nav />
      <Box sx={{ flexGrow: 1, m: 5, marginLeft: "8em" }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <ShowUserProfile />
          </Grid>
          <Grid item xs={6}>
            <ShowAccomodation />
          </Grid>
        </Grid>
        <BasicTabs />
      </Box>
    </>
  );
};

export default Booking;



