// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   IconButton,
//   Box,
// } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import cardImage from "../../images/loginBG5.jpg";

// const properties = Array(18).fill({
//   title: "YS, Teton",
//   distance: "2,776 kilometers away",
//   dateRange: "23-28 June",
//   price: "$100",
//   imageUrl: cardImage,
//   isNew: true,
//   rating: "4.9",
// });

// const PropertyCard = ({ property }) => (
//   <Card sx={{ maxWidth: 345, position: "relative" }}>
//     <CardMedia
//       component="img"
//       height="194"
//       image={property.imageUrl}
//       alt={property.title}
//     />
//     <IconButton
//       aria-label="add to favorites"
//       sx={{ position: "absolute", top: 8, right: 8, color: "grey" }}
//     >
//       <FavoriteBorderIcon />
//     </IconButton>
//     <CardContent>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography gutterBottom variant="subtitle1" component="div">
//           {property.title}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {property.isNew && (
//             <Typography
//               variant="caption"
//               sx={{
//                 backgroundColor: "orange",
//                 color: "white",
//                 borderRadius: 1,
//                 p: "2px 4px",
//                 marginRight: "8px",
//               }}
//             >
//               New
//             </Typography>
//           )}

//           <Typography
//             component="span"
//             variant="caption"
//             sx={{ marginLeft: "2px" }}
//           >
//             {property.rating}
//             <StarBorderIcon />
//           </Typography>
//         </Box>
//       </Box>
//       <Typography variant="body2" color="text.secondary">
//         {property.distance}
//       </Typography>
//       <Typography variant="body2" color="text.primary" gutterBottom>
//         {property.dateRange}
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary">
//         {property.price} / night
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const PropertyGrid = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings}>
//       {properties.map((property, index) => (
//         <div key={index}>
//           <PropertyCard property={property} />
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default PropertyGrid;

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import cardImage from "../../images/loginBG5.jpg";

interface Property {
  title: string;
  distance: string;
  dateRange: string;
  price: string;
  imageUrl: string;
  isNew: boolean;
  rating: string;
}

const properties: Property[] = Array.from({ length: 18 }, (_, index) => ({
  title: `Property ${index + 1}`,
  distance: "2,776 kilometers away",
  dateRange: "23-28 June",
  price: "$100",
  imageUrl: cardImage,
  isNew: index % 3 === 0, // Every third property will be marked as new
  rating: "4.9",
}));

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => (
  <Card sx={{ maxWidth: 345, position: "relative" }}>
    <CardMedia
      component="img"
      height="194"
      image={property.imageUrl}
      alt={property.title}
    />
    <IconButton
      aria-label="add to favorites"
      sx={{ position: "absolute", top: 8, right: 8, color: "grey" }}
    >
      <FavoriteBorderIcon />
    </IconButton>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="subtitle1" component="div">
          {property.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {property.isNew && (
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "orange",
                color: "white",
                borderRadius: 1,
                p: "2px 4px",
                marginRight: "8px",
              }}
            >
              New
            </Typography>
          )}

          <Typography
            component="span"
            variant="caption"
            sx={{ marginLeft: "2px" }}
          >
            {property.rating}
            <StarBorderIcon />
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {property.distance}
      </Typography>
      <Typography variant="body2" color="text.primary" gutterBottom>
        {property.dateRange}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {property.price} / night
      </Typography>
    </CardContent>
  </Card>
);

const PropertyGrid: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* <Slider {...settings}> */}
        {properties.map((property, index) => (
          <div key={index}>
            <PropertyCard property={property} />
          </div>
        ))}
      {/* </Slider> */}
    </div>
  );
};

export default PropertyGrid;