import L, { LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';

interface CustomMarkerProps {
  position: LatLngExpression;
  color: string;
  children?: React.ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, }) => {
  const icon = L.divIcon({
    html: `
      <img
        src="/custom-marker.svg"
        alt="Custom Marker"
        style="width: 32px; height: 32px; transform: translate(-35%, -110%);"
      />
    `,
    iconSize: [1, 1],
    // iconAnchor: [1, 1],
  });

  return <Marker position={position} icon={icon}/>;
};

export default CustomMarker;
