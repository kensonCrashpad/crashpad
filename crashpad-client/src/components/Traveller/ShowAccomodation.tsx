// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import RVimage from "../../images/vehicle.jpg";
// import { useNavigate } from "react-router-dom";

// const EditButton = styled(Button)({
//   backgroundColor: "#FDA117",
//   padding: "10px 20px",
//   height: "30px",
//   minWidth: "fit-content",
//   marginTop: "1em",
// });

// interface AccommodationInterface {
//   type: string;
//   length: number;
//   width: number;
//   height: number;
//   year: number;
//   model: string;
//   make: string;
//   aboutAcco: string;
// }

// const ShowAccommodation: React.FC = () => {
//   const [accommodationFormData, setAccommodationFormData] = useState<AccommodationInterface>({
//     type: "RV",
//     length: 20,
//     width: 10,
//     height: 15,
//     year: 2024,
//     model: "Jayco",
//     make: "Seneca",
//     aboutAcco: "This is the best RV to travel!",
//   });

//   const navigate = useNavigate();

//   const handleEdit = () => {
//     navigate("/editaccommodation");
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <h3>Accommodation Details</h3>
//       </Grid>
//       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//         <img
//           src={RVimage}
//           style={{ width: "100%", borderRadius: "20px", height: "250px" }}
//           alt="Accommodation"
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//         <p>
//           <span style={{ fontSize: "16px", fontWeight: "bold" }}>Type: </span>
//           {accommodationFormData.type}
//         </p>
//         <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Length: </span>
//             {accommodationFormData.length} ft
//           </p>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Width: </span>
//             {accommodationFormData.width} ft
//           </p>
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Height: </span>
//             {accommodationFormData.height} ft
//           </p>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Year: </span>
//             {accommodationFormData.year}
//           </p>
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Model: </span>
//             {accommodationFormData.model}
//           </p>
//           <p>
//             <span style={{ fontSize: "16px", fontWeight: "bold" }}>Make: </span>
//             {accommodationFormData.make}
//           </p>
//         </div>
//         <p>
//           <span style={{ fontSize: "16px", fontWeight: "bold" }}>About: </span>
//           {accommodationFormData.aboutAcco}
//         </p>
//         <EditButton variant="contained" onClick={handleEdit}>
//           Edit
//         </EditButton>
//       </Grid>
//     </Grid>
//   );
// };

// export default ShowAccommodation;


// import React, { useState } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import RVimage from "../../images/vehicle.jpg";
// import { useNavigate,useLocation } from "react-router-dom";

// const EditButton = styled(Button)({
//   backgroundColor: "#FDA117",
//   padding: "10px 20px",
//   height: "30px",
//   minWidth: "fit-content",
//   marginTop: "1em",
// });

// interface AccommodationInterface {
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
//   userAccomodation: userAccomodation | null;
// }

// const ShowAccommodation: React.FC<ShowAccomodationProps> = (userAccomodation) => {
//   const location = useLocation();
//   const updatedProfileData = location.state;

//   const [accommodationFormData, setAccommodationFormData] = useState<AccommodationInterface>({
//     type: "RV",
//     length: 20,
//     width: 10,
//     height: 15,
//     year: 2024,
//     model: "Jayco",
//     make: "Seneca",
//     aboutAcco: "This is the best RV to travel!",
//   });

//   const navigate = useNavigate();

//   const handleEdit = () => {
//     navigate("/editaccommodation");
//   };

//   return (
//     <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1, marginTop: 4 }}>
//       <Typography variant="h4" gutterBottom>Accommodation Details</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <img
//             src={RVimage}
//             style={{ width: "100%", borderRadius: "20px", height: "250px", objectFit: "cover" }}
//             alt="Accommodation"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
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

interface AccommodationInterface {
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

const ShowAccommodation: React.FC<ShowAccomodationProps> = (userAccomodation) => {
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
      <Typography variant="h4" gutterBottom>Accommodation Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={RVimage}
            style={{ width: "100%", borderRadius: "20px", height: "250px", objectFit: "cover" }}
            alt="Accommodation"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Type:</strong> {accommodationFormData.type}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1"><strong>Length:</strong> {accommodationFormData.length} ft</Typography>
            <Typography variant="body1"><strong>Width:</strong> {accommodationFormData.width} ft</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1"><strong>Height:</strong> {accommodationFormData.height} ft</Typography>
            <Typography variant="body1"><strong>Year:</strong> {accommodationFormData.year}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1"><strong>Model:</strong> {accommodationFormData.model}</Typography>
            <Typography variant="body1"><strong>Make:</strong> {accommodationFormData.make}</Typography>
          </Box>
          <Typography variant="body1"><strong>About:</strong> {accommodationFormData.aboutAcco}</Typography>
          <EditButton variant="contained" onClick={handleEdit}>Edit</EditButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowAccommodation;
