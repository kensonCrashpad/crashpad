import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyService from '../../services/property/propertyService';

import {
  TextField,
  Button,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  styled,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Nav from '../NavBar/SideNav';
import UserSettings from '../Dashboard/UserSettings';
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import OpacityIcon from '@mui/icons-material/Opacity';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PetsIcon from '@mui/icons-material/Pets';
import PowerIcon from '@mui/icons-material/Power';






import { useLocation } from 'react-router-dom';

const EditProperty = () => {
  const location = useLocation();
  const { propertyId } = location.state || {};

  useEffect(() => {
    if (propertyId) {
      fetchPropertyDetails(propertyId);
    }
  }, [propertyId]);

  const fetchPropertyDetails = async (id: number) => {
    // Call your service method here
    try {
      const details = await PropertyService.fetchPropertyDetailsAndHostDetails(id);
      console.log(details);
      // Set state with these details to edit
    } catch (error) {
      console.error('Failed to fetch property details:', error);
    }
  };

  return (
    <div>
      <h1>Edit Property</h1>
      <p>Check the console for the fetched property details.</p>
    </div>
  );
};

export default EditProperty;
