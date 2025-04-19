"use client";

import { useState, useEffect ,useRef } from "react";
import {
  AlertTriangle,
  Shield,
  Phone,
  Users,
  CheckCircle,
  MapPin,
  Compass,
  BookOpen,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SafetyMap } from "@/components/safety-map";
import { EmergencyContacts } from "@/components/emergency-contacts";
import { SafetyTips } from "@/components/safety-tips";
import FakeCall from "./fakecall";
import Helpline from "./helpline";
import ShareLocationModal from "./shareLocation";
import NearbySafePlaces from "./nearby-safePlace";
import { useJsApiLoader } from "@react-google-maps/api"
import { mapOption } from "./map-configuration"


export function DashboardView() {
  
  // Local state to handle map loading state

   // Load Google Maps API
   const { isLoaded: googleMapsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapOption.googleMapsApiKey,
    libraries: ['places'],
  });
   // Local state to handle map loading state
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const [showShareLocation, setShowShareLocation] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [safePlaces, setSafePlaces] = useState([
    { name: "City Police Station", info: "0.8 miles away • Open 24/7" },
  ]); // Adding sample data for safe places
const [showMap, setShowMap] = useState(true);
  // Share Location Handler
  const handleShareLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setShowShareLocation(true);
        },
        () => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation not supported.");
    }
  };
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Safety Map */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Safety Map</CardTitle>
              <Badge variant="outline" className="bg-safe/10 text-safe border-safe">
                <CheckCircle className="mr-1 h-3 w-3" /> Current Area: Safe
              </Badge>
            </div>
            <CardDescription>
              View safety heatmap and nearby safe locations
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
         {showMap? <SafetyMap isSafeRoute={true}/>:
         <SafetyMap isSafeRoute={false}/>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              View Full Map
            </Button>
            <Button variant="outline" size="sm"
            onClick={()=>{setShowMap(false)}}>
              <Compass className="mr-2 h-4 w-4" />
              Safe Route
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions & Self-Defense */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Access essential safety features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                  onClick={() => setShowFakeCall(true)}
                >
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Fake Call</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                >
                  <Shield className="h-5 w-5 text-primary" />
                  <span>{isRecording ? "Recording..." : "Record Audio"}</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                  onClick={() => setShowHelpline(true)}
                >
                  <Phone className="h-5 w-5 text-safe" />
                  <span>Helplines</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                  onClick={handleShareLocationClick}
                >
                  <Users className="h-5 w-5 text-primary" />
                  <span>Share Location</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Self-Defense */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Self-Defense</CardTitle>
              <CardDescription>Learn essential self-defense techniques</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <SafetyTips />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                View All Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-6">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            <CardDescription>Your trusted contacts and nearby services</CardDescription>
          </CardHeader>
          <CardContent>
            <EmergencyContacts />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Manage Contacts
            </Button>
          </CardFooter>
        </Card>

        {/* Safe Places */}
        <NearbySafePlaces/>
      </div>

      {/* Modals */}
      {showFakeCall && <FakeCall onClose={() => setShowFakeCall(false)} />}
      {showHelpline && <Helpline onClose={() => setShowHelpline(false)} />}
      {showShareLocation && location && (
        <ShareLocationModal onClose={() => setShowShareLocation(false)} location={location} />
      )}
    </div>
  );
}
