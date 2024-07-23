import React, { useState } from "react";
import { styled, Box, ToggleButton, ToggleButtonGroup, IconButton, Toolbar, Paper, InputBase, Tooltip } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PetsIcon from '@mui/icons-material/Pets';
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
          <Tooltip title="WiFi" arrow>
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
          </Tooltip>
          <Tooltip title="Baths" arrow>
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
              <ShowerIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Restaurant" arrow>
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
              <TableRestaurantIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Pets" arrow>
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
          </Tooltip>
          <Tooltip title="Fast Food" arrow>
            <ToggleButton
              value="fastFood"
              aria-label="fastFood"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <FastfoodIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Fireplace" arrow>
            <ToggleButton
              value="fireplace"
              aria-label="fireplace"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <FireplaceIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Outdoor Grill" arrow>
            <ToggleButton
              value="outdoorGrill"
              aria-label="outdoorGrill"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <OutdoorGrillIcon />  
            </ToggleButton>
          </Tooltip>  
          <Tooltip title="Local Laundry" arrow>
            <ToggleButton
              value="localLaundry"
              aria-label="localLaundry"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <LocalLaundryServiceIcon />   
            </ToggleButton>
          </Tooltip>  
          <Tooltip title="Electrical Services" arrow>
            <ToggleButton
              value="electricalServices"
              aria-label="electricalServices"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <ElectricalServicesIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Local Gas Station" arrow>
            <ToggleButton
              value="localGasStation"
              aria-label="localGasStation"
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "darkorange",
                  color: "white",
                },
              }}
            >
              <LocalGasStationIcon />    
            </ToggleButton>
          </Tooltip>
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
