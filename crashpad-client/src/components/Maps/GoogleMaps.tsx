import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { addClusterMarkers, addSingleMarkers } from "./markers";

const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: 40.7608, lng: -111.8910 }; // Salt Lake City, UT
const DEFAULT_ZOOM = 4;

interface GoogleMapsProps {
  locations: ReadonlyArray<{
    location: google.maps.LatLngLiteral;
    property: any; 
  }>;
  useClusters?: boolean;
  mapId?: string;
  className?: string;
  onMarkerClick: (property: any) => void;
}

export const GoogleMaps = ({
  locations,
  useClusters = true,
  mapId,
  className,
  onMarkerClick,
}: GoogleMapsProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Use the useJsApiLoader hook to load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBfWjIk1Mx3W8zBIgrwjWJL_syRftWdH5s", 
    libraries: ["places"], 
  });

  useEffect(() => {
    if (isLoaded && ref.current) {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(ref.current, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          mapId,
        });

        if (useClusters) {
          addClusterMarkers({ locations, map, onMarkerClick });
        } else {
          addSingleMarkers({ locations, map, onMarkerClick });
        }
      }
    }
  }, [isLoaded, locations, mapId, useClusters, onMarkerClick]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div
      className={className}
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
