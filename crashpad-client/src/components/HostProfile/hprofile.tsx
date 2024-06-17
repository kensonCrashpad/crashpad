import React from "react";
import Nav from '../NavBar/SideNav';
import UserSettings from "../Dashboard/UserSettings";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HUserProfile from "./HUserProfile";
import BasicTabs from "./Tabs"

const hprofile: React.FC = () => {

    return (
        <>
          <UserSettings></UserSettings>
          <Nav></Nav>
          <Box sx={{ flexGrow: 1, m:6, paddingLeft:'5em'}} >
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <HUserProfile></HUserProfile>
                  </Grid>
                 
              </Grid>
            <BasicTabs></BasicTabs>
          </Box>
        </>
    );
}

export default hprofile;