import React, { useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Grid,
} from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import Nav from "../NavBar/SideNav";
import UserSettings from "./UserSettings";
import { Link } from "react-router-dom";

const ImageWithControls: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [zoom, setZoom] = useState<number>(100);
  const [imageType, setImageType] = useState<"Sat" | "Def">("Sat");

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 10);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(10, prevZoom - 10));
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "list" | "map"
  ) => {
    setViewMode(newValue);
  };

  const handleImageTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "Sat" | "Def"
  ) => {
    setImageType(newValue);
  };

  const navigateToHprofile = () => {
    window.location.href = "/hostprofile";
  };

  return (
    <div>
      <UserSettings />
      <Nav />
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
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          paddingLeft: "4em",
          paddingRight: "4em",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
            paddingRight: "4em",
          }}
        >
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <ToggleButtonGroup
                value={imageType}
                exclusive
                onChange={handleImageTypeChange}
              >
                <ToggleButton value="Sat">Sat</ToggleButton>
                <ToggleButton value="Def">Def</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <IconButton onClick={handleZoomIn}>
            <ZoomIn />
          </IconButton>
          <IconButton onClick={handleZoomOut}>
            <ZoomOut />
          </IconButton>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12087.071008645446!2d-111.86879415!3d40.767132600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1716146958474!5m2!1sen!2sus"
          width="1200"
          height="800"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <img
          src={Map}
          alt="Your Image"
          style={{
            width: `${zoom}%`,
            transition: "width 0.5s",
            paddingLeft: "5em",
          }}
        /> */}
      </div>
    </div>
  );
};

export default ImageWithControls;

