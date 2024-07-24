import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, CardMedia, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import PropertyService from "../../services/property/propertyService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Property {
  id: number;
  title: string;
  imageUrls: string[];
  isNew: boolean;
  rating: string;
  distance: string;
  dateRange: string;
  price: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigateToProperty = () => {
    navigate("/propertyreservation", { state: { property } });
  };

  const toggleFavorite = async () => {
    setIsFavorite((prev) => !prev);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    if (!isFavorite) {
      try {
        const response = await PropertyService.addFavorite(userId, property.id);
        console.log(response);
        alert("Property marked as favorite successfully!");
      } catch (error) {
        console.error("Error adding favorite", error);
        alert("Failed to mark property as favorite.");
      }
    } else {
      try {
        const response = await PropertyService.removeFavorite(userId, property.id);
        console.log(response);
        alert("Property removed from favorites successfully!");
      } catch (error) {
        console.error("Error removing favorite", error);
        alert("Failed to remove property from favorites.");
      }
    }
  };

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? property.imageUrls.length - 1 : prev - 1));
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === property.imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        cursor: "pointer",
        margin: "0px",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        <Box
          onClick={handleNavigateToProperty}
          sx={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
        >
          <CardMedia
            component="img"
            src={property.imageUrls[currentIndex]}
            alt={`Property Image ${currentIndex + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px',
              transition: 'transform 0.5s ease',
            }}
          />
        </Box>
        <Button
          onClick={handlePrevClick}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          onClick={handleNextClick}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
      <IconButton
        aria-label="add to favorites"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: isFavorite ? "red" : "grey",
          "&:hover": {
            color: "orange",
            transform: "scale(1.2)",
          },
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
            {property.isNew && (
              <Typography
                variant="subtitle1"
                sx={{
                  backgroundColor: "orange",
                  height: "25px",
                  color: "white",
                  borderRadius: "1",
                  p: "2px 4px",
                  marginRight: "8px",
                }}
              >
                New
              </Typography>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon sx={{ fontSize: 16 }} />
              <Typography variant="subtitle1" component="span" sx={{ marginLeft: "2px" }}>
                {property.rating}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="body2" color="text.secondary">
            {property.distance}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {property.dateRange}
          </Typography>
          <Typography variant="subtitle1" color="black">
            {property.price}$ per night
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
