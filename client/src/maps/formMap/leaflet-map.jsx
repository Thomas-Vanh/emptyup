import markerIcon from "leaflet/dist/images/marker-icon.png"
import { Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

export const LeafletMap = ({coordinates, children}) => {
    const map = useMap();
       
    useEffect(() => {
        map.setView(coordinates);
    }, [coordinates]);

    const userIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [22, 38],
        iconAnchor: [11, 19],
    });
    
    return <div>
        <Marker position={coordinates} icon={userIcon}>
            {children}
        </Marker>
    </div>;
}

