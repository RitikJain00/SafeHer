"use client"
import { useJsApiLoader } from "@react-google-maps/api"
import { mapOption } from "./map-configuration"
import { useEffect, useRef, useState } from "react"
import { AlertTriangle, CheckCircle, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SafeMap from "./safe-map"
import Map from "./map"

export function SafetyMap() {
  // Load Google Maps API
  const { isLoaded: googleMapsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapOption.googleMapsApiKey,
    libraries: ['places'],
  });

  // Local state to handle map loading state
  const [isLoaded, setIsLoaded] = useState(false)

  // Simulating map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[300px] rounded-md overflow-hidden border bg-muted/20 ">
      {/* Show loading spinner until map is loaded */}
      {!googleMapsLoaded || !isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading safety map...</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Render map once everything is loaded */}
          <Map />
        </div>
      )}
    </div>
  )
}
