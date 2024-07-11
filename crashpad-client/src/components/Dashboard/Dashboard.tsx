import React, { useState } from "react";
import SideNav from "../NavBar/SideNav";
import SearchAndToggleBar from "./SearchAndToggleBar";
import UserSettings from "./UserSettings";
import PropertyGrid from "./PropertyGrid";

// Dashboard component
const Dashboard: React.FC = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  return (
    <>
      <SideNav />
      <UserSettings />
      <SearchAndToggleBar selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities} />
      <PropertyGrid selectedAmenities={selectedAmenities} />
    </>
  );
};

export default Dashboard;
