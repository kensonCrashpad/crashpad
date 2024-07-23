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



const CustomCard = styled(Card)({
  maxWidth: 420,
  margin: "auto",
  marginTop: "0px",
  height: "auto",
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
  const today = new Date();
  const defaultCheckInDate = today.toISOString().split("T")[0];
  const defaultCheckOutDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(defaultCheckInDate);
  const [checkOut, setCheckOut] = useState(defaultCheckOutDate);
  const [cancellation, setCancellation] = React.useState<string>("non-refundable");
  const [guestCount, setGuestCount] = useState(0);

  const handleGuestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCount(parseInt(event.target.value)); 
  };

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
    navigate("/payment", {
      state: {
        checkIn: checkIn,
        checkOut: checkOut,
        totalPriceAfterTax: TotalPriceAfterTax,
        properties: properties
      }
    });
  };
  
  const orginalPrice = parseInt(properties.originalPrice)
  const discountPrice = parseInt(properties.discountedPrice)
  const serviceFee = 2;
  const refundable = orginalPrice + 15
  const nonRefundable = orginalPrice 

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const NumberOfBookingDays = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
  const taxRate = 0.1;

  let additionalGuestFee = 0;
  if (guestCount > 2) {
    additionalGuestFee = (guestCount - 2) * 10;
  }

  const TotalPrice = orginalPrice * NumberOfBookingDays + additionalGuestFee;
  let cancellationPolicy = 0
  if (cancellation ==="refundable"){
    cancellationPolicy = 15
  } else{
    cancellationPolicy = 0
  }
  const TotalPriceBeforeTax = TotalPrice + serviceFee - discountPrice + cancellationPolicy;
  const TotalIncludingTax = (TotalPriceBeforeTax * taxRate) + TotalPriceBeforeTax;
  const TotalPriceAfterTax = Math.round(TotalIncludingTax);
  const showPriceBreakdown = checkOut !== defaultCheckInDate && guestCount > 0 && cancellation !== null;
 
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
          inputProps={{ min: defaultCheckInDate }}
        />
        <TextField
          size="small"
          label="Check-out"
          type="date"
          defaultValue={defaultCheckOutDate}
          onChange={handleCheckOutChange}
          sx={{ width: "calc(50% - 10px)" }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: checkIn }}
        />
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Guests
        </Typography>
        <TextField
          size="small"
          type="number"
          defaultValue={0}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ width: "100px", marginBottom: "20px" }}
          onChange={handleGuestChange}
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
          style={{width:"400px",height:"50px"}}
          >
          <CustomToggleButton value="non-refundable">
            Non-refundable Total • ${nonRefundable}
          </CustomToggleButton>
          <CustomToggleButton value="refundable">
            Refundable Total • ${refundable} 
          </CustomToggleButton>
        </ToggleButtonGroup>
        <div style={{ margin: "15px", }}>
          {showPriceBreakdown && (<>
             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
             <span>{`${orginalPrice} $/night x ${NumberOfBookingDays} Days`}</span>
             <span>{`$ ${TotalPrice}`}</span>
           </Typography>
           <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
             <span>Discount Price</span>
             <span>{`$ ${discountPrice}`}</span>
           </Typography>
           <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
             <span>Service fee</span>
             <span>{`$ ${serviceFee}`}</span>
           </Typography>
           <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
             <span>Total before taxes</span>
             <span>{`$ ${TotalPriceBeforeTax}`}</span>
           </Typography>
           <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
             <span>Tax</span>
             <span>{`${taxRate * 100}%`}</span>
           </Typography>
           <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
             <span>Total after taxes</span>
             <span>{`$ ${TotalPriceAfterTax}`}</span>
           </Typography>
           </>)}
          <Button
          size="small"
          variant="contained"
          style={{ backgroundColor: "#FDA117", marginTop: "20px" }}
          fullWidth
          onClick={handleReserveCrashpad}
        >
          Reserve
        </Button>
        </div>
      </CardContent>
    </CustomCard>
  );
};

export default ReservationCard;


