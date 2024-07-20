import React, { useEffect, useState } from 'react';
import { Grid, Box,Typography,  Button, Card, CardMedia, IconButton, CardContent } from "@mui/material";
import PropertyCardFavorite from '../Dashboard/PropertyCardFavorite';
import PropertyService from '../../services/property/propertyService';
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import SideNav from './SideNav';
import UserSettings from '../Dashboard/UserSettings';
import SearchAndToggleBar from '../Dashboard/SearchAndToggleBar';


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

const Favorites: React.FC = () => {
  const [properties, setProperties] = useState<PropertyResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const removeFromFavorite = async(propertyId:number)=>{
    try {

      console.log("Property ID to be removed from FAV: ", propertyId)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        const propertyID = propertyId; // pass property id from clicked card 

      if(userId && propertyID){
        
      const response = await PropertyService.removeFavorite(userId, propertyID);
      console.log(response); 
      alert("Property removed from favorites successfully!");
    }
    } catch (error) {
      console.error("Error removing favorite", error);
      alert("Failed to remove property from favorites.");
    }
  }

  // const handleNavigateToProperty = (property: PropertyResponseDTO) => {
  //   Navigate("/propertyreservation");
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <>
    <div>
    <SideNav />
    <UserSettings />
    <SearchAndToggleBar
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        handleSearchResults={handleSearchResults}
      />
    </div>
    <div style={{marginLeft:"80px"}}>
    <Grid container >
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={property.propertyId}>
          <Card
            sx={{
              maxWidth: 345,
              position: "relative",
              cursor: "pointer",
              borderRadius: "15px",
              marginTop:"25px",
              margin: "27px",
              marginRight:"0"
            }}
          >
            <CardMedia
              component="img"
              height="270"
              image={property.imageUrls[0]}
              alt={property.title}
              sx={{ borderRadius: "18px" }}
            />
            <IconButton
              aria-label="add to favorites" onClick={(e) => {
                removeFromFavorite(property.propertyId);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
                "&:hover": {
                  color: "orange",
                  transform: "scale(1.2)",
                },
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold">
                  {property.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StarIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="body2" color="text.secondary">
                  {property.city}, {property.state}
                </Typography>
                <Typography variant="subtitle1" color="black">
                  ${property.originalPrice} per night
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
    </>
  );

}

export default Favorites;