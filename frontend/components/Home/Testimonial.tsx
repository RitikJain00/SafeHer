import React from 'react'
import Image from "next/image"
import {Star } from "lucide-react"


const Testimonial = () => {
  return (
    <div>
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 ">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from women who have experienced the safety and peace of mind that SafeHer provides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  "SafeHer has completely changed how I feel walking home at night. The location sharing feature gives
                  me and my family peace of mind."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="https://randomuser.me/api/portraits/women/55.jpg" alt="Sarah T." width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="font-bold">Riya Verma</h4>
                    <p className="text-sm text-muted-foreground">Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  "The community feature is amazing. I've connected with other women in my area and we look out for each
                  other. It's empowering."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="https://randomuser.me/api/portraits/women/38.jpg" alt="Maria L." width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="font-bold">Priyanka Singh</h4>
                    <p className="text-sm text-muted-foreground">Bangalore, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted-50 p-8 rounded-xl shadow-sm border">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  "When I had an emergency, the alert system worked perfectly. My contacts were notified immediately
                  with my exact location."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="https://randomuser.me/api/portraits/women/22.jpg" alt="Jennifer K." width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="font-bold">Anjali</h4>
                    <p className="text-sm text-muted-foreground">Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Testimonial