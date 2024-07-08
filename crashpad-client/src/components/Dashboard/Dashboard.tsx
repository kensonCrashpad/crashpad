// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   IconButton,
//   CardActions,
//   Box,
//   Collapse,
//   Modal,
//   Button,
// } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import cardImage from "../../images/loginBG5.jpg";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import SideNav from "../NavBar/SideNav";
// import SearchAndToggleBar from "./SearchAndToggleBar";
// import UserSettings from "./UserSettings";
// // import MoreInfoModal from "./MoreInfoModal";
// import { useNavigate } from "react-router-dom";
// import properties from "./properties.js";


// const DetailedModal = ({ property, open, onClose }) => {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" component="h2">
//           {property.title}
//         </Typography>
//       </Box>
//     </Modal>
//   );
// };

// const PropertyCard = ({ property }) => {
//   const navigate = useNavigate();

//   const handleNavigateToProperty = () => {
//     navigate("/propertyreservation", { state: { property } });
//   };

//   const handleNavigateToFavorites = (e) => {
//     e.stopPropagation(); // Prevents the card click event
//     navigate("/favorites");
//   };

//   return (
//     <Card sx={{ maxWidth: 345, position: "relative" }} onClick={handleNavigateToProperty}>
//       <CardMedia
//         component="img"
//         height="194"
//         image={property.imageUrl}
//         alt={property.title}
//       />
//       <IconButton
//         aria-label="add to favorites"
//         onClick={handleNavigateToFavorites}
//         sx={{
//           position: "absolute",
//           top: 8,
//           right: 8,
//           color: "grey",
//           "&:hover": {
//             color: "orange",
//             transform: "scale(1.2)",
//           },
//         }}
//       >
//         <FavoriteBorderIcon />
//       </IconButton>
//       <CardContent>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography gutterBottom variant="subtitle1" component="div">
//             {property.title}
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {property.isNew && (
//               <Typography
//                 variant="caption"
//                 sx={{
//                   backgroundColor: "orange",
//                   color: "white",
//                   borderRadius: 1,
//                   p: "2px 4px",
//                   marginRight: "8px",
//                 }}
//               >
//                 New
//               </Typography>
//             )}

//             <Typography
//               component="span"
//               variant="caption"
//               sx={{ marginLeft: "2px" }}
//             >
//               {property.rating}
//               <StarBorderIcon />
//             </Typography>
//           </Box>
//         </Box>
//         <Typography variant="body2" color="text.secondary">
//           {property.distance}
//         </Typography>
//         <Typography variant="body2" color="text.primary" gutterBottom>
//           {property.dateRange}
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {property.price} / night
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// const PropertyGrid = () => {
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleCardClick = (property) => {
//     setSelectedProperty(property);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       <Grid
//         container
//         spacing={2}
//         sx={{ paddingTop: "16px", paddingLeft: "100px" }}
//       >
//         {properties.map((property, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
//             <PropertyCard property={property} />
//           </Grid>
//         ))}
//       </Grid>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 4,
//           paddingTop: "0px",
//         }}
//       >
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "orange",
//             "&:hover": { backgroundColor: "darkorange" },
//           }}
//           onClick={() => console.log("Load more properties...")}
//         >
//           Show More
//         </Button>
//       </Box>
//       {selectedProperty && (
//         <DetailedModal
//           property={selectedProperty}
//           open={modalOpen}
//           onClose={handleCloseModal}
//         />
//       )}
//     </>
//   );
// };

// const Dashboard = () => {
//   return (
//     <>
//       <SideNav />
//       <UserSettings />
//       <SearchAndToggleBar />
//       <PropertyGrid />
//     </>
  
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Modal,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import SideNav from "../NavBar/SideNav";
import SearchAndToggleBar from "./SearchAndToggleBar";
import UserSettings from "./UserSettings";

// Assuming properties is imported correctly and matches Property interface
import properties from "./properties"; // Adjust the path as necessary
import PropertyService from "../../services/property/propertyService";

// Define the Property interface
interface Property {
  id: number;
  title: string;
  imageUrl: string;
  isNew: boolean;
  rating: string; // Change the type to string
  distance: string;
  dateRange: string;
  price: string;
}

//Property Response DTO
interface PropertyResponseDTO{
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

  const handleNavigateToFavorites = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card click event
    navigate("/favorites");
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  

  return (
    // <Card sx={{ maxWidth: 345, position: "relative", cursor: "pointer",padding:"10px",margin:"2px" }} onClick={handleNavigateToProperty}>
    //   <CardMedia
    //     component="img"
    //     height="270"
    //     image={property.imageUrl}
    //     alt={property.title}
    //     sx={{ borderRadius: '18px' }}
    //   />
    //   <IconButton
    //     aria-label="add to favorites"
    //     onClick={(e) => {
    //       e.stopPropagation();
    //       toggleFavorite();
    //     }}
    //     sx={{
    //       position: "absolute",
    //       top: 8,
    //       right: 8,
    //       color: isFavorite ? "red" : "grey",
    //       "&:hover": {
    //         color: "orange",
    //         transform: "scale(1.2)",
    //       },
    //     }}
    //   >
    //     {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    //   </IconButton>
    //   <CardContent>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "left",
    //       }}
    //     >
    //       <Typography gutterBottom variant="subtitle1" component="div">
    //         {property.title}
    //       </Typography>
    //       <Box sx={{ display: "flex", alignItems: "center" }}>
    //         {property.isNew && (
    //           <Typography
    //             variant="caption"
    //             sx={{
    //               backgroundColor: "orange",
    //               color: "white",
    //               borderRadius: 1,
    //               p: "2px 4px",
    //               marginRight: "8px",
    //             }}
    //           >
    //             New
    //           </Typography>
    //         )}

    //         <Typography
    //           component="span"
    //           variant="caption"
    //           sx={{ marginLeft: "2px" }}
    //         >
    //           {property.rating}
    //           <StarBorderIcon />
    //         </Typography>
    //       </Box>
    //     </Box>
    //     <Typography variant="body2" color="text.secondary">
    //       {property.distance}
    //     </Typography>
    //     <Typography variant="body2" color="text.primary" gutterBottom>
    //       {property.dateRange}
    //     </Typography>
    //     <Typography variant="subtitle1" color="text.secondary">
    //       {property.price} / night
    //     </Typography>
    //   </CardContent>
    // </Card>

    <Card
  sx={{
    maxWidth: 345,
    position: "relative",
    cursor: "pointer",
    padding: "10px",
    margin: "0px",
    borderRadius:"15px"
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
              height : "25px",
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
        {property.price} night
      </Typography>
    </Box>
  </CardContent>
</Card>

  );
};

// PropertyGrid component
const PropertyGrid: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [property, setProperties] = useState<PropertyResponseDTO[]>([]);

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

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ paddingTop: "16px", paddingLeft: "100px" }}
      >
        {properties.map((property: Property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
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
        <DetailedModal
          property={selectedProperty}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

// Dashboard component
const Dashboard: React.FC = () => {
  return (
    <>
      {/* Assuming these are sidebar, user settings, and search components */}
      <SideNav />
      <UserSettings />
      <SearchAndToggleBar />
      <PropertyGrid />
    </>
  );
};

export default Dashboard;

