import React, { useState , useEffect} from "react";
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
import { Link, useNavigate } from "react-router-dom";


const userStr = localStorage.getItem("user");
let username = "";
if (userStr) {
    const user = JSON.parse(userStr);
    username = user.username;
}


const UserSettings = () => {
  // State for menu anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Explicitly define the type for anchorEl
  const open = Boolean(anchorEl);


  // State for the user role
  const [role, setRole] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setRole(user.role);
    }
  }, []);


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

  return (
    <AppBar position="static" color="default" elevation={0}>
      
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <Typography variant="subtitle1" sx={{ marginRight: "5px" }}>
            Hello! {username}
          </Typography>
          <IconButton
            onClick={handleMenu}
            size="large"
            sx={{ marginRight: "10px" }}
          >
            <Avatar alt={username} src="/path-to-your-image.jpg" />
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
             {role === "HOST" ? (
              <MenuItem onClick={handleOpenHostProfile}>Host Profile</MenuItem>
            ) : (
              <MenuItem onClick={handleOpenTravelerProfile}>
                Traveler Profile
              </MenuItem>
            )}
            {/* <MenuItem onClick={handleOpenHostProfile}>Host Profile</MenuItem>
            <MenuItem onClick={handleOpenTravelerProfile}>
              Traveler Profile
            </MenuItem> */}
            <MenuItem onClick={handleOpenLogOut}>Logout</MenuItem>
          </Menu>
          <IconButton size="large" sx={{ marginRight: "20px" }}>
            <NotificationsIcon />
          </IconButton>
        </Box>
    
    </AppBar>
  );
};

export default UserSettings;
