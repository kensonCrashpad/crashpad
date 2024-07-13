import React, { useEffect, useState } from 'react';
import { Grid, Box,Typography,  Button } from "@mui/material";
import PropertyCard from '../Dashboard/PropertyCard';
import PropertyService from '../../services/property/propertyService';


interface Property {
  id: number;
  title: string;
  imageUrl: string;
  isNew: boolean;
  rating: string;
  distance: string;
  dateRange: string;
  price: string;
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
}

interface PropertyGridProps {
  selectedAmenities: string[];
}



// const Favorites = () => {
const Favorites = () => {
  const [properties, setProperties] = useState<PropertyResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Explicitly define the type for the error state

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        if (userId) {
          const response = await PropertyService.getUserFavorites(userId);
          setProperties(response);
        } else {
          throw new Error('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to load favorite properties');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const mapToProperty = (dto: PropertyResponseDTO): Property => ({
    id: dto.propertyId,
    title: dto.title,
    imageUrl: dto.imageUrls[0],
    isNew: new Date(dto.userCreationDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    rating: "4.5",
    distance: "2 km",
    dateRange: "Jan 1 - Jan 10",
    price: dto.discountedPrice || dto.originalPrice,
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  // const filteredProperties = properties.filter((property) =>
  //   selectedAmenities.every((amenity) => property.amenities.includes(amenity))
  // );
  
  return (
    <div>
       <Typography variant="h4" gutterBottom>
        Your Favorite Properties
      </Typography>
      {/* <Grid container spacing={2} sx={{ paddingTop: "16px", paddingLeft: "100px" }}>
        {filteredProperties.map((dto) => {
          const property = mapToProperty(dto);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          );
        })}
      </Grid> */}
      
    
      {/* <Grid container spacing={2}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Grid item key={property.propertyId} xs={12} sm={6} md={4}>
              <PropertyCard property={property} />
            </Grid>
          ))
        ) : (
          <Typography>No favorite properties found</Typography>
        )}
      </Grid> */}
    </div>
  );
};

export default Favorites;
