import React, { useState } from "react";
import { styled, Box, ToggleButton, ToggleButtonGroup, IconButton, Toolbar, Paper, InputBase } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BathtubIcon from "@mui/icons-material/Bathtub";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PropertyService from "../../services/property/propertyService";

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
  handleSearchResults: (results: any[]) => void; // Function to handle search results
}

const SearchAndToggleBar: React.FC<SearchAndToggleBarProps> = ({ selectedAmenities, setSelectedAmenities, handleSearchResults }) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [search, setSearch] = useState("");

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newValue: "list" | "map") => {
    setViewMode(newValue);
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>, newToggle: string | string[]) => {
    setSelectedAmenities(typeof newToggle === "string" ? [newToggle] : newToggle);
  };

  const handleSearchProperties = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const results = await PropertyService.searchProperties(search);
      handleSearchResults(results); // Update search results in parent component
      console.log('Properties found:', results);
    } catch (error) {
      console.error('Error searching properties:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Toolbar>
      <Paper
        component="form"
        onSubmit={handleSearchProperties}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          marginLeft : "82px",
          marginTop : "-125px"
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Start your Search"
          value={search}
          onChange={handleSearch}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          alignItems: "center",
          paddingLeft: "93px",
          gap: "8px",
          backgroundColor: "white",
        }}
      >

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
        </Box>
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
    </Toolbar>
  );
};

export default SearchAndToggleBar;
