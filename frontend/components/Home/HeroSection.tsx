"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {  ArrowRight} from "lucide-react"
import Link from "next/link";


const HeroSection = () => {

  return (
   <div>
      <section className="py-20 md:py-28">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-32">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                Safety for women, by women
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Personal Safety Companion
              </h1>
              <p className="text-xl text-muted-foreground">
                SafeHer empowers women to navigate the world with confidence through real-time safety alerts, community
                support, and emergency assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/dashboard">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
                  Getting Started
                </Button>
                </Link>
                <Button size="lg" variant="outline" className="cursor-pointer">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              
                
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[400px] w-full md:h-[500px] md:w-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/upper.png"
                  alt="SafeHer App"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
               <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-purple-600 hidden md:block" >
               <Image
                  src="/lower.png"
                  alt="SafeHer App"
                  fill
                  className="object-cover"
                  priority
                />
                </div>
            
            </div>
          </div>
        </section>
   </div>
  );
};

export default HeroSection;
