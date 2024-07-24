import React from "react";
import { Modal, Box, Typography } from "@mui/material";

// Define the Property interface
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

// DetailedModal component
interface DetailedModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

const DetailedModal: React.FC<DetailedModalProps> = ({ property, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {property.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rating: {property.rating}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Distance: {property.distance}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Date Range: {property.dateRange}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: {property.price} / night
        </Typography>
        {/* Add more details as needed */}
      </Box>
    </Modal>
  );
};

export default DetailedModal;
