import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

const SafeRoute: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const [safestRoute, setSafestRoute] = useState<google.maps.DirectionsRoute | null>(null);
  const policeMarkersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 7,
      });

      setMap(mapInstance);

      directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current.setMap(mapInstance);

      const originInput = document.getElementById("origin") as HTMLInputElement | null;
      const destinationInput = document.getElementById("destination") as HTMLInputElement | null;

      if (originInput && destinationInput) {
        new window.google.maps.places.Autocomplete(originInput);
        new window.google.maps.places.Autocomplete(destinationInput);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }

    return () => {
      clearPoliceMarkers();
    };
  }, []);

  const clearPoliceMarkers = () => {
    policeMarkersRef.current.forEach(marker => marker.setMap(null));
    policeMarkersRef.current = [];
  };

  const getRoute = (
    origin: string,
    destination: string
  ): Promise<google.maps.DirectionsResult> => {
    return new Promise((resolve, reject) => {
      if (!directionsServiceRef.current) return reject("Directions service not ready");

      directionsServiceRef.current.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            resolve(result);
          } else {
            reject("Directions request failed: " + status);
          }
        }
      );
    });
  };

  const getNearbyPoliceStations = (
    location: google.maps.LatLng
  ): Promise<google.maps.places.PlaceResult[]> => {
    return new Promise((resolve, reject) => {
      if (!map) return reject("Map not ready");

      const service = new google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 5000,
        keyword: 'police station',
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const filtered = results.filter(place =>
            place.name?.toLowerCase().includes('police') ||
            place.name?.toLowerCase().includes('chowki') ||
            place.name?.toLowerCase().includes('station')
          );
          resolve(filtered);
        } else {
          reject("Nearby search failed: " + status);
        }
      });
    });
  };

  const addPoliceStationMarkers = (stations: google.maps.places.PlaceResult[]) => {
    clearPoliceMarkers();
    stations.forEach(station => {
      if (station.geometry?.location && map) {
        const marker = new google.maps.Marker({
          position: station.geometry.location,
          map,
          title: station.name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(32, 32),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><strong>${station.name}</strong><br>${station.vicinity || ''}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        policeMarkersRef.current.push(marker);
      }
    });
  };

  const evaluateRouteSafety = async (origin: string, destination: string) => {
    try {
      clearPoliceMarkers();
      const routes = await getRoute(origin, destination);
      let safest: google.maps.DirectionsRoute | null = null;
      let maxPoliceCount = 0;
      let allPoliceStations: google.maps.places.PlaceResult[] = [];

      for (const route of routes.routes) {
        const legs = route.legs;
        const overviewPath = route.overview_path || [];

        const sampledPoints: google.maps.LatLng[] = [];

        for (let i = 0; i < overviewPath.length; i += 10) {
          sampledPoints.push(overviewPath[i]);
        }

        if (legs.length > 0) {
          sampledPoints.unshift(legs[0].start_location);
          sampledPoints.push(legs[legs.length - 1].end_location);
        }

        const policeStationsPromises = sampledPoints.map(point =>
          getNearbyPoliceStations(point).catch(() => [])
        );

        const policeStationsResults = await Promise.all(policeStationsPromises);

        const routeStations = policeStationsResults.flat();
        const uniqueStations: google.maps.places.PlaceResult[] = [];
        const seenStations: Record<string, boolean> = {};

        routeStations.forEach(station => {
          if (station?.place_id && !seenStations[station.place_id]) {
            seenStations[station.place_id] = true;
            uniqueStations.push(station);
          }
        });

        const policeStationsCount = uniqueStations.length;

        if (policeStationsCount > maxPoliceCount) {
          maxPoliceCount = policeStationsCount;
          safest = route;
        }

        allPoliceStations = [...allPoliceStations, ...uniqueStations];
      }

      addPoliceStationMarkers(allPoliceStations);

      if (safest) {
        setSafestRoute(safest);
        displayRoute(safest);
        console.log(`Safest route found with ${maxPoliceCount} police stations.`);
      } else {
        console.log("No safe route found. Displaying default.");
        displayRoute(routes.routes[0]);
      }

    } catch (error) {
      console.error("Route evaluation failed:", error);
      alert("Error finding route. Please try again.");
    }
  };

  const displayRoute = (route: google.maps.DirectionsRoute) => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({
        routes: [route],
        request: {
          travelMode: google.maps.TravelMode.DRIVING,
        },
      } as google.maps.DirectionsResult);
    }
  };

  const handleSearch = () => {
    const origin = (document.getElementById("origin") as HTMLInputElement).value;
    const destination = (document.getElementById("destination") as HTMLInputElement).value;

    if (origin && destination) {
      evaluateRouteSafety(origin, destination);
    } else {
      alert("Please enter both origin and destination.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          id="origin"
          type="text"
          placeholder="Enter origin"
          style={{ marginRight: '10px', padding: '8px', width: '300px' }}
        />
        <input
          id="destination"
          type="text"
          placeholder="Enter destination"
          style={{ marginRight: '10px', padding: '8px', width: '300px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Find Safest Route
        </button>
      </div>
      <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
    </div>
  );
};

export default SafeRoute;
