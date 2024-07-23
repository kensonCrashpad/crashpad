import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Pagination } from "@mui/material";
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
  hostId:number;
}

interface PropertyGridProps {
  selectedAmenities: string[];
  properties: PropertyResponseDTO[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ selectedAmenities, properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [allProperties, setAllProperties] = useState<PropertyResponseDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const propertiesData = await PropertyService.fetchProperties();
        setAllProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    if (properties.length === 0) {
      fetchAllProperties();
    } else {
      setAllProperties(properties);
    }
  }, [properties]);

  const handleCardClick = (property: Property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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

  const filteredProperties = allProperties.filter((property) =>
    selectedAmenities.every((amenity) => property.amenities.includes(amenity))
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  return (
    <>
     <Grid container spacing={2} sx={{ paddingTop: "16px", paddingLeft: "111px" }}>
        {currentProperties.map((dto) => {
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
          mt: "13px",
        }}
      >
        <Pagination
          count={Math.ceil(filteredProperties.length / propertiesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: '#f37218db',
                color: "white",
                "&:hover": {
                  backgroundColor: '#e5762952',
                },
              },
            },
          }}
        />
      </Box>
      {selectedProperty && (
        <DetailedModal property={selectedProperty} open={modalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PropertyGrid;
