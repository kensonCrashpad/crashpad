import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

// Define the Property interface
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

// PropertyCard component
interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNavigateToProperty = () => {
    navigate("/propertyreservation", { state: { property } });
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        cursor: "pointer",
        padding: "10px",
        margin: "0px",
        borderRadius: "15px"
      }}
      onClick={handleNavigateToProperty}
    >
      <CardMedia
        component="img"
        height="270"
        image={property.imageUrl}
        alt={property.title}
        sx={{ borderRadius: "18px" }}
      />
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