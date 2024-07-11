// import React, { useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import ShowUserProfile from "./ShowUserProfile";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { FlashOffOutlined } from "@mui/icons-material";
// // import ResponsiveAppBar from "../Navbar";
// import Nav from "../NavBar/SideNav.tsx";
// import UserSettings from "../Dashboard/UserSettings.tsx";
// import RVimage from "../../images/vehicle.jpg";

// const LoginButton = styled(Button)({
//   marginTop: "1em",
// });

// const SideBySide = styled("div")({
//   display: "flex",
//   gap: "5px",
// });

// interface AccommodationFormState {
//   type: string;
//   length: number;
//   width: number;
//   height: number;
//   Year: number;
//   model:string
//   make:string
//   about: string;
// }

// const AccommodationEdit: React.FC = () => {
//   const [profileFormData, setProfileFormData] = useState<AccommodationFormState>({
//     type: "RV",
//     length: 20,
//     width: 10,
//     height: 15,
//     Year: 2024,
//     model:"Jayco",
//     make:"Seneca",
//     about: "I love traveling different places!"
//   });

//   const [errors, setErrors] = useState<any>();
//   const [showUserProfile, setShowUserProfile] = useState(false);

//   const validateForm = () => {
//     let newErrors: any = {};

//     if (!profileFormData.type) {
//       newErrors.userName = "type is required.";
//     }
//     if (!profileFormData.length) {
//       newErrors.firstName = "Length is required.";
//     }
//     if (!profileFormData.width) {
//       newErrors.lastName = "Width is required.";
//     }
//     if (!profileFormData.height) {
//       newErrors.age = "Height is required.";
//     }
//     if (!profileFormData.year) {
//       newErrors.age = "Year is required.";
//     }
//     if (!profileFormData.model) {
//       newErrors.age = "Model is required.";
//     }
//     if (!profileFormData.make) {
//         newErrors.age = "Make is required.";
//     }
//     if (!profileFormData.about) {
//         newErrors.age = "About is required.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const profileSubmitData = (e: any) => {
//     e.preventDefault();
//     setShowUserProfile(false);

//     const isValid = validateForm();

//     if (isValid) {
//       console.log("Form validation", profileFormData);
//     } else {
//       setShowUserProfile(true);
//       console.log("Form validation failed");
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     setProfileFormData({ ...profileFormData, [name]: value });
//   };

//   return (
//     <>
//       <UserSettings />
//       <Nav />
//       <Grid container spacing={2} marginTop={"1em"} marginLeft={"7em"}>
//         <Grid xs={4}>
//           <img
//             src={RVimage}
//             // style={{ width: "100%", borderRadius: "20px" }}
//             style={{ width: "100%", borderRadius: "20px", height: "350px" }}
//           />
//         </Grid>
//         {
//           <Grid sx={{ mr: 2, ml: 2 }}>
//             <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
//               <TextField
//                 fullWidth
//                 name="userName"
//                 value={profileFormData.type}
//                 margin="normal"
//                 id="userName"
//                 label="Username"
//                 variant="outlined"
//                 onChange={handleChange}
//                 helperText={errors ? errors.userName : ""}
//               />
//               <SideBySide>
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   id="firstName"
//                   label="First Name"
//                   variant="outlined"
//                   name="firstName"
//                   value={profileFormData.length}
//                   onChange={handleChange}
//                   helperText={errors ? errors.firstName : ""}
//                 />
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   id="lastName"
//                   label="Last Name"
//                   variant="outlined"
//                   name="lastName"
//                   value={profileFormData.lastName}
//                   onChange={handleChange}
//                   helperText={errors ? errors.lastName : ""}
//                 />
//               </SideBySide>
//               <SideBySide>
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   id="age"
//                   label="Age"
//                   variant="outlined"
//                   name="age"
//                   value={profileFormData.age}
//                   onChange={handleChange}
//                   helperText={errors ? errors.age : ""}
//                 />

//                 <FormControl fullWidth style={{ marginTop: "15px" }}>
//                   <InputLabel id="demo-simple-select-label">Gender</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     name="gender"
//                     value={profileFormData.gender}
//                     label="Gender"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </SideBySide>

//               <TextField
//                 fullWidth
//                 placeholder="Tell me about yourself..."
//                 multiline
//                 margin="normal"
//                 id="aboutMe"
//                 label="About Me"
//                 variant="outlined"
//                 name="aboutMe"
//                 value={profileFormData.aboutMe}
//                 onChange={handleChange}
//                 rows={2}
//                 maxRows={4}
//                 helperText={errors ? errors.aboutMe : ""}
//               />

//               <LoginButton
//                 fullWidth
//                 variant="contained"
//                 style={{ backgroundColor: "#FDA117" }}
//                 onClick={profileSubmitData}
//               >
//                 Submit
//               </LoginButton>
//               <Typography
//                 variant="body2"
//                 style={{ marginTop: "1em" }}
//               ></Typography>
//             </form>
//           </Grid>
//         }
//       </Grid>
//     </>
//   );
// };

