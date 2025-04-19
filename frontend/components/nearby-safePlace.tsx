"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@googlemaps/js-api-loader";
import { mapOption } from "./map-configuration";
type Place = {
  name: string;
  vicinity: string;
};

export default function NearbySafePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          setLocation({ lat: 25.4358, lng: 81.8463 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const loader = new Loader({
      apiKey:  mapOption.googleMapsApiKey,
      libraries: ["places"],
    });

    loader.load().then(() => {
      const mapDiv = document.createElement("div");
      const dummyMap = new google.maps.Map(mapDiv); // now safe

      const service = new google.maps.places.PlacesService(dummyMap);

      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 2000,
        type: "police",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const filtered = results.filter(
            (place): place is Place =>
              !!place.place_id && !!place.geometry?.location && !!place.name && !!place.vicinity
          );
          setPlaces(filtered);
        } else {
          console.error("Failed to fetch places:", status);
        }
        setLoading(false);
      });
    });
  }, [location]);

  const visiblePlaces = showAll ? places : places.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nearby Safe Places</CardTitle>
        <CardDescription>Live safety data (Google Places)</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading safe places...</p>
        ) : (
          <div className="space-y-3">
            {visiblePlaces.map((place, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{place.name}</h4>
                  <p className="text-sm text-muted-foreground">{place.vicinity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {places.length > 4 && (
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "View Less" : "View All Safe Places"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
