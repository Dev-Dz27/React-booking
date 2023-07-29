import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { FC,  } from "react";
import NumberMarker from "./NumberMarker";
import { StayDataType } from "data/types";
import { useSelector } from "react-redux";
import { BookingState } from "features/bookingSlice";

// Fix for the map not rendring properly
const ComponentResize = () => {
  // Created ResizeComponent , then put inside MapCo ntainer
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

interface Centertypes {
  lat: number;
  lng: number;
}

export interface MapProps {
  center: Centertypes;
  listings: any;
}

const Map: FC<MapProps> = ({ center, listings }) => {
  const bookingState = useSelector((state: { booking: BookingState }) => state.booking);

  const currentHoverID = bookingState.currentHoverID;

  return (
    <MapContainer
      style={{ height: "100vh" }}
      center={center}
      zoom={12}
      scrollWheelZoom={true}
    >
      <ComponentResize />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors '
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((item: StayDataType) => (
        <NumberMarker
          key={item.id}
          position={[item.map.lat, item.map.lng]}
          number={item?.price}
          isHovered={item.id === currentHoverID}
          isSelected={currentHoverID === item.id}
          listing={item}
          id={item?.id}
        >
        </NumberMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
