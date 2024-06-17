import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import RVimage from "../../images/vehicle.jpg";
import { useNavigate } from "react-router-dom";

const EditButton = styled(Button)({
  backgroundColor: "#FDA117",
  padding: "10px 20px",
  height: "30px",
  minWidth: "fit-content",
  marginTop: "1em",
});

interface AccommodationInterface {
  type: string;
  length: number;
  width: number;
  height: number;
  year: number;
  model: string;
  make: string;
  aboutAcco: string;
}

const ShowAccommodation: React.FC = () => {
  const [accommodationFormData, setAccommodationFormData] = useState<AccommodationInterface>({
    type: "RV",
    length: 20,
    width: 10,
    height: 15,
    year: 2024,
    model: "Jayco",
    make: "Seneca",
    aboutAcco: "This is the best RV to travel!",
  });

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editaccommodation");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3>Accommodation Details</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <img
          src={RVimage}
          style={{ width: "100%", borderRadius: "20px", height: "250px" }}
          alt="Accommodation"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Type: </span>
          {accommodationFormData.type}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Length: </span>
            {accommodationFormData.length} ft
          </p>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Width: </span>
            {accommodationFormData.width} ft
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Height: </span>
            {accommodationFormData.height} ft
          </p>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Year: </span>
            {accommodationFormData.year}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Model: </span>
            {accommodationFormData.model}
          </p>
          <p>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Make: </span>
            {accommodationFormData.make}
          </p>
        </div>
        <p>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>About: </span>
          {accommodationFormData.aboutAcco}
        </p>
        <EditButton variant="contained" onClick={handleEdit}>
          Edit
        </EditButton>
      </Grid>
    </Grid>
  );
};

export default ShowAccommodation;
