import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import HiddenEscape from "../../images/rvpark1.jpg";
import Lot5 from "../../images/Lot6.jpg";
import Lot6 from "../../images/pimg.jpg";
import Lot7 from "../../images/pi.jpg";
import Lot8 from "../../images/pimage.jpg";
import Lot9 from "../../images/pif.jpg";
import Grid from "@mui/material/Grid";
import PropertyForm from "../HostProfile/PropertyForm";
// import Calendar from "../HostProfile/Calendar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import SideNav from "../NavBar/SideNav";
import ReservationCard from "./ReservationCard";
import UserSettings from "./UserSettings";

const SideBySide = styled("div")({
  display: "flex",
  gap: "5px",
});

interface UserFormState {
  location: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  about: string;
  hourlyrate: number;
}

const PropertyReseravtion: React.FC = () => {
  const [propertyFormData, setPropertyFormData] = useState<UserFormState>({
    location: "Teton Frontier Park",
    address: "123 Main St",
    city: "Cityville",
    state: "WY",
    zip: 43901,
    about: "wifi",
    hourlyrate: 45,
  });

  const [errors, setErrors] = useState<any>();
  const [ShowProperty, setShowProperty] = useState(true);

  const validateForm = () => {
    let newErrors: any = {};

    if (!propertyFormData.location) {
      newErrors.userName = "Location is required.";
    }
    if (!propertyFormData.address) {
      newErrors.firstName = "Address is required.";
    }
    if (!propertyFormData.city) {
      newErrors.lastName = "City is required.";
    }
    if (!propertyFormData.state) {
      newErrors.age = "State is required.";
    }
    if (!propertyFormData.zip) {
      newErrors.gender = "Zip Code is required.";
    }
    if (!propertyFormData.about) {
      newErrors.location = "Decription is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const propertySubmitData = (e: any) => {
    e.preventDefault();
    setShowProperty(false);

    const isValid = validateForm();

    if (isValid) {
      console.log("Form validation", propertyFormData);
    } else {
      setShowProperty(true);
      console.log("Form validation failed");
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);

    setPropertyFormData({ ...propertyFormData, [name]: value });
  };

  const handleShowProperty = () => {
    setShowProperty(true);
  };

  const events = [
    {
      title: "Jane Reservation",
      start: new Date(2024, 3, 14),
      end: new Date(2024, 3, 20),
    },
  ];

  const navigateToHprofile = () => {
    window.location.href = "/hprofile";
  };

  return (
    <>
      <UserSettings />
      <SideNav />
      <Box sx={{ flexGrow: 1, m: 4, paddingLeft: "6em" }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img
              src={HiddenEscape}
              style={{ width: "120%", borderRadius: "20px", height: "400px" }}
            />
          </Grid>
          {ShowProperty ? (
            <Box sx={{ flexGrow: 1, m: 4, paddingLeft: "6em" }}>
              <PropertyForm
                profileFormData={propertyFormData}
                onClickEdit={handleShowProperty}
              />
            </Box>
          ) : (
            <Grid sx={{ mr: 2, ml: 2 }}>
              <form noValidate autoComplete="off" onSubmit={propertySubmitData}>
                <TextField
                  fullWidth
                  name="location"
                  value={propertyFormData.location}
                  margin="normal"
                  id="location"
                  label="Location"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors ? errors.location : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="address"
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={propertyFormData.address}
                  onChange={handleChange}
                  helperText={errors ? errors.address : ""}
                />
                <SideBySide>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="city"
                    label="City"
                    variant="outlined"
                    name="city"
                    value={propertyFormData.city}
                    onChange={handleChange}
                    helperText={errors ? errors.city : ""}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="state"
                    label="State"
                    variant="outlined"
                    name="state"
                    value={propertyFormData.state}
                    onChange={handleChange}
                    helperText={errors ? errors.state : ""}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="zip"
                    label="Zip Code"
                    variant="outlined"
                    name="zip"
                    value={propertyFormData.zip}
                    onChange={handleChange}
                    helperText={errors ? errors.zip : ""}
                  />
                </SideBySide>
              </form>
            </Grid>
          )}
          <ReservationCard />
        </Grid>
      </Box>

      <div
        style={{
          display: "flex",
          gap: "40px",
          paddingLeft: "110px",
        }}
      >
        <Link to="../Crash">
          {" "}
          {/* Link to the desired component */}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 220, width: 250 }}
              image={Lot5}
              title="green iguana"
            />
          </Card>
        </Link>
        <Link to="../property2">
          {" "}
          {/* Link to the desired component */}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 220, width: 250 }}
              image={Lot6}
              title="green iguana"
            />
          </Card>
        </Link>
        <Link to="../property2">
          {" "}
          {/* Link to the desired component */}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 220, width: 250 }}
              image={Lot7}
              title="green iguana"
            />
          </Card>
        </Link>
        <Link to="../property2">
          {" "}
          {/* Link to the desired component */}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 220, width: 250 }}
              image={Lot8}
              title="green iguana"
            />
          </Card>
        </Link>
        <Link to="../property2">
          {" "}
          {/* Link to the desired component */}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 220, width: 250 }}
              image={Lot9}
              title="green iguana"
            />
          </Card>
        </Link>
      </div>
    </>
  );
};

export default PropertyReseravtion;
