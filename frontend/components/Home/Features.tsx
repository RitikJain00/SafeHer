import React from 'react'
import { Shield, MapPin, Bell, Users, } from "lucide-react"

const Features = () => {
  return (
    <div>
       <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed For Your Safety</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                SafeHer provides comprehensive tools to keep you safe and connected wherever you go.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Location Sharing</h3>
                <p className="text-muted-foreground">
                  Share your location with trusted contacts in real-time during your commute or when you feel unsafe.
                </p>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emergency Alerts</h3>
                <p className="text-muted-foreground">
                  Send instant alerts to emergency contacts with your exact location and situation with one tap.
                </p>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with a network of women in your area to share safety tips and support each other.
                </p>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Safe Route Planning</h3>
                <p className="text-muted-foreground">
                  Get recommendations for the safest routes based on community reports and official crime data.
                </p>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Safety Check-ins</h3>
                <p className="text-muted-foreground">
                  Schedule automatic check-ins that will alert your contacts if you don't respond in time.
                </p>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support Team</h3>
                <p className="text-muted-foreground">
                  Access to our dedicated support team ready to assist you in any emergency situation.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Features