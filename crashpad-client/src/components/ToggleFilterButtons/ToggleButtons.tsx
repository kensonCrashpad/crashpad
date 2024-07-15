import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const FilterButtons = () => {
  const [alignment, setAlignment] = React.useState<string>("25"); // Explicitly define the type as string

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null // Define newAlignment as string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="25" aria-label="25">
        25+
      </ToggleButton>
      <ToggleButton value="50" aria-label="50">
        50+
      </ToggleButton>
      {/* Add more ToggleButtons here */}
    </ToggleButtonGroup>
  );
};

export default FilterButtons;
