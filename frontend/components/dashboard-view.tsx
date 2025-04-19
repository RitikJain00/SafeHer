"use client";

import { useState, useEffect, useRef } from "react";
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
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOption } from "./map-configuration";
import FullMapModal from "./fullMap";

export function DashboardView() {
  const { isLoaded: googleMapsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapOption.googleMapsApiKey,
    libraries: ["places"],
  });

  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const [showShareLocation, setShowShareLocation] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("919343334022");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [showFullMap,setShowFullMap] = useState(false);
 const [showMap, setShowMap] = useState(true);

 const handleRecordAudio = async () => {
    console.log("[handleRecordAudio] Clicked", { isRecording });
    if (isRecording) {
      const audioBlob = await stopRecording();
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("[handleRecordAudio] Recording stopped. Audio URL:", audioUrl);
      setAudioUrl(audioUrl);
      setIsRecording(false);
      handleSendSOS(audioUrl);
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

   const startRecording = async () => {
    try {
      console.log("[startRecording] Starting...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log("[startRecording] Data available", event.data);
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        console.log("[startRecording] MediaRecorder stopped");
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        console.log("[startRecording] Audio URL set:", url);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      console.log("[startRecording] Recording started");

      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          console.log("[startRecording] Auto stop after 60s");
        }
      }, 60000);
    } catch (error) {
      console.error("[startRecording] Mic access denied:", error);
      alert("Microphone access is required to record audio.");
    }
  };

  const stopRecording = () => {
    console.log("[stopRecording] Stopping recording...");
    return new Promise<Blob>((resolve) => {
      mediaRecorderRef.current?.stop();
      setTimeout(() => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        console.log("[stopRecording] Audio Blob created");
        resolve(audioBlob);
      }, 1000);
    });
  };

  const handleSendSOS = async (audioUrl: string) => {
    console.log("[handleSendSOS] Sending SOS to:", phoneNumber, "with audioUrl:", audioUrl);
    if (!phoneNumber || !audioUrl) {
      alert("Please enter a phone number and make sure the recording is complete.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/alert/send-audio-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          audioUrl,
        }),
      });

      const data = await response.json();
      console.log("[handleSendSOS] Response:", data);

      if (data.success) {
        alert("SOS sent successfully!");
      } else {
        alert("Failed to send SOS. Try again.");
      }
    } catch (error) {
      console.error("[handleSendSOS] Error:", error);
      alert("Error sending SOS");
    }
  };
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
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Safety Map</CardTitle>
              <Badge variant="outline" className="bg-safe/10 text-safe border-safe">
                <CheckCircle className="mr-1 h-3 w-3" /> Current Area: Safe
              </Badge>
            </div>
            <CardDescription>View safety heatmap and nearby safe locations</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            {googleMapsLoaded ? <SafetyMap isSafeRoute={true} /> : <div>Loading map...</div>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setShowFullMap(true)}>
              <MapPin className="mr-2 h-4 w-4" />
              View Full Map
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowMap(false)}>
              <Compass className="mr-2 h-4 w-4" />
              Safe Route
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Access essential safety features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col gap-1" onClick={() => setShowFakeCall(true)}>
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Fake Call</span>
                </Button>

                <Button variant="outline" className="h-20 flex flex-col gap-1" onClick={handleRecordAudio}>
                  <Shield className="h-5 w-5 text-primary" />
                  <span>{isRecording ? "Stop Recording" : "Record Audio"}</span>
                </Button>

                <Button variant="outline" className="h-20 flex flex-col gap-1" onClick={() => setShowHelpline(true)}>
                  <Phone className="h-5 w-5 text-safe" />
                  <span>Helplines</span>
                </Button>

                <Button variant="outline" className="h-20 flex flex-col gap-1" onClick={handleShareLocationClick}>
                  <Users className="h-5 w-5 text-primary" />
                  <span>Share Location</span>
                </Button>
              </div>
            </CardContent>
          </Card>

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

      <div className="space-y-6">
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

        <NearbySafePlaces />
      </div>

      {showFakeCall && <FakeCall onClose={() => setShowFakeCall(false)} />}
      {showHelpline && <Helpline onClose={() => setShowHelpline(false)} />}
      {showShareLocation && location && <ShareLocationModal onClose={() => setShowShareLocation(false)} location={location} />}
      <FullMapModal open={showFullMap} onClose={() => setShowFullMap(false)} isLoaded={googleMapsLoaded} />
    </div>
  );
}