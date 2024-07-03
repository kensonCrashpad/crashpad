// import React, { useState, useEffect } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import RVimage from "../../images/vehicle.jpg"; // Adjust the import path as necessary
// import { useNavigate, useLocation } from "react-router-dom";

// const EditButton = styled(Button)({
//   backgroundColor: "#FDA117",
//   padding: "10px 20px",
//   height: "30px",
//   minWidth: "fit-content",
//   marginTop: "1em",
// });

// export interface AccommodationInterface {
//   type: string;
//   length: number;
//   width: number;
//   height: number;
//   year: number;
//   model: string;
//   make: string;
//   aboutAcco: string;
// }

// interface ShowAccomodationProps {
//   userAccomodation: AccommodationInterface | null;
// }

// const ShowAccommodation: React.FC<ShowAccomodationProps> = (userAccomodation) => {
//   const location = useLocation();
//   const updatedProfileData = location.state as AccommodationInterface;

//   const [accommodationFormData, setAccommodationFormData] = useState<AccommodationInterface>({
//     type: updatedProfileData?.type || '',
//     length: updatedProfileData?.length || 0,
//     width: updatedProfileData?.width || 0,
//     height: updatedProfileData?.height || 0,
//     year: updatedProfileData?.year || 0,
//     model: updatedProfileData?.model || '',
//     make: updatedProfileData?.make || '',
//     aboutAcco: updatedProfileData?.aboutAcco || '',
//   });

//   const navigate = useNavigate();

//   const handleEdit = () => {
//     navigate("/editaccommodation", { state: updatedProfileData });
//   };

//   useEffect(() => {
//     if (updatedProfileData) {
//       setAccommodationFormData({
//         type: updatedProfileData.type,
//         length: updatedProfileData.length,
//         width: updatedProfileData.width,
//         height: updatedProfileData.height,
//         year: updatedProfileData.year,
//         model: updatedProfileData.model,
//         make: updatedProfileData.make,
//         aboutAcco: updatedProfileData.aboutAcco,
//       });
//     }
//   }, [updatedProfileData]);

//   return (
//     <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1, marginTop: 4 }}>
//       <Typography variant="h4" gutterBottom>Accommodation Details</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <img
//             src={RVimage}
//             style={{ width: "100%", borderRadius: "20px", height: "230px" }}
//             alt="Accommodation"
//           />
//         </Grid>
//         <Grid item xs={12} sm={5}>
//           <Typography variant="body1"><strong>Type:</strong> {accommodationFormData.type}</Typography>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="body1"><strong>Length:</strong> {accommodationFormData.length} ft</Typography>
//             <Typography variant="body1"><strong>Width:</strong> {accommodationFormData.width} ft</Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="body1"><strong>Height:</strong> {accommodationFormData.height} ft</Typography>
//             <Typography variant="body1"><strong>Year:</strong> {accommodationFormData.year}</Typography>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="body1"><strong>Model:</strong> {accommodationFormData.model}</Typography>
//             <Typography variant="body1"><strong>Make:</strong> {accommodationFormData.make}</Typography>
//           </Box>
//           <Typography variant="body1"><strong>About:</strong> {accommodationFormData.aboutAcco}</Typography>
//           <EditButton variant="contained" onClick={handleEdit}>Edit</EditButton>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ShowAccommodation;


import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import RVimage from "../../images/vehicle.jpg"; // Adjust the import path as necessary
import { useNavigate, useLocation } from "react-router-dom";

const EditButton = styled(Button)({
  backgroundColor: "#FDA117",
  padding: "10px 20px",
  height: "30px",
  minWidth: "fit-content",
  marginTop: "1em",
});

export interface AccommodationInterface {
  type: string;
  length: number;
  width: number;
  height: number;
  year: number;
  model: string;
  make: string;
  aboutAcco: string;
}

interface ShowAccomodationProps {
  userAccomodation: AccommodationInterface | null;
}

const ShowAccommodation: React.FC<ShowAccomodationProps> = ({ userAccomodation }) => {
  const location = useLocation();
  const updatedProfileData = location.state as AccommodationInterface;

  const [accommodationFormData, setAccommodationFormData] = useState<AccommodationInterface>({
    type: updatedProfileData?.type || '',
    length: updatedProfileData?.length || 0,
    width: updatedProfileData?.width || 0,
    height: updatedProfileData?.height || 0,
    year: updatedProfileData?.year || 0,
    model: updatedProfileData?.model || '',
    make: updatedProfileData?.make || '',
    aboutAcco: updatedProfileData?.aboutAcco || '',
  });

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editaccommodation", { state: updatedProfileData });
  };

  useEffect(() => {
    if (updatedProfileData) {
      setAccommodationFormData({
        type: updatedProfileData.type,
        length: updatedProfileData.length,
        width: updatedProfileData.width,
        height: updatedProfileData.height,
        year: updatedProfileData.year,
        model: updatedProfileData.model,
        make: updatedProfileData.make,
        aboutAcco: updatedProfileData.aboutAcco,
      });
    }
  }, [updatedProfileData]);

  return (
    <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Accommodation</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={RVimage}
            style={{ width: "100%", borderRadius: "20px", height: "230px" }}
            alt="Accommodation"
          />
        </Grid>
        <Grid item xs={12} sm={6} style= {{paddingRight: 100, paddingTop : 25}}>
          <Typography variant="body1"><strong>Type:</strong> {accommodationFormData.type}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1"><strong>Length:</strong> {accommodationFormData.length} ft</Typography>
            <Typography variant="body1"><strong>Width:</strong> {accommodationFormData.width} ft</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1"><strong>Height:</strong> {accommodationFormData.height} ft</Typography>
            <Typography variant="body1"><strong>Year:</strong> {accommodationFormData.year}</Typography>
          </Box>
          <Typography variant="body1"><strong>Model:</strong> {accommodationFormData.model}</Typography>
          <Typography variant="body1"><strong>Make:</strong> {accommodationFormData.make}</Typography>
          <Typography variant="body1"><strong>About:</strong> {accommodationFormData.aboutAcco}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <EditButton variant="contained" onClick={handleEdit}>Edit</EditButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowAccommodation;
