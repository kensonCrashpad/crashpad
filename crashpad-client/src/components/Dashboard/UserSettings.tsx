// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Paper,
//   InputBase,
//   Box,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link, useNavigate } from "react-router-dom";

// const UserSettings = () => {
//   // State for menu anchor
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // State for the search input
//   const [search, setSearch] = useState("");

//   // Handle opening the menu
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // Handle closing the menu
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const navigate = useNavigate();
//   const handleOpenHostProfile = () => {
//     navigate("/hostprofile");
//   };

//   const handleOpenTravelerProfile = () => {
//     navigate("/travelerprofile");
//   };

//   const handleOpenLogOut = () => {
//     navigate("/");
//   };

//   // Handle search input changes
//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//   };

//   return (
//     <AppBar position="static" color="default" elevation={0}>
//       <Toolbar
//         sx={{
//           justifyContent: "space-between",
//           pl: { sm: "100px", xs: "80px" },
//         }}
//       >
//         <Paper
//           component="form"
//           sx={{
//             p: "2px 4px",
//             display: "flex",
//             alignItems: "center",
//             borderRadius: "20px",
//             backgroundColor: "rgba(0, 0, 0, 0.05)",
//           }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Start your search"
//             value={search}
//             onChange={handleSearch}
//           />
//           <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
//             <SearchIcon />
//           </IconButton>
//         </Paper>
//         <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
//           <Typography variant="subtitle1" sx={{ marginRight: "5px" }}>
//             Hello! Kenson
//           </Typography>
//           <IconButton
//             onClick={handleMenu}
//             size="large"
//             sx={{ marginRight: "10px" }}
//           >
//             <Avatar alt="Kenson" src="/path-to-your-image.jpg" />
//             <ArrowDropDownIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             transformOrigin={{ vertical: "top", horizontal: "right" }}
//           >
//             <MenuItem onClick={handleOpenHostProfile}>Host Profile</MenuItem>
//             <MenuItem onClick={handleOpenTravelerProfile}>
//               Traveler Profile
//             </MenuItem>
//             <MenuItem onClick={handleOpenLogOut}>Logout</MenuItem>
//           </Menu>
//           <IconButton size="large" sx={{ marginRight: "20px" }}>
//             <NotificationsIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default UserSettings;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  InputBase,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const UserSettings = () => {
  // State for menu anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Explicitly define the type for anchorEl
  const open = Boolean(anchorEl);

  // State for the search input
  const [search, setSearch] = useState("");

  // Handle opening the menu
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleOpenHostProfile = () => {
    navigate("/hostprofile");
  };

  const handleOpenTravelerProfile = () => {
    navigate("/travelerprofile");
  };

  const handleOpenLogOut = () => {
    navigate("/");
  };

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          pl: { sm: "100px", xs: "80px" },
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Start your search"
            value={search}
            onChange={handleSearch}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <Typography variant="subtitle1" sx={{ marginRight: "5px" }}>
            Hello! Kenson
          </Typography>
          <IconButton
            onClick={handleMenu}
            size="large"
            sx={{ marginRight: "10px" }}
          >
            <Avatar alt="Kenson" src="/path-to-your-image.jpg" />
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleOpenHostProfile}>Host Profile</MenuItem>
            <MenuItem onClick={handleOpenTravelerProfile}>
              Traveler Profile
            </MenuItem>
            <MenuItem onClick={handleOpenLogOut}>Logout</MenuItem>
          </Menu>
          <IconButton size="large" sx={{ marginRight: "20px" }}>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserSettings;
