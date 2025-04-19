import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, TrafficLayer } from '@react-google-maps/api';

interface LatLng {
  lat: number;
  lng: number;
}

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: google.maps.LatLng;
  };
}

const containerStyle = {
  width: '90vw',
  height: '70vh',
};

const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("✅ Accurate Location:", latitude, longitude);
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (err) => {
          console.warn("❌ Error getting position:", err.message);
          setCurrentPosition({ lat: 25.4358, lng: 81.8463 }); // MNNIT fallback
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  useEffect(() => {
    if (currentPosition && mapRef && window.google) {
      const service = new window.google.maps.places.PlacesService(mapRef);

      const request: google.maps.places.PlaceSearchRequest = {
        location: currentPosition,
        radius: 2000,
        type: 'police',
      };

      service.nearbySearch(
        request,
        (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const filtered = results.filter(
              (place): place is PlaceResult =>
                !!place.place_id && !!place.geometry?.location && !!place.name && !!place.vicinity
            );
            setPlaces(filtered);
          } else {
            console.error('Nearby search failed:', status);
          }
          setLoading(false);
        }
      );
    }
  }, [currentPosition, mapRef]);

  if (!currentPosition) return <h2>Fetching your location...</h2>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
      onLoad={onMapLoad}
    >
      {/* 🔴 Traffic Layer for real-time traffic */}
     
      
       <TrafficLayer autoUpdate />

      {/* 🧍 User Location */}
      <Marker position={currentPosition} label="You" />

      {/* 👮 Nearby Police Stations */}
      {!loading &&
        places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            label="👮"
            onClick={() => setActiveMarker(place.place_id)}
          >
            {activeMarker === place.place_id && (
              <InfoWindow  onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <h3 className='text-black'><b>{place.name}</b></h3>
                  <p className='text-black'>{place.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  );
};

export default Map;