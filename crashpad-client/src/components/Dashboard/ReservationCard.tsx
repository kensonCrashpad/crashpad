
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { log } from "console";

const CustomCard = styled(Card)({
  maxWidth: 400,
  margin: "auto",
  marginTop: "0px",
  height: "500px",
  borderRadius: "20px",
  boxShadow: " 0px 0px 10px 0px #000000",
});

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#FDA117",
  },
});

const ReservationCard = ({properties}:any) => {
  const defaultCheckInDate = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(defaultCheckInDate);
  const [checkOut, setCheckOut] = useState(defaultCheckInDate);
  const [cancellation, setCancellation] = React.useState<string>("non-refundable");

  const handleCancellationChange = (event: React.MouseEvent<HTMLElement>, newCancellation: string) => {
    if (newCancellation !== null) {
      setCancellation(newCancellation);
    }
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(event.target.value);
  };

  const navigate = useNavigate();
  const handleReserveCrashpad = () => {
    navigate("/payment");
  };

  const orginalPrice = parseInt(properties.originalPrice)
  const discountPrice = parseInt(properties.discountedPrice)
  const serviceFee = 2;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const NumberOfBookingDays = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
  const taxRate = 0.3;

    
  const TotalPriceBeforeTax = orginalPrice * NumberOfBookingDays + serviceFee - discountPrice;
  const TotalIncludingTax = TotalPriceBeforeTax * taxRate
  const TotalPriceAfterTax = Math.round((TotalPriceBeforeTax) *taxRate);
 
 return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5" gutterBottom style = {{fontWeight:"bold"}}>
          ${properties.originalPrice}/night
        </Typography>
        <TextField
          size="small"
          label="Check-in"
          type="date"
          defaultValue={defaultCheckInDate}
          onChange={handleCheckInChange}
          sx={{ marginRight: "10px", width: "calc(50% - 10px)" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          size="small"
          label="Check-out"
          type="date"
          defaultValue={defaultCheckInDate}
          onChange={handleCheckOutChange}
          sx={{ width: "calc(50% - 10px)" }}
          InputLabelProps={{ shrink: true }}
        />
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Guests
        </Typography>
        <TextField
          size="small"
          type="number"
          defaultValue={1}
          InputProps={{ inputProps: { min: 1 } }}
          sx={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography variant="body1" gutterBottom>
          Cancellation Policies
        </Typography>
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={cancellation}
          exclusive
          onChange={handleCancellationChange}
          fullWidth
        >
          <CustomToggleButton value="non-refundable">
            Non-refundable Total • ${orginalPrice}
          </CustomToggleButton>
          <CustomToggleButton value="refundable">
            Refundable Total • ${orginalPrice + 15} 
          </CustomToggleButton>
        </ToggleButtonGroup>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {`${orginalPrice} $/night x ${NumberOfBookingDays} Days  = $ ${TotalPriceBeforeTax} `} <br/>
          {`Discount Price ${discountPrice}`}<br/>
          {`Service fee ${serviceFee}`}<br/>
          {`Tax ${taxRate}`}<br/>
          {`Total after taxes ${TotalPriceAfterTax}`}<br/>
        </Typography> 
        <Button
          size="small"
          variant="contained"
          style={{ backgroundColor: "#FDA117", marginTop: "20px" }}
          fullWidth
          onClick={handleReserveCrashpad}
        >
          Reserve
        </Button>
      </CardContent>
    </CustomCard>
  );
};

export default ReservationCard;


