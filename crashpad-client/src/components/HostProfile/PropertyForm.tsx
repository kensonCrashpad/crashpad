import React, { useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import img from "./Myprofile.png"
import styled from "@emotion/styled";




const nearBy = ["Sewage Dump Station","Walking Trail","Shuttle Services","RV Maintenance Services","Recreational Facilities"];

const NearByList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {nearBy.map((near, index) => (
          <Grid item xs={6} key={index}>
            <span>{near}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const allowed = ["Pets","Kids","Genarators","BBQ"];



const AllowedList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {allowed.map((allow, index) => (
          <Grid item xs={6} key={index}>
            <span>{allow}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const securityAndSafety = ["Exterior security cameras on property","24/7 Security","Good Lighting","First Aid Station"];

const SecurityAndSafetlyList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {securityAndSafety.map((safety, index) => (
          <Grid item xs={6} key={index}>
            <span>{safety}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

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

const amenities = properties?.amenities || [];;
const AmenitiesList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {amenities.map((amenity:string, index:number) => (
          <Grid item xs={6} key={index}>
            <span>{amenity}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
  const [showUserProfileEdit, setShowUserProfileEdit] = useState(false);

  const profileSubmitData = () => {
    onClickEdit();
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
        </Typography><br />
        <hr />
        <Typography variant="body1" fontWeight="700">
          What this place provides
        </Typography>
        <br />
        <AmenitiesList />
        <br />
        <Typography variant="body1" fontWeight="700">
          Allowed
        </Typography><br />
        <AllowedList/><br />
        <Typography variant="body1" fontWeight="700">
          Near By
        </Typography><br />
        <NearByList /><br />
        <Typography variant="body1" fontWeight="700">
          Security and Safety
        </Typography><br />
        <SecurityAndSafetlyList/><br />
        
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
