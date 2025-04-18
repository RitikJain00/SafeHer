import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "reactstrap";

// Fix marker icons
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Type definition for props
interface RecenterMapProps {
  lat: number;
  lng: number;
}

const RecenterMap: React.FC<RecenterMapProps> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng]);
  return null;
};

interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const SafeMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [distance, setDistance] = useState<string | null>(null);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setUserLocation([lat, lng]);
      fetchNearbyStations(lat, lng);
    });
  }, []);

  // Fetch nearby police stations
  const fetchNearbyStations = async (lat: number, lng: number) => {
    const overpassURL = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=police](around:2000,${lat},${lng});out;`;
    const res = await fetch(overpassURL);
    const data = await res.json();

    console.log("API Response: ", data); // Debugging: Log the API response

    if (data.elements && data.elements.length > 0) {
      const markers = data.elements.map((el: any) => ({
        id: el.id,
        name: el.tags?.name || "Police Station",
        lat: el.lat,
        lng: el.lon,
      }));
      setStations(markers);
    } else {
      console.log("No police stations found in the vicinity.");
    }
  };

  // Custom icon for police station markers
  const policeIcon = new L.Icon({
    iconUrl: "https://toppng.com/uploads/preview/map-marker-icon-600x-map-marker-11562939743ayfahlvygl.png", // default icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Update distance when user clicks on a marker
  const handleMarkerClick = (lat: number, lon: number) => {
    if (userLocation) {
      const dist = calculateDistance(userLocation[0], userLocation[1], lat, lon);
      setDistance(dist.toFixed(2)); // Set the distance in km with 2 decimal points
    }
  };

  // Manually update user location
  const handleUpdateLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setUserLocation([lat, lng]);
      fetchNearbyStations(lat, lng); // Re-fetch stations when location updates
    });
  };

  return (
    <div className="w-full h-[500px] mt-5 relative z-0">
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <RecenterMap lat={userLocation[0]} lng={userLocation[1]} />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Marker */}
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Police Stations */}
          {stations.length > 0 ? (
            stations.map((s) => (
              <Marker
                key={s.id}
                position={[s.lat, s.lng]}
                icon={policeIcon} // Set the custom icon for police station
                eventHandlers={{
                  click: () => handleMarkerClick(s.lat, s.lng), // Handle marker click
                }}
              >
                <Popup>{s.name}</Popup>
              </Marker>
            ))
          ) : (
            <div>No police stations nearby.</div>
          )}
        </MapContainer>
      )}

      {/* Display Distance */}
      {distance && <div>Distance to nearest police station: {distance} km</div>}

      {/* Update Location Button */}
      <Button onClick={handleUpdateLocation} style={{ marginTop: "10px" }}>
        Update Location
      </Button>
    </div>
  );
};

export default SafeMap;
