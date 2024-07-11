import React, { useState, useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import PropertyCard from "./PropertyCard";
import DetailedModal from "./DetailedModal";
import PropertyService from "../../services/property/propertyService";

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

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedAmenities }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [properties, setProperties] = useState<PropertyResponseDTO[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await PropertyService.fetchProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, []);

  const handleCardClick = (property: Property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  const filteredProperties = properties.filter((property) =>
    selectedAmenities.every((amenity) => property.amenities.includes(amenity))
  );

  return (
    <>
      <Grid container spacing={2} sx={{ paddingTop: "16px", paddingLeft: "100px" }}>
        {filteredProperties.map((dto) => {
          const property = mapToProperty(dto);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "orange",
            "&:hover": { backgroundColor: "darkorange" },
          }}
          onClick={() => console.log("Load more properties...")}
        >
          Show More
        </Button>
      </Box>
      {selectedProperty && (
        <DetailedModal property={selectedProperty} open={modalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PropertyGrid;
