import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock, Info } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SafePlaces() {
  const safeLocations = [
    {
      name: "Central Police Station",
      address: "123 Main Street",
      distance: "0.8 miles",
      type: "Police",
      hours: "24/7",
      phone: "911",
      facilities: ["First Aid", "Shelter", "Security"],
    },
    {
      name: "Community Emergency Center",
      address: "456 Oak Avenue",
      distance: "1.2 miles",
      type: "Emergency Center",
      hours: "24/7",
      phone: "555-1234",
      facilities: ["Medical Care", "Food", "Shelter"],
    },
    {
      name: "Memorial Hospital",
      address: "789 Elm Street",
      distance: "2.5 miles",
      type: "Hospital",
      hours: "24/7",
      phone: "555-5678",
      facilities: ["Emergency Care", "Trauma Center"],
    },
    {
      name: "City Hall Safe Zone",
      address: "101 Government Plaza",
      distance: "1.5 miles",
      type: "Safe Zone",
      hours: "8AM - 8PM",
      phone: "555-4321",
      facilities: ["Security", "Information"],
    },
    {
      name: "Downtown Fire Station",
      address: "202 Fire Road",
      distance: "1.7 miles",
      type: "Fire Station",
      hours: "24/7",
      phone: "555-9876",
      facilities: ["First Aid", "Emergency Response"],
    },
  ]

  return (
    <SidebarProvider>
    <div className="flex h-full ">
      {/* Sidebar */}
      <div className="hidden md:block w-52 flex-shrink-0 border-r">
        <AppSidebar />
      </div>

    </div>
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Emergency Safe Places</h1>
        <p className="text-muted-foreground">Find safe locations near you in case of emergency</p>
      </div>

      <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden border">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-teal-600" />
            <p className="text-lg font-medium">Safe Places Map</p>
            <p className="text-sm text-muted-foreground">View all safe locations in your area</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Navigation className="mr-2 h-4 w-4" />
            Find Nearest
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {safeLocations.map((location, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {location.address}
                  </CardDescription>
                </div>
                <Badge className="bg-teal-600">{location.distance}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{location.type}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{location.hours}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{location.phone}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Available Facilities:</p>
                <div className="flex flex-wrap gap-2">
                  {location.facilities.map((facility, i) => (
                    <Badge key={i} variant="outline">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </SidebarProvider>
  )
}
