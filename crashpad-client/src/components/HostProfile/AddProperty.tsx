import React, { useState } from "react";
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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Nav from "../NavBar/SideNav";
import UserSettings from "../Dashboard/UserSettings";
import WifiIcon from "@mui/icons-material/Wifi";
import ShowerIcon from "@mui/icons-material/Shower";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ImageIcon from "@mui/icons-material/Image";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
}));

const FormContainer = styled("div")(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  padding: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const AmenitiesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ImageUploadButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

interface PropertyFormState {
  propertyType: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  capacity: number;
  length: number;
  width: number;
  description: string;
  availability: number;
  price: number;
  amenities: string[];
  images: File[];
}

const AddProperty: React.FC = () => {
  const [propertyFormData, setPropertyFormData] = useState<PropertyFormState>({
    propertyType: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    capacity: 0,
    length: 0,
    width: 0,
    description: "",
    availability: 0,
    price: 0,
    amenities: [],
    images: [],
  });

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    let newErrors: any = {};

    if (!propertyFormData.propertyType)
      newErrors.propertyType = "Property type is required.";
    if (!propertyFormData.street) newErrors.street = "Street is required.";
    if (!propertyFormData.city) newErrors.city = "City is required.";
    if (!propertyFormData.state) newErrors.state = "State is required.";
    if (!propertyFormData.zip) newErrors.zip = "ZIP code is required.";
    if (!propertyFormData.capacity)
      newErrors.capacity = "Capacity is required.";
    if (!propertyFormData.length) newErrors.length = "Length is required.";
    if (!propertyFormData.width) newErrors.width = "Width is required.";
    if (!propertyFormData.description)
      newErrors.description = "Description is required.";
    if (!propertyFormData.availability)
      newErrors.availability = "Availability is required.";
    if (!propertyFormData.price) newErrors.price = "Price is required.";
    if (propertyFormData.amenities.length === 0)
      newErrors.amenities = "At least one amenity is required.";
    if (propertyFormData.images.length === 0)
      newErrors.images = "At least one image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Form validation passed", propertyFormData);
      // Proceed with form submission logic
    } else {
      console.log("Form validation failed");
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setPropertyFormData({ ...propertyFormData, propertyType: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPropertyFormData({
        ...propertyFormData,
        images: Array.from(e.target.files),
      });
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
                    onChange={handleChange}
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
                  name="street"
                  value={propertyFormData.street}
                  label="Street"
                  variant="outlined"
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      street: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      city: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      state: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      zip: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      capacity: parseInt(e.target.value, 10),
                    })
                  }
                  helperText={errors.capacity}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="length"
                  value={propertyFormData.length}
                  label="Length (ft)"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      length: parseInt(e.target.value, 10),
                    })
                  }
                  helperText={errors.length}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="width"
                  value={propertyFormData.width}
                  label="Width (ft)"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      width: parseInt(e.target.value, 10),
                    })
                  }
                  helperText={errors.width}
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      description: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setPropertyFormData({
                      ...propertyFormData,
                      availability: parseInt(e.target.value, 10),
                    })
                  }
                  helperText={errors.availability}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="price"
                  value={propertyFormData.price}
                  label="Price"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setPropertyFormData({
                        ...propertyFormData,
                        price: parseInt(e.target.value, 10),
                      })
                    }
                    helperText={errors.price}
                  />
                </Grid>
              </Grid>
  
              <SectionTitle variant="h5">Amenities</SectionTitle>
              <AmenitiesContainer>
                <IconButton onClick={() => handleAmenityClick("wifi")}>
                  <WifiIcon
                    color={
                      propertyFormData.amenities.includes("wifi")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </IconButton>
                <IconButton onClick={() => handleAmenityClick("shower")}>
                  <ShowerIcon
                    color={
                      propertyFormData.amenities.includes("shower")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </IconButton>
                <IconButton onClick={() => handleAmenityClick("food")}>
                  <FastfoodIcon
                    color={
                      propertyFormData.amenities.includes("food")
                        ? "primary"
                        : "inherit"
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
              <Typography variant="body2" color="error">{errors.images}</Typography>
            </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Add Property
              </Button>
            </form>
          </StyledPaper>
        </FormContainer>
      </>
    );
  };
  
  export default AddProperty;
  