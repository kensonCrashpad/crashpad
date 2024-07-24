import React from 'react';
import { Typography, Box, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../HostProfile/ImageCarousel';

interface ShowAccomodationProps {
  type: string;
  length: string;
  width: string;
  height: string;
  year: string;
  make: string;
  model: string;
  vehicleDescription: string;
  rvImage: [];
  imagePreviews: [];
  rvFormData: any;
}

const RVContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
}));

const RVeDetails = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const ShowAccomodation: React.FC<ShowAccomodationProps> = ({ type, length, width, height, year, make, model, rvImage, imagePreviews, vehicleDescription, rvFormData }) => {
  const navigate = useNavigate();
  const handleEditRV = () => {
    navigate('/travelerprofile', { state: rvFormData });
  };

  return (
    <RVContainer>
      <RVeDetails>
        <Typography variant="h5" component="div" gutterBottom sx={{ mt: 4 }}>
           Check your RV Details below
        </Typography>
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          {type && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>Type :</strong> {type}</Typography>
            </Grid>
          )}
          {length && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>Length :</strong> {length}</Typography>
            </Grid>
          )}
          {width && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>Width :</strong> {width}</Typography>
            </Grid>
          )}
          {height && (
            <Grid item xs={8} sm={6}>
              <Typography variant="body1" align="left"><strong>Height :</strong> {height}</Typography>
            </Grid>
          )}
          {year && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>Year :</strong> {year}</Typography>
            </Grid>
          )}
          {make && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>Make:</strong> {make}</Typography>
            </Grid>
          )}
          {model && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>Model:</strong> {model}</Typography>
            </Grid>
          )}
          {vehicleDescription && (
            <Grid item xs={12}>
              <Typography variant="body1" align="left"><strong>Vehicle Description:</strong> {vehicleDescription}</Typography>
            </Grid>
          )}
          <ImageCarousel images={imagePreviews} />
        </Grid>
        <Button variant="contained" component="span" style={{ backgroundColor: "#FDA117" }} onClick={handleEditRV} sx={{ mt: 2 }}>
          Edit RV Details
        </Button>
      </RVeDetails>
    </RVContainer>
  );
};

export default ShowAccomodation;
