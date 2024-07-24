
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Grid, Box, Card, CardMedia } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import PropertyForm from "../HostProfile/PropertyForm";
import SideNav from "../NavBar/SideNav";
import ReservationCard from "./ReservationCard";
import UserSettings from "./UserSettings";
import PropertyService from "../../services/property/propertyService";
import { useLocation, useNavigate } from 'react-router-dom';


const SideBySide = styled("div")({
  display: "flex",
  gap: "5px",
});

interface UserFormState {
  location: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  about: string;
  hourlyrate: number;
}

interface PropertyResponseDTO {
  propertyId: number;
  propertyType: string;
  title: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  capacity: number;
  padMaxLength: string;
  padMaxWidth: string;
  description: string;
  availability: string;
  originalPrice: string;
  discountedPrice: string;
  amenities: string[];
  imageUrls: string[];
  userCreationDate: string;
  userModifyDate: string;
  latitude?: number;
  longitude?: number;
}

interface Property {
  id: number;
  title: string;
  imageUrl: string[];
  isNew: boolean;
  rating: string;
  distance: string;
  dateRange: string;
  price: string;
}
interface PropertyReseravtionProps {
  property: Property;
}

const PropertyReseravtion: React.FC = () => {
  const [propertyFormData, setPropertyFormData] = useState<UserFormState>({
    location: "Teton Frontier Park",
    address: "123 Main St",
    city: "Cityville",
    state: "WY",
    zip: 43901,
    about: "wifi",
    hourlyrate: 45,
  });

  const [errors, setErrors] = useState<any>();
  const [ShowProperty, setShowProperty] = useState(true);

  const location = useLocation();
  const { property } = location.state || {property : null };

  const [properties, setProperties] = useState<PropertyResponseDTO | null>(null);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if(property !== null){
          const propertiesData = await PropertyService.fetchPropertyDetailsAndHostDetails(property.id);
          console.log("Property Details are", propertiesData);
          setProperties(propertiesData);  
          
        }else{
          console.log("State is Undefined")
        }
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, [property]);
  
  const images = properties?.imageUrls || [];
    
  const validateForm = () => {
    let newErrors: any = {};

    if (!propertyFormData.location) {
      newErrors.userName = "Location is required.";
    }
    if (!propertyFormData.address) {
      newErrors.firstName = "Address is required.";
    }
    if (!propertyFormData.city) {
      newErrors.lastName = "City is required.";
    }
    if (!propertyFormData.state) {
      newErrors.age = "State is required.";
    }
    if (!propertyFormData.zip) {
      newErrors.gender = "Zip Code is required.";
    }
    if (!propertyFormData.about) {
      newErrors.location = "Description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const propertySubmitData = (e: any) => {
    e.preventDefault();
    setShowProperty(false);

    const isValid = validateForm();

    if (isValid) {
      console.log("Form validation", propertyFormData);
    } else {
      setShowProperty(true);
      console.log("Form validation failed");
    }
  };
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);

    setPropertyFormData({ ...propertyFormData, [name]: value });
  };

  const handleShowProperty = () => {
    setShowProperty(true);
  };

  const events = [
    {
      title: "Jane Reservation",
      start: new Date(2024, 3, 14),
      end: new Date(2024, 3, 20),
    },
  ];
  

  const navigateToHprofile = () => {
    window.location.href = "/hprofile";
  };

  return (
    <>
      <UserSettings />
      <SideNav />
      { properties !== null ? (
              <Box sx={{ flexGrow: 1, m: 4, paddingLeft: "6em" }}>
              <Grid container spacing={2}>
              <Grid item xs={7} m={"auto"}>
                  <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} dynamicHeight={false}>
                    {images.map((image:string,index:number) => (
                      <div key={index}>
                        <img 
                          src={image} 
                          alt={`Property Image ${index + 1}`} 
                          style={{ 
                            height: '450px', 
                            objectFit: 'cover', 
                            borderRadius: '20px', 
                            display: 'block', 
                            margin: '0 auto'
                          }} 
                        />
                      </div>
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={5} marginTop={"30px"}>
                  <ReservationCard properties ={properties}/>
                </Grid>
                <Grid item xs={12}>
                <Grid item xs={12}>
                  {ShowProperty ? (
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                      <PropertyForm
                        properties ={properties}
                        profileFormData={propertyFormData}
                        onClickEdit={handleShowProperty}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ flexGrow: 1, m: 4, paddingLeft: "6em" }}>
                      <form noValidate autoComplete="off" onSubmit={propertySubmitData}>
                        <TextField
                          fullWidth
                          name="location"
                          value={propertyFormData.location}
                          margin="normal"
                          id="location"
                          label="Location"
                          variant="outlined"
                          onChange={handleChange}
                          helperText={errors ? errors.location : ""}
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id="address"
                          label="Address"
                          variant="outlined"
                          name="address"
                          value={propertyFormData.address}
                          onChange={handleChange}
                          helperText={errors ? errors.address : ""}
                        />
                        <SideBySide>
                          <TextField
                            fullWidth
                            margin="normal"
                            id="city"
                            label="City"
                            variant="outlined"
                            name="city"
                            value={propertyFormData.city}
                            onChange={handleChange}
                            helperText={errors ? errors.city : ""}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            id="state"
                            label="State"
                            variant="outlined"
                            name="state"
                            value={propertyFormData.state}
                            onChange={handleChange}
                            helperText={errors ? errors.state : ""}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            id="zip"
                            label="Zip Code"
                            variant="outlined"
                            name="zip"
                            value={propertyFormData.zip}
                            onChange={handleChange}
                            helperText={errors ? errors.zip : ""}
                          />
                        </SideBySide>
                      </form>
                    </Box>
                  )}
                </Grid>
                </Grid>
              </Grid>
            </Box>
      
      ) : (<h1>PAGE IS LOADING</h1>)
      }
    </>
  );
};


export default PropertyReseravtion;




  
