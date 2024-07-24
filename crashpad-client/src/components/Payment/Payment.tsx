import React from "react";
import Nav from "../NavBar/SideNav";
import { Button, Box, Card, CardContent, CardMedia, Typography, TextField, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../Traveller/TravellerHeaderSetting";
import { useNavigate, useLocation } from 'react-router-dom'; 
import BookingService from "../../services/booking/BookingService";

const LoginButton = styled(Button)({
  marginTop: "1em",
});

interface PropertyDetails {
  title: string;
  city: string;
  state: string;
  zip: string;
  hostFirstName: string;
  hostLastName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  imageUrl: string;
}

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkIn, checkOut, totalPriceAfterTax, properties } = location.state || {};

  if (!properties) {
    return <Typography variant="h6">Property details not available</Typography>;
  }

  const property: PropertyDetails = {
    title: properties.title,
    city: properties.city,
    state: properties.state,
    zip: properties.zip,
    hostFirstName: properties.hostDetails.firstName,
    hostLastName: properties.hostDetails.lastName,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    totalPrice: totalPriceAfterTax,
    imageUrl: properties.imageUrls[0],
  };

  const handleReserveCrashpad = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
      const bookingData = {
        propertyId: properties.propertyId,
        travelerId: userId,
        startDate: checkIn,
        endDate: checkOut, 
        statusOfBooking: "Booked",
        totalCost: totalPriceAfterTax,
        specialRequests: "",
        hostId: properties.userId,
      };

      const response = await BookingService.createBooking(bookingData);
      console.log("Booking response:", response.data);
      alert("Booking successful!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking.");
    }
  };

  return (
    <>
      <Header />
      <Nav />
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Card style={{ borderRadius: "25px" }}>
              <CardMedia
                component="img"
                height="450"
                image={property.imageUrl}
                alt={property.title}
                style={{ borderRadius: "25px" }}
              />
              <CardContent>
                <Typography variant="h5">{property.title}</Typography>
                <Typography variant="body1">{`${property.city}, ${property.state}, ${property.zip}`}</Typography>
                <Typography variant="body1">{`Host Name: ${property.hostFirstName} ${property.hostLastName}`}</Typography>
                <Typography variant="body1">{`Check-in Date: ${property.checkInDate}`}</Typography>
                <Typography variant="body1">{`Check-out Date: ${property.checkOutDate}`}</Typography>
                <Typography variant="body1">{`Total Price (after tax): $${property.totalPrice}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Payment Information</Typography>
            <TextField label="Card Number" variant="outlined" fullWidth margin="normal" />
            <TextField label="Expiration Date" variant="outlined" fullWidth margin="normal" />
            <TextField label="CVV" variant="outlined" fullWidth margin="normal" />
            <TextField label="Name on Card" variant="outlined" fullWidth margin="normal" />
            <LoginButton variant="contained" color="primary" fullWidth onClick={handleReserveCrashpad}>
               Pay ${property.totalPrice}
            </LoginButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;