import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Shield, Heart, AlertTriangle, Headphones, Building2 } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Helpline() {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      description: "Police, Fire, Ambulance",
      icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
    },
    {
      name: "Police Non-Emergency",
      number: "555-1234",
      description: "For non-urgent police matters",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
    },
    {
      name: "Crisis Helpline",
      number: "1-800-555-HELP",
      description: "24/7 crisis support and counseling",
      icon: <Headphones className="h-10 w-10 text-purple-500" />,
    },
  ]

  const supportServices = [
    {
      name: "Women's Safety Helpline",
      number: "1-800-555-SAFE",
      description: "Support for women in distress",
      icon: <Heart className="h-10 w-10 text-pink-500" />,
    },
    {
      name: "Mental Health Support",
      number: "1-800-555-MIND",
      description: "Mental health crisis support",
      icon: <Heart className="h-10 w-10 text-green-500" />,
    },
    {
      name: "Community Support Center",
      number: "555-7890",
      description: "Local community assistance",
      icon: <Building2 className="h-10 w-10 text-amber-500" />,
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
        <h1 className="text-3xl font-bold mb-2">Emergency Helplines</h1>
        <p className="text-muted-foreground">Important contacts for emergency situations</p>
      </div>

      <Tabs defaultValue="emergency" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="emergency" className="text-base">
            Emergency Contacts
          </TabsTrigger>
          <TabsTrigger value="support" className="text-base">
            Support Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-red-700 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                In Immediate Danger?
              </CardTitle>
              <CardDescription className="text-red-600">
                If you're in immediate danger, call 911 immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Call 911
              </Button>
            </CardContent>
          </Card>

          {emergencyContacts.map((contact, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-muted flex items-center justify-center">{contact.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{contact.name}</h3>
                    <p className="text-muted-foreground mb-2">{contact.description}</p>
                    <p className="text-2xl font-bold">{contact.number}</p>
                  </div>
                  <Button size="icon" className="rounded-full h-12 w-12 bg-teal-600 hover:bg-teal-700">
                    <Phone className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          {supportServices.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-muted flex items-center justify-center">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{service.name}</h3>
                    <p className="text-muted-foreground mb-2">{service.description}</p>
                    <p className="text-2xl font-bold">{service.number}</p>
                  </div>
                  <Button size="icon" className="rounded-full h-12 w-12 bg-teal-600 hover:bg-teal-700">
                    <Phone className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Other helpful services and information</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Local Shelters Directory</h4>
                  <p className="text-sm text-muted-foreground">Find safe shelters in your area</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  View
                </Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-md border">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Support Groups</h4>
                  <p className="text-sm text-muted-foreground">Connect with community support groups</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  View
                </Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-md border">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Legal Aid Services</h4>
                  <p className="text-sm text-muted-foreground">Free or low-cost legal assistance</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </SidebarProvider>
  )
}
