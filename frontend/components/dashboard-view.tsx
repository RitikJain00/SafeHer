"use client"
import { useState } from "react"
import { AlertTriangle, BookOpen, CheckCircle, Compass, MapPin, Phone, Shield, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SafetyMap } from "@/components/safety-map"
import { EmergencyContacts } from "@/components/emergency-contacts"
import { SafetyTips } from "@/components/safety-tips"
import { Badge } from "@/components/ui/badge"
import FakeCall from "./fakecall"
export function DashboardView() {
  
  const [showFakeCall, setShowFakeCall] = useState(false);
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
            <SafetyMap />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              View Full Map
            </Button>
            <Button variant="outline" size="sm">
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
              <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-1"
                  onClick={() => setShowFakeCall(true)}
                >
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Fake Call</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Record Audio</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1">
                  <Phone className="h-5 w-5 text-safe" />
                  <span>Helplines</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1">
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nearby Safe Places</CardTitle>
            <CardDescription>Verified safe locations near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">City Police Station</h4>
                  <p className="text-sm text-muted-foreground">0.8 miles away • Open 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Women's Center</h4>
                  <p className="text-sm text-muted-foreground">1.2 miles away • Open until 10PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-md border">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">24/7 Pharmacy</h4>
                  <p className="text-sm text-muted-foreground">0.5 miles away • Open 24/7</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Safe Places
            </Button>
          </CardFooter>
        </Card>
      </div>
       {/* Modals */}
       {showFakeCall && <FakeCall onClose={() => setShowFakeCall(false)} />}
    </div>
  )
}
