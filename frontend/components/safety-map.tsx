"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, CheckCircle, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SafeMap from "./safe-map"


export function SafetyMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[300px] rounded-md overflow-hidden border bg-muted/20">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading safety map...</p>
          </div>
        </div>
      ) : (
        <div>
          {/* This would be replaced with an actual map integration like Google Maps or Mapbox */}
          <SafeMap/>
        </div>
      )}
    </div>
  )
}
