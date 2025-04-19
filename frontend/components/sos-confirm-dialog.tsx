"use client"

import { useState , useEffect } from "react"
import { AlertCircle, CheckCircle2, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import axios,{ AxiosResponse } from "axios"

interface SOSConfirmDialogProps {
  setShowConfirm: (show: boolean) => void
}

interface SOSRequestBody {
  message: string;
  contacts: string[];
}

interface SOSResponse {
  success: boolean;
  [key: string]: any; // for any additional properties
}


export function SOSConfirmDialog({ setShowConfirm }: SOSConfirmDialogProps) {
  const [countdown, setCountdown] = useState(5);
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  
// Function to get location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }, (error) => {
      console.error(error);
      alert("Could not fetch location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

useEffect(() => {
  getLocation();
}, []);

const handleConfirm = async () => {
  setSending(true)

  if (!location) {
    alert("Location not available.")
    setSending(false)
    return
  }

  const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

  try {
    const requestBody: SOSRequestBody = {
      message: `🚨 SOS! I need help. My location: ${googleMapsUrl}`,
      contacts: ["+917836086508"], // Replace with actual numbers
    }

    const res: AxiosResponse<SOSResponse> = await axios.post(
      "http://localhost:3000/alert/sos",
      requestBody
    )

    if (res.data.success) {
      setSent(true)
    } else {
      alert("❌ Failed to send SOS.")
      setSending(false)
    }
  } catch (err) {
    console.error("SOS Error:", err)
    alert("❌ Could not send SOS. Please try again.")
    setSending(false)
  }
}

  const handleCancel = () => {
    setShowConfirm(false)
  }

  return (
    <DialogContent className="sm:max-w-md bg-black">
      {!sent ? (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive ">
              <AlertCircle className="mr-2 h-5 w-5" />
              Emergency SOS Alert
            </DialogTitle>
            <DialogDescription>
              This will send your current location to your emergency contacts and nearby police stations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {sending ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="animate-pulse text-destructive">
                  <AlertCircle className="h-16 w-16" />
                </div>
                <p className="text-center font-medium">Sending emergency alert...</p>
                <Progress value={66} className="w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-medium">Your alert will include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your current location</li>
                  <li>Alert to your 3 emergency contacts</li>
                  <li>Notification to nearest police station</li>
                  <li>Audio recording of surroundings</li>
                </ul>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {!sending && (
              <Button variant="outline" onClick={handleCancel} className="sm:w-full">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
            <Button variant="destructive" onClick={handleConfirm} className="sm:w-full" disabled={sending}>
              <AlertCircle className="mr-2 h-4 w-4" />
              {sending ? "Sending..." : "Confirm Emergency"}
            </Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center text-safe">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Alert Sent Successfully
            </DialogTitle>
            <DialogDescription>Your emergency contacts and nearby authorities have been notified.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="text-safe">
              <CheckCircle2 className="h-16 w-16" />
            </div>
            <p className="text-center font-medium">Help is on the way</p>
            <div className="flex flex-col w-full gap-2">
              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency Services
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowConfirm(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  )
}
