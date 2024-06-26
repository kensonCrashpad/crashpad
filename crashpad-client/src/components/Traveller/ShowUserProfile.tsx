// import React, { useState, useEffect } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Myprofile from "./Myprofile.png";
// import { useNavigate } from "react-router-dom";
// import { UserProfile } from './UserProfile';


// const EditButton = styled(Button)({
//   backgroundColor: "#FDA117",
//   padding: "10px 20px",
//   height: "30px",
//   minWidth: "fit-content",
//   marginTop: "1em",
// });

// interface UserFormState {
//   userName: string;
//   firstName: string;
//   lastName: string;
//   age: number;
//   gender: string;
//   phone: number;
//   aboutMe: string;
// }

// interface ShowUserProfileProps {
//   userProfile: UserProfile | null;
// }

// const ShowUserProfile: React.FC<ShowUserProfileProps> = ({ userProfile }) => {
//   const [profileFormData, setProfileFormData] = useState<UserFormState>({
//     userName: userProfile?.username || '',
//     firstName: userProfile?.firstName || '',
//     lastName: userProfile?.lastName || '',
//     age: userProfile?.age || 0,
//     gender: userProfile?.gender || '',
//     phone: Number(userProfile?.phone) || 0, // Convert to number here
//     aboutMe: userProfile?.description || "",
//   });

//   const navigate = useNavigate();

//   const handleEdit = () => {
//     navigate("/editprofile", { state: userProfile });
//   };

//   useEffect(() => {
//     if (userProfile) {
//       console.log("UserProfile details printed from SHOW USER PROFILE FILE: ", userProfile);
//       setProfileFormData({
//         userName: userProfile.username,
//         firstName: userProfile.firstName,
//         lastName: userProfile.lastName,
//         age: userProfile.age,
//         gender: userProfile.gender,
//         phone: Number(userProfile.phone) || 0, 
//         aboutMe: userProfile.description || "I love traveling different places!",
//       });
//     }
//   }, [userProfile]);

//   return (
//     <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
//       <Typography variant="h4" gutterBottom>Traveller Details</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <img
//             src={Myprofile}
//             style={{ width: "100%", borderRadius: "20px", height: "230px", objectFit: "cover" }}
//             alt="Profile"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="body1"><strong>User Name:</strong> {profileFormData.userName}</Typography>
//           <Typography variant="body1"><strong>Name:</strong> {profileFormData.firstName} {profileFormData.lastName}</Typography>
//           <Typography variant="body1"><strong>Gender:</strong> {profileFormData.gender}</Typography>
//           <Typography variant="body1"><strong>Age:</strong> {profileFormData.age} years</Typography>
//           <Typography variant="body1"><strong>Phone:</strong> {profileFormData.phone}</Typography>
//           <Typography variant="body1"><strong>About:</strong> {profileFormData.aboutMe}</Typography>
//           <EditButton variant="contained" onClick={handleEdit}>Edit</EditButton>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ShowUserProfile;


import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Myprofile from "./Myprofile.png";
import { useNavigate, useLocation } from "react-router-dom";
import { UserProfile } from './UserProfile';

const EditButton = styled(Button)({
  backgroundColor: "#FDA117",
  padding: "10px 20px",
  height: "30px",
  minWidth: "fit-content",
  marginTop: "1em",
});

interface UserFormState {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: number;
  aboutMe: string;
}

interface ShowUserProfileProps {
  userProfile: UserProfile | null;
}

const ShowUserProfile: React.FC<ShowUserProfileProps> = ({ userProfile }) => {
  const location = useLocation();
  const updatedProfileData = location.state;

  const [profileFormData, setProfileFormData] = useState<UserFormState>({
    userName: updatedProfileData?.username || '',
    firstName: updatedProfileData?.firstName || '',
    lastName: updatedProfileData?.lastName || '',
    age: updatedProfileData?.age || 0,
    gender: updatedProfileData?.gender || '',
    phone: Number(updatedProfileData?.phone) || 0, // Convert to number here
    aboutMe: updatedProfileData?.aboutMe || "",
  });

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editprofile", { state: updatedProfileData });
  };

  useEffect(() => {
    if (updatedProfileData) {
      console.log("UserProfile details printed from SHOW USER PROFILE FILE: ", updatedProfileData);
      setProfileFormData({
        userName: updatedProfileData.username,
        firstName: updatedProfileData.firstName,
        lastName: updatedProfileData.lastName,
        age: updatedProfileData.age,
        gender: updatedProfileData.gender,
        phone: Number(updatedProfileData.phone) || 0, 
        aboutMe: updatedProfileData.aboutMe || "I love traveling different places!",
      });
    }
  }, [updatedProfileData]);

  return (
    <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Traveller Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={Myprofile}
            style={{ width: "100%", borderRadius: "20px", height: "230px", objectFit: "cover" }}
            alt="Profile"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>User Name:</strong> {profileFormData.userName}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {profileFormData.firstName} {profileFormData.lastName}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {profileFormData.gender}</Typography>
          <Typography variant="body1"><strong>Age:</strong> {profileFormData.age} years</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {profileFormData.phone}</Typography>
          <Typography variant="body1"><strong>About:</strong> {profileFormData.aboutMe}</Typography>
          <EditButton variant="contained" onClick={handleEdit}>Edit</EditButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowUserProfile;
