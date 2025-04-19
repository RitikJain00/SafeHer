import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertTriangle, Navigation, Shield, Phone } from "lucide-react"
import Link from "next/link"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SafetyMap } from "@/components/safety-map"

export default function Home() {
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
        <h1 className="text-3xl font-bold mb-2">Navigate Safely with SafeRoutes</h1>
        <p className="text-muted-foreground">Find safe routes, emergency places, and get help when you need it.</p>
      </div>

      <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden border">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          
            {/* <Navigation className="h-12 w-12 mx-auto mb-4 text-teal-600" />
            <p className="text-lg font-medium">Interactive Safety Map</p>
            <p className="text-sm text-muted-foreground">Shows safe routes and emergency locations</p> */}
            <SafetyMap/>
          
        </div>
        <div className="absolute bottom-4 right-4">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <MapPin className="mr-2 h-4 w-4" />
            Find My Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/safe-places">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                Safe Places
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find emergency shelters and safe zones near you.</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/report">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Report Incident
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Report unsafe areas or incidents to help others.</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/helpline">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                Helpline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Emergency contacts and helpline numbers.</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/self-defense">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Self Defense
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Learn self-defense techniques and safety tips.</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Safety Alerts</CardTitle>
          <CardDescription>Safety alerts in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Road Closure on Main Street",
                description: "Due to construction, please use alternate routes.",
                time: "2 hours ago",
                severity: "low",
              },
              {
                title: "Reported Incident at Central Park",
                description: "Exercise caution in the area. Police have been notified.",
                time: "5 hours ago",
                severity: "medium",
              },
              {
                title: "Flash Flood Warning",
                description: "Avoid downtown area due to flooding.",
                time: "1 day ago",
                severity: "high",
              },
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-md border">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    alert.severity === "high"
                      ? "bg-red-500"
                      : alert.severity === "medium"
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                />
                <div>
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </SidebarProvider>
  )
}