// export default AccommodationEdit;


// import React, { useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import ShowUserProfile from "./ShowUserProfile";
// import InputLabel from "@mui/material/InputLabel";
// // import MenuItem from "@mui/material/MenuItem;
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Nav from "../NavBar/SideNav.tsx";
// import UserSettings from "../Dashboard/UserSettings.tsx";
// import RVimage from "../../images/vehicle.jpg";

// const LoginButton = styled(Button)({
//   marginTop: "1em",
// });

// const SideBySide = styled("div")({
//   display: "flex",
//   gap: "5px",
// });

// interface AccommodationFormState {
//   type: string;
//   length: number;
//   width: number;
//   height: number;
//   year: number;
//   model: string;
//   make: string;
//   about: string;
// }

// const AccommodationEdit: React.FC = () => {
//   const [profileFormData, setProfileFormData] = useState<AccommodationFormState>({
//     type: "RV",
//     length: 20,
//     width: 10,
//     height: 15,
//     year: 2024,
//     model: "Jayco",
//     make: "Seneca",
//     about: "I love traveling different places!",
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [showUserProfile, setShowUserProfile] = useState(false);

//   const validateForm = () => {
//     let newErrors: any = {};

//     if (!profileFormData.type) {
//       newErrors.type = "Type is required.";
//     }
//     if (!profileFormData.length) {
//       newErrors.length = "Length is required.";
//     }
//     if (!profileFormData.width) {
//       newErrors.width = "Width is required.";
//     }
//     if (!profileFormData.height) {
//       newErrors.height = "Height is required.";
//     }
//     if (!profileFormData.year) {
//       newErrors.year = "Year is required.";
//     }
//     if (!profileFormData.model) {
//       newErrors.model = "Model is required.";
//     }
//     if (!profileFormData.make) {
//       newErrors.make = "Make is required.";
//     }
//     if (!profileFormData.about) {
//       newErrors.about = "About is required.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const profileSubmitData = (e: any) => {
//     e.preventDefault();
//     setShowUserProfile(false);

//     const isValid = validateForm();

//     if (isValid) {
//       console.log("Form validation", profileFormData);
//     } else {
//       setShowUserProfile(true);
//       console.log("Form validation failed");
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setProfileFormData({ ...profileFormData, [name]: value });
//   };

//   return (
//     <>
//       <UserSettings />
//       <Nav />
//       <Grid container spacing={2} marginTop={"1em"} marginLeft={"7em"}>
//         <Grid item xs={4}>
//           <img
//             src={RVimage}
//             style={{ width: "100%", borderRadius: "20px", height: "350px" }}
//             alt="RV"
//           />
//         </Grid>
//         <Grid item xs={8} sx={{ mr: 2, ml: 2 }}>
//           <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
//             <TextField
//               fullWidth
//               name="type"
//               value={profileFormData.type}
//               margin="normal"
//               id="type"
//               label="Type"
//               variant="outlined"
//               onChange={handleChange}
//               helperText={errors.type || ""}
//             />
//             <SideBySide>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="length"
//                 label="Length"
//                 variant="outlined"
//                 name="length"
//                 value={profileFormData.length}
//                 onChange={handleChange}
//                 helperText={errors.length || ""}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="width"
//                 label="Width"
//                 variant="outlined"
//                 name="width"
//                 value={profileFormData.width}
//                 onChange={handleChange}
//                 helperText={errors.width || ""}
//               />
//             </SideBySide>
//             <SideBySide>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="height"
//                 label="Height"
//                 variant="outlined"
//                 name="height"
//                 value={profileFormData.height}
//                 onChange={handleChange}
//                 helperText={errors.height || ""}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="year"
//                 label="Year"
//                 variant="outlined"
//                 name="year"
//                 value={profileFormData.year}
//                 onChange={handleChange}
//                 helperText={errors.year || ""}
//               />
//             </SideBySide>
//             <SideBySide>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="model"
//                 label="Model"
//                 variant="outlined"
//                 name="model"
//                 value={profileFormData.model}
//                 onChange={handleChange}
//                 helperText={errors.model || ""}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 id="make"
//                 label="Make"
//                 variant="outlined"
//                 name="make"
//                 value={profileFormData.make}
//                 onChange={handleChange}
//                 helperText={errors.make || ""}
//               />
//             </SideBySide>
//             <TextField
//               fullWidth
//               placeholder="Tell me about yourself..."
//               multiline
//               margin="normal"
//               id="about"
//               label="About"
//               variant="outlined"
//               name="about"
//               value={profileFormData.about}
//               onChange={handleChange}
//               rows={2}
//               maxRows={4}
//               helperText={errors.about || ""}
//             />
//             <LoginButton
//               fullWidth
//               variant="contained"
//               style={{ backgroundColor: "#FDA117" }}
//               onClick={profileSubmitData}
//             >
//               Submit
//             </LoginButton>
//             <Typography
//               variant="body2"
//               style={{ marginTop: "1em" }}
//             ></Typography>
//           </form>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default AccommodationEdit;


