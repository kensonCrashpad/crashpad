// import React, { useState } from "react";
// import {
//   styled,
//   Box,
//   InputBase,
//   ToggleButton,
//   ToggleButtonGroup,
//   IconButton,
//   Paper,
//   Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import PoolIcon from "@mui/icons-material/Pool";
// import BathtubIcon from "@mui/icons-material/Bathtub";
// import LocalBarIcon from "@mui/icons-material/LocalBar";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import WifiIcon from "@mui/icons-material/Wifi";
// import PetsIcon from "@mui/icons-material/Pets";
// import ElectricCarIcon from "@mui/icons-material/ElectricCar";
// import { Link } from "react-router-dom";

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//   "& .MuiToggleButtonGroup-grouped": {
//     margin: theme.spacing(0.1),
//     border: 0,
//     "&:not(:first-of-type)": {
//       borderRadius: theme.shape.borderRadius,
//     },
//     "&:first-of-type": {
//       borderRadius: theme.shape.borderRadius,
//     },
//   },
// }));

// const SearchAndToggleBar = () => {
//   const [search, setSearch] = useState("");
//   const [selectedToggle, setSelectedToggle] = useState(null);
//   const [selectedToggles, setSelectedToggles] = useState([]);
//   const [viewMode, setViewMode] = useState<"list" | "map">("list");

//   const handleViewModeChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newValue: "list" | "map"
//   ) => {
//     setViewMode(newValue);
//   };

//   const handleToggle = (event, newToggle) => {
//     setSelectedToggles(newToggle);
//   };
//   const toggleStyle = {
//     "&.MuiToggleButton-root": {
//       color: "black",
//       border: "none",
//       marginRight: "8px",
//       "&.Mui-selected": {
//         backgroundColor: "darkorange",
//         color: "white",
//         "&:hover": {
//           backgroundColor: "darkorange",
//         },
//       },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         paddingLeft: "110px",
//         gap: "8px",
//         backgroundColor: "white",
//       }}
//     >
//       <IconButton aria-label="filter list">
//         <FilterListIcon />
//       </IconButton>
//       <StyledToggleButtonGroup
//         size="small"
//         value={selectedToggles}
//         onChange={handleToggle}
//         sx={toggleStyle}
//       >
//         <ToggleButton
//           value="baths"
//           aria-label="baths"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//             ml: 2,
//           }}
//         >
//           <BathtubIcon />
//         </ToggleButton>

//         <ToggleButton
//           value="restaurant"
//           aria-label="restaurant"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//           }}
//         >
//           <RestaurantIcon />
//         </ToggleButton>
//         <ToggleButton
//           value="wifi"
//           aria-label="wifi"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//           }}
//         >
//           <WifiIcon />
//         </ToggleButton>
//         <ToggleButton
//           value="pets"
//           aria-label="pets"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//           }}
//         >
//           <PetsIcon />
//         </ToggleButton>
//         <ToggleButton
//           value="electric"
//           aria-label="electric"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//           }}
//         >
//           <ElectricCarIcon />
//         </ToggleButton>
//         <ToggleButton
//           value="50A"
//           aria-label="50A"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//             fontWeight: "bold",
//             fontSize: "1rem",
//           }}
//         >
//           50A
//         </ToggleButton>
//         <ToggleButton
//           value="30A"
//           aria-label="30A"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//             fontWeight: "bold",
//             fontSize: "1rem",
//           }}
//         >
//           30A
//         </ToggleButton>
//         <ToggleButton
//           value="15A"
//           aria-label="15A"
//           sx={{
//             "&.Mui-selected, &.Mui-selected:hover": {
//               backgroundColor: "darkorange",
//               color: "white",
//             },
//             fontWeight: "bold",
//             fontSize: "1rem",
//           }}
//         >
//           15A
//         </ToggleButton>
//       </StyledToggleButtonGroup>
//       <Box
//         sx={{
//           marginLeft: "auto",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         <ToggleButtonGroup
//           value={viewMode}
//           exclusive
//           onChange={handleViewModeChange}
//         >
//           <Link to="../dashboard">
//             <ToggleButton
//               value="list"
//               sx={{ height: "30px", padding: "0px 10px" }}
//             >
//               List
//             </ToggleButton>
//           </Link>
//           <Link to="../map">
//             <ToggleButton
//               value="map"
//               sx={{ height: "30px", padding: "0px 10px" }}
//             >
//               Map
//             </ToggleButton>
//           </Link>
//         </ToggleButtonGroup>
//       </Box>
//     </Box>
//   );
// };

// export default SearchAndToggleBar;

import React, { useState } from "react";
import {
  styled,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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

const SearchAndToggleBar = () => {
  const [selectedToggles, setSelectedToggles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "list" | "map"
  ) => {
    setViewMode(newValue);
  };

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | string[]
  ) => {
    setSelectedToggles(typeof newToggle === "string" ? [newToggle] : newToggle);
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
      <StyledToggleButtonGroup
        size="small"
        value={selectedToggles}
        onChange={handleToggle}
      >
        <ToggleButton
          value="baths"
          aria-label="baths"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
            ml: 2,
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
        <ToggleButton
          value="50A"
          aria-label="50A"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          50A
        </ToggleButton>
        <ToggleButton
          value="30A"
          aria-label="30A"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          30A
        </ToggleButton>
        <ToggleButton
          value="15A"
          aria-label="15A"
          sx={{
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "darkorange",
              color: "white",
            },
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          15A
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
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
        >
          <Link to="../dashboard">
            <ToggleButton
              value="list"
              sx={{ height: "30px", padding: "0px 10px" }}
            >
              List
            </ToggleButton>
          </Link>
          <Link to="../map">
            <ToggleButton
              value="map"
              sx={{ height: "30px", padding: "0px 10px" }}
            >
              Map
            </ToggleButton>
          </Link>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default SearchAndToggleBar;
