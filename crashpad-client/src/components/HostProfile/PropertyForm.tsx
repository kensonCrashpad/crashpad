import React, { useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import img from "./Myprofile.png"
import styled from "@emotion/styled";
import WifiIcon from '@mui/icons-material/Wifi';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import OpacityIcon from '@mui/icons-material/Opacity';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PetsIcon from '@mui/icons-material/Pets';
import PowerIcon from '@mui/icons-material/Power';
import ShowerIcon from '@mui/icons-material/Shower';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

const CustomCard = styled(Card)({
  maxWidth: 450,
  height: "250px",
  borderRadius: "20px",
  padding:"20px"
});

interface childProps {
  properties: any
  profileFormData: any;
  onClickEdit: () => void;
}

const ShowProperty: React.FC<childProps> = ({properties,
  profileFormData,
  onClickEdit,
}) => {

const amenities = properties?.amenities || [];
const AmenitiesList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {amenities.map((amenity:string, index:number) => (
          <Grid item xs={6} key={index}>
            {(() => {
              switch (amenity) {
                case 'Wifi':
                  return <><WifiIcon /><span>{amenity}</span></>;
                case 'Shower':
                  return <><ShowerIcon /><span>{amenity}</span></>;
                case 'Fireplace':
                  return <><FireplaceIcon /><span>{amenity}</span></>;
                case 'Food':
                  return <><FastfoodIcon /><span>{amenity}</span></>;
                case 'Grill':
                  return <><OutdoorGrillIcon /><span>{amenity}</span></>;
                case 'Laundry':
                  return <><LocalLaundryServiceIcon /><span>{amenity}</span></>;
                case 'Electricity':
                  return <><ElectricalServicesIcon /><span>{amenity}</span></>;
                case 'WaterHooks':
                  return <><WaterDropOutlinedIcon /><span>{amenity}</span></>;
                case 'Picknic Table':
                  return <><TableRestaurantIcon /><span>{amenity}</span></>;
                case 'Propane Gas':
                  return <><LocalGasStationIcon /><span>{amenity}</span></>;
                case 'Pets':
                  return <><PetsIcon /><span>{amenity}</span></>;
                case 'Generator':
                  return <><PowerIcon /><span>{amenity}</span></>;
                default:
                  return <span>{amenity}</span>;
              }
            })()}

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


  return (
    <>
      <Grid textAlign={"left"}>
        <Typography variant="h4" fontWeight="700" textAlign={"left"}>
          {properties.title}
        </Typography>
        <Typography variant="body1">
          {properties.street}, {properties.city}, {properties.state}, {properties.zip}
        </Typography>
        <Typography variant="body1">
          <GradeIcon style={{ marginTop: "5px" }} /> <span>4.79</span> <span style={{ textDecoration: "underline" }}><a>  #20 reviews</a></span>
        </Typography><br />
        <hr />
        <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
          <img src={img} alt="Profile" style={{ height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px" }} />
          <Box>
            <Typography variant="body1" fontWeight="700">Hosted by {properties?.hostDetails?.username}</Typography>
            <Typography variant="body2" color="textSecondary">2 years hosting</Typography>
          </Box>
        </Typography>
        <br />
        
        <Typography variant="body1" marginTop={"10px"}>
          <span style={{ fontWeight: "700" }}>About Property  <hr /></span> {properties.description}
          <p>This is a {properties.propertyType} type property with a capacity of {properties.capacity}.The maximum length is {properties.padMaxLength} ft. and the maximum width is {properties.padMaxWidth} ft.</p>
        </Typography><br />
        
        <Typography variant="body1" fontWeight="700">
          What this place provides
          <hr />
        </Typography>
        <br />
        <AmenitiesList />
        <br />
        <Typography variant="body1" fontWeight="700" style={{marginTop:"20px"}}>
          Host Details
        </Typography><hr />
        <CustomCard>
        <Typography variant="body1" style={{ display: "flex"}}>
          <img src={img} alt="Profile" style={{ height: "250px", width: "250px", borderRadius: "10px", marginRight: "10px" }} />
          <Box style ={{ margin: "auto", }}>
            <Typography variant="body1" fontWeight="700">Verified Host</Typography><br />
            <Typography variant="body2" color="textSecondary">{properties?.hostDetails?.username}</Typography><br />
            <Typography variant="body2" color="textSecondary">Hosting since 2 years</Typography><br />
            <Typography variant="body2" color="textSecondary">See rating of {properties?.hostDetails?.username}</Typography><br />
            <Typography variant="body2" color="textSecondary">View Reviews</Typography>
          </Box>
        </Typography>
        </CustomCard>
      </Grid>
    </>
  );
};

export default ShowProperty;
