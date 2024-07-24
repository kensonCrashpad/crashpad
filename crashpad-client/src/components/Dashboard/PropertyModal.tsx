import React from "react";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";

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
  hostId: number;
  latitude?: number;
  longitude?: number;
}

interface PropertyModalProps {
  open: boolean;
  property: PropertyResponseDTO | null;
  onClose: () => void;
}

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 1000px;  // Increased width for better layout
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const PropertyModal: React.FC<PropertyModalProps> = ({ open, property, onClose }) => {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" gutterBottom>
          {property.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {property.imageUrls && property.imageUrls.map((url, index) => (
                <Grid item xs={12} key={index}>
                  <img src={url} alt={`Property image ${index + 1}`} style={{ width: "100%", borderRadius: "8px" }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} md={4}>
            {property.name && (
              <Typography variant="body1" gutterBottom>
                <strong>Name: </strong>{property.name} ({property.propertyType})
              </Typography>
            )}
            {property.street && (
              <Typography variant="body1" gutterBottom>
                <strong>Address: </strong>{property.street}, {property.city}, {property.state} {property.zip}
              </Typography>
            )}
            {property.description && (
              <Typography variant="body1" gutterBottom>
                <strong>Description: </strong>{property.description}
              </Typography>
            )}
            {property.availability && (
              <Typography variant="body1" gutterBottom>
                <strong>Availability: </strong>{property.availability}
              </Typography>
            )}
            {property.originalPrice && (
              <Typography variant="body1" gutterBottom>
                <strong>Original Price: </strong>${property.originalPrice}
              </Typography>
            )}
            {property.discountedPrice && (
              <Typography variant="body1" gutterBottom>
                <strong>Discounted Price: </strong>${property.discountedPrice}
              </Typography>
            )}
          </Grid>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default PropertyModal;
