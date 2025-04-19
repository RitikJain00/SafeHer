"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Camera, MapPin, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ReportIncident() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
      })
    }, 1500)
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
        <h1 className="text-3xl font-bold mb-2">Report an Incident</h1>
        <p className="text-muted-foreground">Help keep your community safe by reporting incidents</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Incident Report Form
            </CardTitle>
            <CardDescription>
              Your report will be kept confidential and helps improve safety for everyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="incident-type">Incident Type</Label>
              <Select required>
                <SelectTrigger id="incident-type">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="assault">Assault</SelectItem>
                  <SelectItem value="vandalism">Vandalism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Severity Level</Label>
              <RadioGroup defaultValue="medium" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="font-normal">
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="font-normal">
                    High
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input id="location" placeholder="Enter location or address" className="flex-1" required />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Click the pin icon to use your current location</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what happened in detail..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Add Photos (Optional)</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop photos or click to upload</p>
                <Button type="button" variant="outline" size="sm">
                  Upload Photos
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="anonymous" />
              <Label htmlFor="anonymous" className="font-normal">
                Submit anonymously
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </SidebarProvider>
  )
}
