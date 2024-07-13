import React, { useState } from "react";
import SideNav from "../NavBar/SideNav";
import SearchAndToggleBar from "./SearchAndToggleBar";
import UserSettings from "./UserSettings";
import PropertyGrid from "./PropertyGrid";

const Dashboard: React.FC = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <>
      <SideNav />
      <UserSettings />
      <SearchAndToggleBar
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        handleSearchResults={handleSearchResults}
      />
      <PropertyGrid selectedAmenities={selectedAmenities} properties={searchResults} />
    </>
  );
};

export default Dashboard;
