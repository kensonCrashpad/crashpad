import React, { useState, useEffect } from 'react';
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
  Tooltip,
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
import PropertyService from '../../services/property/propertyService';
import { useNavigate, useLocation } from 'react-router-dom';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import OpacityIcon from '@mui/icons-material/Opacity';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PetsIcon from '@mui/icons-material/Pets';
import PowerIcon from '@mui/icons-material/Power';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  position: 'relative',
}));

const FormContainer = styled('div')(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const AmenitiesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ImageUploadButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

interface PropertyFormState {
  propertyType: string;
  title: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  capacity: number;
  padMaxLength: number;
  padMaxWidth: number;
  description: string;
  availability: number;
  originalPrice: number;
  discountedPrice: number;
  amenities: string[];
  imageUrls: File[];
  imagePreviews: string[];
}

const EditProperty: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId } = location.state || {};

  const [property, setProperty] = useState<PropertyFormState>({
    propertyType: '',
    title: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    capacity: 0,
    padMaxLength: 0,
    padMaxWidth: 0,
    description: '',
    availability: 0,
    originalPrice: 0,
    discountedPrice: 0,
    amenities: [],
    imageUrls: [],
    imagePreviews: [],
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (propertyId) {
      fetchPropertyDetails(propertyId);
    }
  }, [propertyId]);

  const fetchPropertyDetails = async (id: number) => {
    try {
      const details = await PropertyService.fetchPropertyDetailsAndHostDetails(id);
      setProperty({
        propertyType: details.propertyType,
        title: details.title,
        name: details.name,
        street: details.street,
        city: details.city,
        state: details.state,
        zip: details.zip,
        capacity: details.capacity,
        padMaxLength: parseInt(details.padMaxLength),
        padMaxWidth: parseInt(details.padMaxWidth),
        description: details.description,
        availability: parseInt(details.availability),
        originalPrice: parseInt(details.originalPrice),
        discountedPrice: parseInt(details.discountedPrice),
        amenities: details.amenities,
        imageUrls: [],
        imagePreviews: details.imageUrls,
      });
    } catch (error) {
      console.error('Failed to fetch property details:', error);
    }
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!property.propertyType) newErrors.propertyType = 'Property type is required.';
    if (!property.title) newErrors.title = 'Title is required.';
    if (!property.name) newErrors.name = 'Name is required.';
    if (!property.street) newErrors.street = 'Street is required.';
    if (!property.city) newErrors.city = 'City is required.';
    if (!property.state) newErrors.state = 'State is required.';
    if (!property.zip) newErrors.zip = 'ZIP code is required.';
    if (property.capacity < 0) newErrors.capacity = 'Capacity must be 0 or greater.';
    if (property.padMaxLength < 0) newErrors.padMaxLength = 'Length must be 0 or greater.';
    if (property.padMaxWidth < 0) newErrors.padMaxWidth = 'Width must be 0 or greater.';
    if (!property.description) newErrors.description = 'Description is required.';
    if (property.availability < 0) newErrors.availability = 'Availability must be 0 or greater.';
    if (property.originalPrice < 0) newErrors.originalPrice = 'Original Price must be 0 or greater.';
    if (property.discountedPrice < 0) newErrors.discountedPrice = 'Discounted Price must be 0 or greater.';
    if (property.amenities.length === 0) newErrors.amenities = 'At least one amenity is required.';
    if (property.imageUrls.length === 0 && property.imagePreviews.length === 0)
      newErrors.imageUrls = 'At least one image is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: ['capacity', 'padMaxLength', 'padMaxWidth', 'availability', 'originalPrice', 'discountedPrice'].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const handleAmenityClick = (amenity: string) => {
    setProperty((prevState) => {
      const amenities = prevState.amenities.includes(amenity)
        ? prevState.amenities.filter((a) => a !== amenity)
        : [...prevState.amenities, amenity];
      return { ...prevState, amenities };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const fileURLs = filesArray.map((file) => URL.createObjectURL(file));
      setProperty((prevState) => ({
        ...prevState,
        imageUrls: [...prevState.imageUrls, ...filesArray],
        imagePreviews: [...prevState.imagePreviews, ...fileURLs],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setProperty((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, idx) => idx !== index),
      imagePreviews: prevState.imagePreviews.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await PropertyService.editPropertyDetails(propertyId, property);
        navigate('/hostprofile');
      } catch (error) {
        console.error('Failed to save property', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleCancel = () => navigate('/hostprofile');

  return (
    <>
      <UserSettings />
      <Nav />
      <FormContainer>
        <StyledPaper>
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <CloseIcon />
          </IconButton>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <SectionTitle variant="h5">Property Information</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    name="propertyType"
                    value={property.propertyType}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="nature">Nature</MenuItem>
                    <MenuItem value="parking lot">Parking Lot</MenuItem>
                    <MenuItem value="barn">Barn</MenuItem>
                  </Select>
                  <Typography variant="body2" color="error">
                    {errors.propertyType}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="title"
                  value={property.title}
                  label="Title"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.title}
                  error={!!errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  value={property.name}
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.name}
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="street"
                  value={property.street}
                  label="Street"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.street}
                  error={!!errors.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="city"
                  value={property.city}
                  label="City"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.city}
                  error={!!errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="state"
                  value={property.state}
                  label="State"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.state}
                  error={!!errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="zip"
                  value={property.zip}
                  label="ZIP Code"
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.zip}
                  error={!!errors.zip}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="capacity"
                  value={property.capacity}
                  label="Capacity"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.capacity}
                  error={!!errors.capacity}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="padMaxLength"
                  value={property.padMaxLength}
                  label="Length (ft)"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.padMaxLength}
                  error={!!errors.padMaxLength}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="padMaxWidth"
                  value={property.padMaxWidth}
                  label="Width (ft)"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.padMaxWidth}
                  error={!!errors.padMaxWidth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  value={property.description}
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  onChange={handleChange}
                  helperText={errors.description}
                  error={!!errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="availability"
                  value={property.availability}
                  label="Availability"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.availability}
                  error={!!errors.availability}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="originalPrice"
                  value={property.originalPrice}
                  label="Original Price"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.originalPrice}
                  error={!!errors.originalPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="discountedPrice"
                  value={property.discountedPrice}
                  label="Discounted Price"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  helperText={errors.discountedPrice}
                  error={!!errors.discountedPrice}
                />
              </Grid>
            </Grid>

            <SectionTitle variant="h5">Amenities</SectionTitle>
            <AmenitiesContainer>
                <Tooltip title="Wifi">
                    <IconButton onClick={() => handleAmenityClick('Wifi')}>
                        <WifiIcon
                            color={
                                property.amenities.includes('Wifi')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Shower">
                    <IconButton onClick={() => handleAmenityClick('Shower')}>
                        <ShowerIcon
                            color={
                                property.amenities.includes('Shower')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Fireplace">
                    <IconButton onClick={() => handleAmenityClick('Fireplace')}>
                        <FireplaceIcon
                            color={
                                property.amenities.includes('Fireplace')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Food">
                    <IconButton onClick={() => handleAmenityClick('Food')}>
                        <FastfoodIcon
                            color={
                                property.amenities.includes('Food')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Grill">
                    <IconButton onClick={() => handleAmenityClick('Grill')}>
                        <OutdoorGrillIcon
                            color={
                                property.amenities.includes('Grill')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Laundry">
                    <IconButton onClick={() => handleAmenityClick('Laundry')}>
                        <LocalLaundryServiceIcon
                            color={
                                property.amenities.includes('Laundry')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Electricity">
                    <IconButton onClick={() => handleAmenityClick('Electricity')}>
                        <ElectricalServicesIcon
                            color={
                                property.amenities.includes('Electricity')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="WaterHooks">
                    <IconButton onClick={() => handleAmenityClick('Waterhooks')}>
                        <OpacityIcon
                            color={
                                property.amenities.includes('Waterhooks')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Picknic Table">
                    <IconButton onClick={() => handleAmenityClick('Picknic Table')}>
                        <TableRestaurantIcon
                            color={
                                property.amenities.includes('Picknic Table')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Propane Gas">
                    <IconButton onClick={() => handleAmenityClick('Propane Gas')}>
                        <LocalGasStationIcon
                            color={
                                property.amenities.includes('Propane Gas')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Pets">
                    <IconButton onClick={() => handleAmenityClick('Pets')}>
                        <PetsIcon
                            color={
                                property.amenities.includes('Pets')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Generator">
                    <IconButton onClick={() => handleAmenityClick('Generators')}>
                        <PowerIcon
                            color={
                                property.amenities.includes('Generators')
                                    ? 'primary'
                                    : 'inherit'
                            }
                        />
                    </IconButton>
                </Tooltip>
            </AmenitiesContainer>

            <Typography variant="body2" color="error">{errors.amenities}</Typography>

            <SectionTitle variant="h6">Upload Images</SectionTitle>
            <Button variant="contained" component="label">
              Upload Images
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
              {property.imagePreviews.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
                  <img src={image} alt={`Property Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{ position: 'absolute', top: 0, right: 0, color: 'error.main' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <SubmitButton type="submit" variant="contained">Save Property</SubmitButton>
              </Grid>
              <Grid item>
                <CancelButton onClick={handleCancel} variant="outlined">Cancel</CancelButton>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </FormContainer>
    </>
  );
};

export default EditProperty;

