import React, { useState } from 'react';
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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Nav from '../NavBar/SideNav';
import UserSettings from '../Dashboard/UserSettings';
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ImageIcon from '@mui/icons-material/Image';
import PropertyService from '../../services/property/propertyService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
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
  imageUrls: File[]; // This should be File[]
}

const AddProperty: React.FC = () => {
  const [propertyFormData, setPropertyFormData] = useState<PropertyFormState>({
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
    imageUrls: [], // Initialize as File[]
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    let newErrors: any = {};

    if (!propertyFormData.propertyType)
      newErrors.propertyType = 'Property type is required.';
    if (!propertyFormData.title) newErrors.title = 'Title is required.';
    if (!propertyFormData.name) newErrors.name = 'Name is required.';
    if (!propertyFormData.street) newErrors.street = 'Street is required.';
    if (!propertyFormData.city) newErrors.city = 'City is required.';
    if (!propertyFormData.state) newErrors.state = 'State is required.';
    if (!propertyFormData.zip) newErrors.zip = 'ZIP code is required.';
    if (!propertyFormData.capacity) newErrors.capacity = 'Capacity is required.';
    if (!propertyFormData.padMaxLength) newErrors.padMaxLength = 'Length is required.';
    if (!propertyFormData.padMaxWidth) newErrors.padMaxWidth = 'Width is required.';
    if (!propertyFormData.description) newErrors.description = 'Description is required.';
    if (!propertyFormData.availability) newErrors.availability = 'Availability is required.';
    if (!propertyFormData.originalPrice) newErrors.originalPrice = 'Original Price is required.';
    if (!propertyFormData.discountedPrice) newErrors.discountedPrice = 'Discounted Price is required.';
    if (propertyFormData.amenities.length === 0)
      newErrors.amenities = 'At least one amenity is required.';
    if (propertyFormData.imageUrls.length === 0)
      newErrors.imageUrls = 'At least one image is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPropertyFormData((prevState) => ({
      ...prevState,
      [name]: ['capacity', 'padMaxLength', 'padMaxWidth', 'availability', 'originalPrice', 'discountedPrice'].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPropertyFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPropertyFormData((prevState) => ({
        ...prevState,
        imageUrls: files,
      }));
    }
  };

  const handleAmenityClick = (amenity: string) => {
    setPropertyFormData((prevState) => {
      const amenities = prevState.amenities.includes(amenity)
        ? prevState.amenities.filter((a) => a !== amenity)
        : [...prevState.amenities, amenity];
      return { ...prevState, amenities };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log('Form validation passed', propertyFormData);
      // Assuming you have userId available from context or props
      const userId = 1; // Replace with actual userId
      try {
        await PropertyService.savePropertyDetails(userId, propertyFormData);
      } catch (error) {
        console.error('Failed to save property', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <>
      <UserSettings />
      <Nav />
      <FormContainer>
        <StyledPaper elevation={3}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <SectionTitle variant="h5">Property Information</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    name="propertyType"
                    value={propertyFormData.propertyType}
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
                  value={propertyFormData.title}
                  label="Title"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  value={propertyFormData.name}
                  label="Name"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="street"
                  value={propertyFormData.street}
                  label="Street"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="city"
                  value={propertyFormData.city}
                  label="City"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="state"
                  value={propertyFormData.state}
                  label="State"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="zip"
                  value={propertyFormData.zip}
                  label="ZIP Code"
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errors.zip}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="capacity"
                  value={propertyFormData.capacity}
                  label="Capacity"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.capacity}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="padMaxLength"
                  value={propertyFormData.padMaxLength}
                  label="Length (ft)"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.padMaxLength}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="padMaxWidth"
                  value={propertyFormData.padMaxWidth}
                  label="Width (ft)"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.padMaxWidth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  value={propertyFormData.description}
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  onChange={handleInputChange}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="availability"
                  value={propertyFormData.availability}
                  label="Availability"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.availability}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="originalPrice"
                  value={propertyFormData.originalPrice}
                  label="Original Price"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.originalPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="discountedPrice"
                  value={propertyFormData.discountedPrice}
                  label="Discounted Price"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  helperText={errors.discountedPrice}
                />
              </Grid>
            </Grid>

            <SectionTitle variant="h5">Amenities</SectionTitle>
            <AmenitiesContainer>
              <IconButton onClick={() => handleAmenityClick('wifi')}>
                <WifiIcon
                  color={
                    propertyFormData.amenities.includes('wifi')
                      ? 'primary'
                      : 'inherit'
                  }
                />
              </IconButton>
              <IconButton onClick={() => handleAmenityClick('shower')}>
                <ShowerIcon
                  color={
                    propertyFormData.amenities.includes('shower')
                      ? 'primary'
                      : 'inherit'
                  }
                />
              </IconButton>
              <IconButton onClick={() => handleAmenityClick('food')}>
                <FastfoodIcon
                  color={
                    propertyFormData.amenities.includes('food')
                      ? 'primary'
                      : 'inherit'
                  }
                />
              </IconButton>
            </AmenitiesContainer>
            <Typography variant="body2" color="error">
              {errors.amenities}
            </Typography>

            <div>
              <Typography variant="h5" gutterBottom>
                Images
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<ImageIcon />}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              <Typography variant="body2" color="error">
                {errors.imageUrls}
              </Typography>
            </div>

            <SubmitButton
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Add Property
            </SubmitButton>
          </form>
        </StyledPaper>
      </FormContainer>
    </>
  );
};

export default AddProperty;
