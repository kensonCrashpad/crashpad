import React, { useState } from "react";
import { styled, Box, ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BathtubIcon from "@mui/icons-material/Bathtub";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import { Link } from "react-router-dom";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.1),
    border: 0,
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

interface SearchAndToggleBarProps {
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchAndToggleBar: React.FC<SearchAndToggleBarProps> = ({ selectedAmenities, setSelectedAmenities }) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newValue: "list" | "map") => {
    setViewMode(newValue);
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>, newToggle: string | string[]) => {
    setSelectedAmenities(typeof newToggle === "string" ? [newToggle] : newToggle);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "110px",
        gap: "8px",
        backgroundColor: "white",
      }}
    >
      <IconButton aria-label="filter list">
        <FilterListIcon />
      </IconButton>
      <StyledToggleButtonGroup size="small" value={selectedAmenities} onChange={handleToggle}>
        <ToggleButton
          value="wifi"
          aria-label="wifi"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
          }}
        >
          <WifiIcon />
        </ToggleButton>
        <ToggleButton
          value="baths"
          aria-label="baths"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
          }}
        >
          <BathtubIcon />
        </ToggleButton>
        <ToggleButton
          value="restaurant"
          aria-label="restaurant"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
          }}
        >
          <RestaurantIcon />
        </ToggleButton>
        <ToggleButton
          value="pets"
          aria-label="pets"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
          }}
        >
          <PetsIcon />
        </ToggleButton>
        <ToggleButton
          value="electric"
          aria-label="electric"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
          }}
        >
          <ElectricCarIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
          <Link to="../dashboard">
            <ToggleButton value="list" sx={{ height: "30px", padding: "0px 10px" }}>
              List
            </ToggleButton>
          </Link>
          <Link to="../map">
            <ToggleButton value="map" sx={{ height: "30px", padding: "0px 10px" }}>
              Map
            </ToggleButton>
          </Link>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default SearchAndToggleBar;
