"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SOSButton } from "@/components/sos-button"

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export function DashboardHeader() {
  return (
    <header className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search locations, services..." className="w-full pl-9" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <SOSButton />

       
      </div>
    </header>
  )
}