import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import UserSettings from "../Dashboard/UserSettings";
import Nav from "../NavBar/SideNav";
import RVimage from "../../images/vehicle.jpg";

const LoginButton = styled(Button)({
  marginTop: "1em",
});

const SideBySide = styled("div")({
  display: "flex",
  gap: "5px",
});

interface AccommodationFormState {
  type: string;
  length: number;
  width: number;
  height: number;
  year: number;
  model: string;
  make: string;
  about: string;
}

const AccommodationEdit: React.FC = () => {
  const [profileFormData, setProfileFormData] = useState<AccommodationFormState>({
    type: "RV",
    length: 20,
    width: 10,
    height: 15,
    year: 2024,
    model: "Jayco",
    make: "Seneca",
    about: "I love traveling different places!",
  });

  const [errors, setErrors] = useState<any>({});
  const [showUserProfile, setShowUserProfile] = useState(false);

  const validateForm = () => {
    let newErrors: any = {};

    if (!profileFormData.type) {
      newErrors.type = "Type is required.";
    }
    if (!profileFormData.length) {
      newErrors.length = "Length is required.";
    }
    if (!profileFormData.width) {
      newErrors.width = "Width is required.";
    }
    if (!profileFormData.height) {
      newErrors.height = "Height is required.";
    }
    if (!profileFormData.year) {
      newErrors.year = "Year is required.";
    }
    if (!profileFormData.model) {
      newErrors.model = "Model is required.";
    }
    if (!profileFormData.make) {
      newErrors.make = "Make is required.";
    }
    if (!profileFormData.about) {
      newErrors.about = "About is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const profileSubmitData = (e: any) => {
    e.preventDefault();
    setShowUserProfile(false);

    const isValid = validateForm();

    if (isValid) {
      console.log("Form validation", profileFormData);
    } else {
      setShowUserProfile(true);
      console.log("Form validation failed");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  return (
    <>
      <UserSettings />
      <Nav />
      <Grid container spacing={2} marginTop={"1em"} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <img
            src={RVimage}
            style={{ width: "100%", borderRadius: "20px", height: "auto" }}
            alt="RV"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete="off" onSubmit={profileSubmitData}>
            <TextField
              // fullWidth
              name="type"
              value={profileFormData.type}
              margin="normal"
              id="type"
              label="Type"
              variant="outlined"
              onChange={handleChange}
              helperText={errors.type || ""}
            />
            <SideBySide>
              <TextField
                // fullWidth
                margin="normal"
                id="length"
                label="Length"
                variant="outlined"
                name="length"
                value={profileFormData.length}
                onChange={handleChange}
                helperText={errors.length || ""}
              />
              <TextField
                // fullWidth
                margin="normal"
                id="width"
                label="Width"
                variant="outlined"
                name="width"
                value={profileFormData.width}
                onChange={handleChange}
                helperText={errors.width || ""}
              />
            </SideBySide>
            <SideBySide>
              <TextField
                // fullWidth
                margin="normal"
                id="height"
                label="Height"
                variant="outlined"
                name="height"
                value={profileFormData.height}
                onChange={handleChange}
                helperText={errors.height || ""}
              />
              <TextField
                // fullWidth
                margin="normal"
                id="year"
                label="Year"
                variant="outlined"
                name="year"
                value={profileFormData.year}
                onChange={handleChange}
                helperText={errors.year || ""}
              />
            </SideBySide>
            <SideBySide>
              <TextField
                // fullWidth
                margin="normal"
                id="model"
                label="Model"
                variant="outlined"
                name="model"
                value={profileFormData.model}
                onChange={handleChange}
                helperText={errors.model || ""}
              />
              <TextField
                // fullWidth
                margin="normal"
                id="make"
                label="Make"
                variant="outlined"
                name="make"
                value={profileFormData.make}
                onChange={handleChange}
                helperText={errors.make || ""}
              />
            </SideBySide>
            <TextField
              fullWidth
              placeholder="Tell me about yourself..."
              multiline
              margin="normal"
              id="about"
              label="About"
              variant="outlined"
              name="about"
              value={profileFormData.about}
              onChange={handleChange}
              rows={2}
              maxRows={4}
              helperText={errors.about || ""}
            />
            <LoginButton
              // fullWidth
              variant="contained"
              style={{ backgroundColor: "#FDA117" }}
              onClick={profileSubmitData}
            >
              Submit
            </LoginButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AccommodationEdit;
