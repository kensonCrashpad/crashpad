export const addSingleMarkers = ({
  locations,
  map,
  onMarkerClick,
}: {
  locations: ReadonlyArray<{ location: google.maps.LatLngLiteral; property: any }>;
  map: google.maps.Map | null | undefined;
  onMarkerClick: (property: any) => void;
}) => {
  return locations.map(({ location, property }) => {
    const marker = new google.maps.Marker({
      position: location,
      map,
    });

    marker.addListener('click', () => {
      onMarkerClick(property);
    });

    return marker;
  });
};
