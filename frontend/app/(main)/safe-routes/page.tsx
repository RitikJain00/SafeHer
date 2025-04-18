"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Navigation,
  MapPin,
  LocateFixed,
  Clock,
  Shield,
  AlertTriangle,
  Lightbulb,
  Users,
  ChevronRight,
  Repeat,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SafeRoute() {
  const [routeType, setRouteType] = useState("safest")

  const routes = [
    {
      id: 1,
      name: "Safest Route",
      distance: "1.8 miles",
      time: "36 min",
      safety: "High",
      features: ["Well-lit", "High Traffic", "Police Patrols"],
      safetyScore: 95,
    },
    {
      id: 2,
      name: "Balanced Route",
      distance: "1.5 miles",
      time: "30 min",
      safety: "Medium",
      features: ["Mostly Well-lit", "Medium Traffic"],
      safetyScore: 80,
    },
    {
      id: 3,
      name: "Fastest Route",
      distance: "1.2 miles",
      time: "24 min",
      safety: "Lower",
      features: ["Some Dark Areas", "Low Traffic"],
      safetyScore: 65,
    },
  ]

  const recentRoutes = [
    {
      from: "Home",
      to: "Work",
      used: "2 days ago",
    },
    {
      from: "Work",
      to: "Gym",
      used: "Yesterday",
    },
    {
      from: "Gym",
      to: "Home",
      used: "Yesterday",
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
        <h1 className="text-3xl font-bold mb-2">Plan Safe Route</h1>
        <p className="text-muted-foreground">Find the safest path to your destination</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Route Planner</CardTitle>
              <CardDescription>Enter your start and destination locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-2 top-3 flex h-5 w-5 items-center justify-center">
                    <MapPin className="h-4 w-4 text-teal-600" />
                  </div>
                  <Input className="pl-9" placeholder="Starting location" defaultValue="Current Location" />
                  <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                    <LocateFixed className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute left-2 top-3 flex h-5 w-5 items-center justify-center">
                    <MapPin className="h-4 w-4 text-red-500" />
                  </div>
                  <Input className="pl-9" placeholder="Destination" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Route Preference</Label>
                <RadioGroup defaultValue="safest" className="flex flex-col space-y-1" onValueChange={setRouteType}>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="safest" id="safest" />
                    <Label htmlFor="safest" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-teal-600" />
                        Safest Route
                      </div>
                      <p className="text-xs text-muted-foreground">Prioritize safety over speed</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="balanced" id="balanced" />
                    <Label htmlFor="balanced" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-amber-500" />
                        Balanced Route
                      </div>
                      <p className="text-xs text-muted-foreground">Balance between safety and speed</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="fastest" id="fastest" />
                    <Label htmlFor="fastest" className="flex-1 cursor-pointer font-normal">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        Fastest Route
                      </div>
                      <p className="text-xs text-muted-foreground">Prioritize speed over safety</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Safety Features</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Switch id="well-lit" defaultChecked />
                    <Label htmlFor="well-lit" className="flex items-center cursor-pointer font-normal">
                      <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                      Well-lit paths
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Switch id="busy-areas" defaultChecked />
                    <Label htmlFor="busy-areas" className="flex items-center cursor-pointer font-normal">
                      <Users className="mr-2 h-4 w-4 text-blue-500" />
                      Busy areas
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Switch id="avoid-incidents" defaultChecked />
                    <Label htmlFor="avoid-incidents" className="flex items-center cursor-pointer font-normal">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                      Avoid recent incidents
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Switch id="safe-places" defaultChecked />
                    <Label htmlFor="safe-places" className="flex items-center cursor-pointer font-normal">
                      <Shield className="mr-2 h-4 w-4 text-teal-600" />
                      Near safe places
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                <Navigation className="mr-2 h-4 w-4" />
                Find Safe Route
              </Button>
            </CardFooter>
          </Card>

          <div className="relative w-full h-[300px] mt-6 rounded-lg overflow-hidden border">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                <p className="text-lg font-medium">Route Map</p>
                <p className="text-sm text-muted-foreground">Your safe route will appear here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Options</CardTitle>
              <CardDescription>Based on your preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`rounded-lg border p-4 ${
                    (routeType === "safest" && route.id === 1) ||
                    (routeType === "balanced" && route.id === 2) ||
                    (routeType === "fastest" && route.id === 3)
                      ? "border-teal-600 bg-teal-50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{route.name}</h3>
                    <Badge
                      className={
                        route.safety === "High"
                          ? "bg-green-600"
                          : route.safety === "Medium"
                            ? "bg-amber-600"
                            : "bg-red-600"
                      }
                    >
                      {route.safety} Safety
                    </Badge>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {route.time} walk
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    {route.distance}
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium mr-2">Safety Score:</span>
                      <span className="text-sm">{route.safetyScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          route.safetyScore > 90
                            ? "bg-green-600"
                            : route.safetyScore > 70
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${route.safetyScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {route.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      (routeType === "safest" && route.id === 1) ||
                      (routeType === "balanced" && route.id === 2) ||
                      (routeType === "fastest" && route.id === 3)
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Select Route
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Routes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-teal-600 mr-1" />
                      <span className="font-medium">{route.from}</span>
                      <ChevronRight className="h-4 w-4 mx-1" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{route.used}</p>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Repeat className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </SidebarProvider>
  )
}
