import React from 'react';
import { Shield } from 'lucide-react';




const Header = () => {


  
  return (
    <header className=" z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-purple-600" />
          <span className="font-bold text-2xl">SafeHer</span>
        </div>
  
      </div>
    </header>
  );
};

export default Header;