import React from "react";
import Nav from "../NavBar/SideNav";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Header from "../Traveller/TravellerHeaderSetting";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardPaymentImage from "../../images/rvpark1.jpg";
import Mastercard from "../../images/mastercard.png";
import Visacard from "../../images/visacard.jpg";
import Debitcard from "../../images/debitcard.jpeg";

const LoginButton = styled(Button)({
  marginTop: "1em",
});

const Payment: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <Nav />
      <Container>
        <Box sx={{ flexGrow: 1, m: 5 }}>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <img
                src={CardPaymentImage}
                style={{ width: "100%", borderRadius: "20px" }}
              />
              <Typography
                variant="h5"
                sx={{ textAlign: "center", textDecoration: "underline", pt: 5 }}
              >
                {" "}
                CrashPad payment
              </Typography>
              <Typography
                color="gray"
                sx={{ textAlign: "center", textDecoration: "underline" }}
              >
                Cardmember Service PO Box 790444 SLC, UT 84555-0408
              </Typography>
              <Typography
                variant="h5"
                sx={{ pt: 5, textDecoration: "underline" }}
              >
                $60.00
              </Typography>
              <Divider sx={{ pt: 2 }} />
              <Stack
                direction="row"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 3 }}
              >
                <Typography color="gray">Total</Typography>
                <Typography color="gray">$45.00</Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="gray">Taxes and Charges</Typography>
                <Typography color="gray">$10.00</Typography>
              </Stack>
              <Divider />

              <Divider sx={{ pt: 4 }} />
              <Divider />
              <Stack
                direction="row"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Bill Total</Typography>
                <Typography>$55.00</Typography>
              </Stack>
              <Divider />
            </Grid>
            <Grid xs={6} sx={{ mr: 2, ml: 20 }}>
              <Typography
                variant="h6"
                sx={{ textDecoration: "underline", pt: 5 }}
              >
                Check Out
              </Typography>
              <Typography color="gray" sx={{ textDecoration: "underline" }}>
                Complete your purchase by providing with your payment details
              </Typography>
              <Typography
                variant="h6"
                sx={{ textDecoration: "underline", pt: 5 }}
              >
                Card Type
              </Typography>
              <Stack direction="row" spacing={2} sx={{ pt: 1, pl: 1 }}>
                <img
                  src={Mastercard}
                  style={{
                    width: "200px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                />
                <img
                  src={Visacard}
                  style={{
                    width: "200px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                />
                <img
                  src={Debitcard}
                  style={{
                    width: "200px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                />
              </Stack>
              <Typography
                variant="h6"
                sx={{ textDecoration: "underline", pt: 5 }}
              >
                Card Holder Name
              </Typography>
              <TextField
                id="filled-basic"
                placeholder="Name"
                variant="filled"
                size="small"
                fullWidth
              />
              <Typography
                variant="h6"
                sx={{ textDecoration: "underline", pt: 3 }}
              >
                Card Number
              </Typography>
              <TextField
                id="filled-basic"
                placeholder="Card No"
                variant="filled"
                size="small"
                fullWidth
                type="password"
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 3 }}
              >
                <Box>
                  <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                    Expiration Date
                  </Typography>
                  <TextField
                    id="filled-basic"
                    placeholder="Date"
                    variant="filled"
                    size="small"
                    fullWidth
                    type="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                    CVV Code
                  </Typography>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <FilledInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
              </Stack>

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#FDA117",
                      "&.Mui-checked": {
                        color: "#FDA117",
                      },
                    }}
                  />
                }
                label="I accept all terms and conditions"
              />
              <LoginButton
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#FDA117" }}
              >
                Pay $185.00
              </LoginButton>
              <Typography
                color="gray"
                sx={{ textAlign: "center", textDecoration: "underline" }}
              >
                Payments are secured and encrypted{" "}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 4 }}
              >
                <Typography sx={{ textDecoration: "underline" }}>
                  Powered by Design Lab
                </Typography>
                <Typography sx={{ textDecoration: "underline" }}>
                  Terms
                </Typography>
                <Typography sx={{ textDecoration: "underline" }}>
                  Privacy
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Payment;
