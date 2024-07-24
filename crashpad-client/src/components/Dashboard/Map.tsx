import React, { useEffect, useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoogleMaps } from "../Maps";
import SideNav from "../NavBar/SideNav";
import UserSettings from "./UserSettings";
import PropertyService from "../../services/property/propertyService";
import PropertyModal from "./PropertyModal"; 

interface PropertyResponseDTO {
  latitude?: number;
  longitude?: number;
}

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <Container>{children}</Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 80vw;
  margin-left: 10rem;
`;

const Map = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [locations, setLocations] = useState<ReadonlyArray<{ location: google.maps.LatLngLiteral; property: any }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null); // Replace with your property type
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "list" | "map"
  ) => {
    setViewMode(newValue);
  };

  const handleMarkerClick = (property: any) => {
    console.log("Marker clicked:", property);
    setSelectedProperty(property);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const propertiesData: PropertyResponseDTO[] = await PropertyService.fetchProperties();
        const locations = propertiesData
          .filter((property) => property.latitude != null && property.longitude != null) // Adjusted check
          .map((property) => ({
            location: { lat: property.latitude!, lng: property.longitude! },
            property,
          }));
        setLocations(locations);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SideNav />
      <UserSettings />
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        paddingRight="4em"
        paddingTop={2}
      >
        <Grid item>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
          >
            <Link to="../Dashboard">
              <ToggleButton
                value="list"
                sx={{ height: "30px", padding: "0px 10px" }}
              >
                List
              </ToggleButton>
            </Link>
            <ToggleButton
              value="map"
              sx={{ height: "30px", padding: "0px 10px" }}
            >
              Map
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Layout>
        <GoogleMaps
          mapId="map_id"
          locations={locations}
          onMarkerClick={handleMarkerClick}
        />
      </Layout>
      <PropertyModal
        open={modalOpen}
        property={selectedProperty}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default Map;
