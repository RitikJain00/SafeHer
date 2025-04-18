import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Shield, Bell, Search } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { SOSButton } from "@/components/sos-button";



const Header = () => {


  return (
    <header className=" z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-purple-600" />
          <span className="font-bold text-2xl">SafeHer</span>
        </div>

        <SignedOut>
        <SignInButton mode="redirect" forceRedirectUrl="/dashboard" >
         <Button className="bg-purple-600 hover:bg-purple-700">
          Sign In
        </Button>

     </SignInButton>
    </SignedOut>



        <SignedIn>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full pl-9" 
              />
            </div>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            
            <SOSButton />
            
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9',
                  userButtonPopoverCard: 'shadow-xl',
                  userPreviewMainIdentifier: 'font-semibold'
                }
              }}
              afterSignOutUrl="/"
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;