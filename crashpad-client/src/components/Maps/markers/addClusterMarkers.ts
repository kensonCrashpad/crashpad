import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { addSingleMarkers } from "./addSingleMarkers";

export const addClusterMarkers = ({
  locations,
  map,
  onMarkerClick
}: {
  locations: ReadonlyArray<{ location: google.maps.LatLngLiteral; property: any }>;
  map: google.maps.Map | null | undefined;
  onMarkerClick: (property: any) => void;
}) => {
  const markers = addSingleMarkers({ locations, map, onMarkerClick});

  // Merge markers into clusters
  new MarkerClusterer({
    markers,
    map,
    algorithm: new SuperClusterAlgorithm({
      radius: 350, // cluster size
    }),
  });
};
