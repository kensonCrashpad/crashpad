import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserSettings from "../Dashboard/UserSettings";
import CountryPad from "../../images/CountryEscape.jpg";
// import Pad1 from '../images/Pad1.jpg'
import Lot1 from "../../images/Lot1.jpg";
import Lot2 from "../../images/Lot2.jpg";
import Lot3 from "../../images/Lot3.jpg";
import Lot4 from "../../images/Lot4.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
// import Calendar from "./Calendar";
import PropertyForm from "./PropertyForm";
import Nav from "../NavBar/SideNav";

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
}

const Property1: React.FC = () => {
  const [propertyFormData, setPropertyFormData] = useState<UserFormState>({
    location: "Property 1",
    address: "123 Main St",
    city: "Cityville",
    state: "CA",
    zip: 12345,
    about: "Quiety property with plenty of space.",
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
      title: "Doe Reservation",
      start: new Date(2024, 3, 21),
      end: new Date(2024, 3, 27),
    },
  ];

  const navigateToHprofile = () => {
    window.location.href = "/hostprofile";
  };

  return (
    <>
      <UserSettings></UserSettings>
      <Nav></Nav>
      <Box sx={{ flexGrow: 1, m: 4, paddingLeft: "6em" }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <img
              src={CountryPad}
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
                <TextField
                  fullWidth
                  placeholder="Tell me about the property..."
                  multiline
                  margin="normal"
                  id="about"
                  label="About"
                  variant="outlined"
                  name="about"
                  value={propertyFormData.about}
                  onChange={handleChange}
                  rows={2}
                  maxRows={4}
                  helperText={errors ? errors.about : ""}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "1em" }}
                ></Typography>
              </form>
            </Grid>
          )}

          {/* <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            style={{ height: "400px" }}
          /> */}
        </Grid>
      </Box>
      <Box style={{ paddingLeft: "8em" }}>
        <Button
          size="small"
          variant="contained"
          style={{ backgroundColor: "#FDA117" }}
          onClick={navigateToHprofile}
        >
          Back To Profile
        </Button>
      </Box>

      <div
        style={{
          display: "flex",
          gap: "50px",
          paddingLeft: "8em",
          paddingRight: "5em",
        }}
      >
        <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
          <CardMedia
            sx={{ width: 400, height: 250 }}
            image={Lot1}
            title="green iguana"
          />
        </Card>
        <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
          <CardMedia
            sx={{ width: 400, height: 250 }}
            image={Lot2}
            title="green iguana"
          />
        </Card>
        <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
          <CardMedia
            sx={{ width: 400, height: 250 }}
            image={Lot3}
            title="green iguana"
          />
        </Card>
        <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
          <CardMedia
            sx={{ width: 400, height: 250 }}
            image={Lot4}
            title="green iguana"
          />
        </Card>
      </div>
    </>
  );
};

export default Property1;
