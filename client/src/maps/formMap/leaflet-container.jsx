// import './leaflet-container.css';
import { MapContainer, TileLayer } from "react-leaflet";

export const LeafletContainer = ({ children, zoom, center }) => {


  return (
    <MapContainer
      className="h-screen w-60 leaflet-map relative z-0"
      style={{ height: "calc(95vh)", width: "calc(70vw)"}}
      zoom={zoom}
      center={center}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};
