import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logoImage from "../../images/CPlogo.png";

const activeColor = '#FFA726';
const defaultColor = '#808080';

interface StyledListItemProps {
  active: boolean;
  component?: React.ElementType;
  to?: string;
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active'
})<StyledListItemProps>(({ theme, active }) => ({
  justifyContent: "center",
  backgroundColor: active ? theme.palette.action.selected : "inherit",
  '&:hover': {
    '& .MuiListItemIcon-root': {
      color: activeColor, 
      transform: 'scale(1.2)', 
    },
  },
}));

interface StyledListItemIconProps {
  active: boolean;
}

const StyledListItemIcon = styled(ListItemIcon)<StyledListItemIconProps>(({ active }) => ({
  minWidth: "initial",
  padding: "10px",
  color: active ? activeColor : defaultColor,
  transform: active ? 'scale(1.2)' : 'scale(1)',
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
  const handleLogout = () => {
    navigate("/login");
    console.log("User logged out");
  };

  const links = [
    { to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/", icon: <HomeIcon />, label: "Home" },
    { to: "/favorites", icon: <FavoriteIcon />, label: "Favorites" },
    // { to: "/messages", icon: <EmailIcon />, label: "Messages" },
    { to: "/trips", icon: <EventIcon />, label: "Trips" },
    { to: "/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{'& .MuiPaper-root': { backgroundColor: '#f5f5f5'},}}>
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
            <StyledListItem
              component={Link}
              to={link.to}
              active={location.pathname === link.to}
            >
              <StyledListItemIcon active={location.pathname === link.to}>
                {link.icon}
              </StyledListItemIcon>
            </StyledListItem>
          </Tooltip>
        ))}
        <Divider />
        <Tooltip title="Logout" placement="right">
          <StyledListItem onClick={handleLogout} active={false}>
            <StyledListItemIcon active={false}>
              <LogoutIcon />
            </StyledListItemIcon>
          </StyledListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default SideNav;