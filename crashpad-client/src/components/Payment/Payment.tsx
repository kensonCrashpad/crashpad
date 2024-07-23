import React from "react";
import Nav from "../NavBar/SideNav";
import {Button,} from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "../Traveller/TravellerHeaderSetting";

import { useLocation } from "react-router-dom";


const LoginButton = styled(Button)({
  marginTop: "1em",
});

const Payment: React.FC = () => {
  const location = useLocation();
  const { checkIn, checkOut, totalPriceAfterTax , properties} = location.state || {};
  console.log(checkIn);
  console.log(checkOut);
  console.log(totalPriceAfterTax);
  console.log(properties);

  return (
    <>
      <Header />
      <Nav />
     
    </>
  );
};

export default Payment;


