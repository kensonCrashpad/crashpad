import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logoImage from "../../images/CPlogo.png";

const activeColor = "#FFA726";
const defaultColor = "#808080";

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active, theme }) => ({
  justifyContent: "center",
  ...(active && {
    backgroundColor: theme.palette.action.selected,
    "& .MuiListItemIcon-root": {
      color: activeColor,
      transform: "scale(1.2)",
    },
  }),
  "&:hover": {
    "& .MuiListItemIcon-root": {
      color: activeColor,
      transform: "scale(1.2)",
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "initial",
  padding: "10px",
  color: defaultColor,
  transition: "color 0.3s, transform 0.3s",
}));

const DrawerHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
});

const SideNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    navigate("/login");
    console.log("User logged out");
  };

  const links = [
    { to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/", icon: <HomeIcon />, label: "Home" },
    { to: "/favorites", icon: <FavoriteIcon />, label: "Favorites" },
    { to: "/messages", icon: <EmailIcon />, label: "Messages" },
    { to: "/trips", icon: <EventIcon />, label: "Trips" },
    { to: "/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <DrawerHeader>
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "80px", maxHeight: "80px" }}
        />
      </DrawerHeader>
      <Divider />
      <List>
        {links.map((link) => (
          <Tooltip title={link.label} key={link.to} placement="right">
            <Link to={link.to}>
              <StyledListItem
                role="button" // Set the role to "button"
                active={location.pathname === link.to}
              >
                <StyledListItemIcon />
                {link.icon}
              </StyledListItem>
            </Link>
          </Tooltip>
        ))}
        <Divider />
        <Tooltip title="Logout" placement="right">
          <ListItem button onClick={handleLogout}>
            <StyledListItemIcon />
            <LogoutIcon />
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default SideNav;