// import './leaflet-container.css';
import { MapContainer, TileLayer } from "react-leaflet";
import useGeoLocation from "../../../hooks/geoLocationHook";
import useUserDefaultLocation from "../../../hooks/userDefaultPositionHook";

export const LeafletContainer1 = ({ children }) => {
  const { position } = useGeoLocation();
  const { userLocation } = useUserDefaultLocation(position);

  return (
    <MapContainer
      className="h-full w-full z-0 leaflet-container relative"
      zoom={userLocation.zoom}
      center={userLocation}
      style={{ height: "calc(60vh)", width: "calc(60vw)" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`}
        id="mapbox/navigation-guidance-night-v2"
        accessToken="pk.eyJ1IjoiYXJzZW5paWEtZCIsImEiOiJjbGNxMXQzdnAwMW13M3dwMHpiMjFqNHJ4In0.eVcS-5tEr2Ygie3da-XlKw"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
      {children}
    </MapContainer>
  );
};
