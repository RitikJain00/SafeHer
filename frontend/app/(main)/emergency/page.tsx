"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  AlertTriangle,
  Share2,
  MapPin,
  Bell,
  Shield,
  UserCircle,
  MessageSquare,
  Siren,
  Flashlight,
  Volume2,
  Vibrate,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Emergency() {
  const { toast } = useToast()
  const [sosActive, setSosActive] = useState(false)
  const [locationShared, setLocationShared] = useState(false)

  const emergencyContacts = [
    {
      name: "Jane Smith",
      relation: "Sister",
      phone: "555-1234",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "John Doe",
      relation: "Friend",
      phone: "555-5678",
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Johnson",
      relation: "Roommate",
      phone: "555-9012",
      photo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleSOS = () => {
    setSosActive(!sosActive)

    if (!sosActive) {
      toast({
        title: "SOS Mode Activated",
        description: "Emergency contacts will be notified of your location",
        variant: "destructive",
      })
    } else {
      toast({
        title: "SOS Mode Deactivated",
        description: "Emergency mode has been turned off",
      })
    }
  }

  const handleShareLocation = () => {
    setLocationShared(true)

    toast({
      title: "Location Shared",
      description: "Your location has been shared with your emergency contacts",
    })
  }

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
        <h1 className="text-3xl font-bold mb-2">Emergency Help</h1>
        <p className="text-muted-foreground">Quick access to emergency services and features</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-red-700 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Services
              </CardTitle>
              <CardDescription className="text-red-600">
                Call emergency services immediately if you're in danger
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg h-16">
                <Phone className="mr-2 h-5 w-5" />
                Call 911
              </Button>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg h-16">
                <Phone className="mr-2 h-5 w-5" />
                Police Non-Emergency
              </Button>
            </CardContent>
          </Card>

          <Card className={sosActive ? "border-red-500 bg-red-50" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Siren className={`h-5 w-5 mr-2 ${sosActive ? "text-red-600" : ""}`} />
                SOS Emergency Mode
              </CardTitle>
              <CardDescription>
                Activate SOS mode to alert your emergency contacts and share your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Button
                  onClick={handleSOS}
                  size="lg"
                  className={`w-full h-20 text-xl ${
                    sosActive ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {sosActive ? (
                    <>
                      <Siren className="mr-2 h-6 w-6" />
                      SOS ACTIVE - TAP TO CANCEL
                    </>
                  ) : (
                    <>
                      <Siren className="mr-2 h-6 w-6" />
                      ACTIVATE SOS
                    </>
                  )}
                </Button>

                {sosActive && (
                  <div className="rounded-md border border-red-300 bg-red-100 p-4">
                    <h3 className="font-medium text-red-800 mb-2">SOS Mode Active</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Your emergency contacts have been notified with your current location. Stay on this screen until
                      help arrives.
                    </p>
                    <div className="flex items-center justify-between text-sm text-red-700">
                      <span>Location tracking active</span>
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-1 animate-ping"></span>
                        Live
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-medium">SOS Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Switch id="location" defaultChecked />
                      <Label htmlFor="location" className="flex items-center cursor-pointer font-normal">
                        <MapPin className="mr-2 h-4 w-4 text-red-500" />
                        Share location
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Switch id="notifications" defaultChecked />
                      <Label htmlFor="notifications" className="flex items-center cursor-pointer font-normal">
                        <Bell className="mr-2 h-4 w-4 text-amber-500" />
                        Alert contacts
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Switch id="flashlight" defaultChecked />
                      <Label htmlFor="flashlight" className="flex items-center cursor-pointer font-normal">
                        <Flashlight className="mr-2 h-4 w-4 text-blue-500" />
                        Activate flashlight
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Switch id="alarm" defaultChecked />
                      <Label htmlFor="alarm" className="flex items-center cursor-pointer font-normal">
                        <Volume2 className="mr-2 h-4 w-4 text-purple-500" />
                        Sound alarm
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Your Location</CardTitle>
              <CardDescription>Share your current location with emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden border">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                    <p className="text-lg font-medium">Your Location</p>
                    <p className="text-sm text-muted-foreground">Map will display your current location</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-teal-600">Current Location Active</Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleShareLocation}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  disabled={locationShared}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {locationShared ? "Location Shared" : "Share Location"}
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send with Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>People to contact in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={contact.photo || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {contact.relation} • {contact.phone}
                      </p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <UserCircle className="mr-2 h-4 w-4" />
                Add Emergency Contact
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Tools</CardTitle>
              <CardDescription>Quick access to safety features</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center bg-teal-600 hover:bg-teal-700">
                <Flashlight className="h-6 w-6 mb-1" />
                <span>Flashlight</span>
              </Button>

              <Button className="h-20 flex flex-col items-center justify-center bg-red-600 hover:bg-red-700">
                <Volume2 className="h-6 w-6 mb-1" />
                <span>Alarm</span>
              </Button>

              <Button className="h-20 flex flex-col items-center justify-center bg-amber-600 hover:bg-amber-700">
                <Vibrate className="h-6 w-6 mb-1" />
                <span>Fake Call</span>
              </Button>

              <Button className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
                <Shield className="h-6 w-6 mb-1" />
                <span>Safety Tips</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nearby Safe Places</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div>
                  <h4 className="font-medium">Central Police Station</h4>
                  <p className="text-xs text-muted-foreground">0.8 miles away</p>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <MapPin className="mr-2 h-4 w-4" />
                  Directions
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-md border">
                <div>
                  <h4 className="font-medium">Memorial Hospital</h4>
                  <p className="text-xs text-muted-foreground">2.5 miles away</p>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <MapPin className="mr-2 h-4 w-4" />
                  Directions
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-md border">
                <div>
                  <h4 className="font-medium">Downtown Fire Station</h4>
                  <p className="text-xs text-muted-foreground">1.7 miles away</p>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <MapPin className="mr-2 h-4 w-4" />
                  Directions
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Safe Places
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    </SidebarProvider>
  )
}
