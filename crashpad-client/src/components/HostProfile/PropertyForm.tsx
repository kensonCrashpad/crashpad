import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const AmenitiesList = () => {
  return (
    <Box>
      <ul>
        <li>Wi-Fi</li>
        <li>Fire pit</li>
        <li>Laundry facilities</li>
        <li>Pet-friendly</li>
      </ul>
    </Box>
  );
};

interface childProps {
  profileFormData: any;
  onClickEdit: () => void;
}

const ShowProperty: React.FC<childProps> = ({
  profileFormData,
  onClickEdit,
}) => {
  const [showUserProfileEdit, setShowUserProfileEdit] = useState(false);

  const profileSubmitData = () => {
    onClickEdit();
  };

  return (
    <>
      <Grid sx={{ mr: 2, ml: 2 }}>
        <h6
          style={{ marginTop: "10px", fontSize: "larger", fontWeight: "700" }}
        >
          Property Details
        </h6>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Location:{" "}
          </span>
          {profileFormData.location}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Address:{" "}
          </span>
          {profileFormData.address}{" "}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>City: </span>{" "}
          {profileFormData.city} {profileFormData.state} {profileFormData.zip}
        </p>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Nightly Rate:{" "}
          </span>{" "}
          ${profileFormData.hourlyrate}
        </p>
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          Amenities:{" "}
        </span>
        <AmenitiesList />
      </Grid>
    </>
  );
};

export default ShowProperty;
