import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, TrafficLayer } from '@react-google-maps/api';
import axios from 'axios';

// Type definitions
interface CrimeData {
  overall_safety_score: number;
  safety_message: string;
  individual_scores: Record<string, number>;
}

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

// Map container styling
const containerStyle = {
  width: '90vw',
  height: '70vh',
};


// India's bounding box
const INDIA_BOUNDS = {
  north: 35.6745457,
  south: 6.5546079,
  east: 97.395561,
  west: 68.1113787,
};
function isInIndia(lat: number, lng: number) {
  return (
    lat >= INDIA_BOUNDS.south &&
    lat <= INDIA_BOUNDS.north &&
    lng >= INDIA_BOUNDS.west &&
    lng <= INDIA_BOUNDS.east
  );
}
// Safety button style (optional floating button)
const safetyButtonStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: 10,
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  cursor: 'pointer',
  fontWeight: 'bold'
} as React.CSSProperties;

const Map: React.FC = () => {
  // Location and map state
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Safety data state
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [showCrimeButton, setShowCrimeButton] = useState<boolean>(false);
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [loadingCrimeData, setLoadingCrimeData] = useState<boolean>(false);
  const [safetyError, setSafetyError] = useState<string | null>(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("✅ Location detected:", latitude, longitude);
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
          setLocationError(null);
        },
        (err) => {
          console.warn("❌ Location error:", err.message);
          setLocationError(`Couldn't access your location: ${err.message}`);

          // Fallback to Prayagraj, India (MNNIT)
          setCurrentPosition({ lat: 25.4358, lng: 81.8463 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setCurrentPosition({ lat: 25.4358, lng: 81.8463 });
    }
  }, []);

  // Set map reference when map loads
  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log("Map loaded successfully");
    setMapRef(map);
  }, []);

  // Find nearby police stations
  useEffect(() => {
    if (currentPosition && mapRef && window.google) {
      console.log("Finding nearby police stations...");
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
            console.log(`Found ${filtered.length} police stations nearby`);

            setPlaces(filtered);
          } else {
            console.warn("Police station search failed:", status);
          }
          setLoading(false);
        }
      );
    }
  }, [currentPosition, mapRef]);

  // Handle map click - select location and show safety button
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const clickedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    
    console.log("Map clicked at:", clickedLocation);
    setSelectedLocation(clickedLocation);
    setCrimeData(null);
    setSafetyError(null);
    setShowCrimeButton(isInIndia(clickedLocation.lat, clickedLocation.lng));
  }, []);

  // Fetch safety data when button is clicked
  const handleShowCrimeData = async () => {
    if (!selectedLocation) return;
    
    setLoadingCrimeData(true);
    setCrimeData(null);
    setSafetyError(null);
    
    try {
      console.log("Fetching safety data for location:", selectedLocation);
      
      // Get state and district using reverse geocoding
      const geocoder = new window.google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location: selectedLocation });
      
      let state = '', district = '';
      if (results && results.length > 0) {
        console.log("Geocoding result:", results[0].address_components);
        
        for (const component of results[0].address_components) {
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
            console.log("Found state:", state);
          }
          if (component.types.includes('administrative_area_level_2')) {
            district = component.long_name.replace(/ division$/i, "").trim();
      
          }
        }
      } else {
        throw new Error("No geocoding results found");
      }
      
      if (state && district) {
        console.log(`Making API request for ${district}, ${state}`);

        
        const response = await axios.post('http://localhost:5000/predict', { 
          state, 
          district 
        });
        
        console.log("Safety data received:", response.data);
        setCrimeData(response.data);
      } else {
        throw new Error("Could not determine state/district for this location");
      }
    } catch (error) {
      console.error("Error fetching safety data:", error);
      
      let errorMessage = "Failed to fetch safety data";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSafetyError(errorMessage);
    } finally {
      setLoadingCrimeData(false);
      setShowCrimeButton(false);
    }
  };

  // Show loading message while waiting for location
  if (!currentPosition) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Finding your location...</h2>
          {locationError && <p className="text-red-500">{locationError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={onMapLoad}
        onClick={handleMapClick}
      >
        {/* Traffic layer for real-time traffic */}
        <TrafficLayer />
        
        {/* User location marker */}
        <Marker 
          position={currentPosition} 
          label="You"
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />

        {/* Police station markers */}
        {!loading &&
          places.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              label="🚓"
              onClick={() => setActiveMarker(place.place_id)}
            >
              {activeMarker === place.place_id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <h3 className='text-black'><b>{place.name}</b></h3>
                    <p className='text-black'>{place.vicinity}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

        {/* InfoWindow for selected location and safety data */}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            onCloseClick={() => {
              setSelectedLocation(null);
              setCrimeData(null);
              setSafetyError(null);
              setShowCrimeButton(false);
            }}
          >
            <div className="p-2 text-black max-w-sm">
              {showCrimeButton && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mb-2 w-full"
                  onClick={handleShowCrimeData}
                  disabled={loadingCrimeData}
                >
                  {loadingCrimeData ? 'Fetching data...' : 'Show Safety Data'}
                </button>
              )}
              
              {loadingCrimeData && (
                <div className="text-center py-2">
                  <p>Analyzing safety data...</p>
                </div>
              )}
              
              {safetyError && (
                <div className="bg-red-100 p-2 rounded text-red-700 text-sm">
                  {safetyError}
                </div>
              )}
              
              {crimeData && (
                <div className="animate-fade-in">
                  <h3 className="font-bold text-lg mb-2">Safety Report</h3>
                  <div className={`p-2 rounded mb-3 ${
                    crimeData.safety_message.includes('Safe ✅') ? 'bg-green-100' :
                    crimeData.safety_message.includes('Moderately Safe 🟡') ? 'bg-yellow-100' :
                    crimeData.safety_message.includes('Not Safe 🟠') ? 'bg-orange-100' : 'bg-red-100'
                  }`}>
                    <p className={`text-lg font-semibold ${
                      crimeData.safety_message.includes('Safe ✅') ? 'text-green-700' :
                      crimeData.safety_message.includes('Moderately Safe 🟡') ? 'text-yellow-700' :
                      crimeData.safety_message.includes('Not Safe 🟠') ? 'text-orange-700' : 'text-red-700'
                    }`}>
                      {crimeData.safety_message} ({crimeData.overall_safety_score}/100)
                    </p>
                  </div>
                  
                  <h4 className="font-semibold mt-3 mb-2">Crime Statistics:</h4>
                  <div className="max-h-60 overflow-y-auto">
                    <ul className="space-y-1">
                      {Object.entries(crimeData.individual_scores)
                        .sort(([, a], [, b]) => b - a)
                        .map(([crime, score]) => (
                          <li key={crime} className="flex justify-between border-b pb-1">
                            <span className="text-sm">{crime}:</span>
                            <span className={`font-semibold ${
                              score < 20 ? 'text-green-600' :
                              score < 40 ? 'text-yellow-600' :
                              score < 60 ? 'text-orange-600' : 'text-red-600'
                            }`}>{score.toFixed(1)}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Optional: Add a floating safety button */}
      {/* Uncomment this if you want a persistent safety button */}
      {/*
      <button 
        style={safetyButtonStyle}
        onClick={() => {
          if (mapRef) {
            const center = mapRef.getCenter();
            if (center) {
              const location = { lat: center.lat(), lng: center.lng() };
              setSelectedLocation(location);
              setCrimeData(null);
              setShowCrimeButton(true);
            }
          }
        }}
      >
        Check Area Safety
      </button>
      */}
    </div>
  );
};

export default Map;
