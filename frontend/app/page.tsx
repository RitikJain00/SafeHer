import HeroSection from "@/components/Home/HeroSection"
import Features from "@/components/Home/Features"
import HowItWorks from "@/components/Home/HowItWorks"

import Faq from "@/components/Home/Faq"
import Cta from "@/components/Home/Cta"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
    <HeroSection />
    <Features />
    <HowItWorks />
    
    <Faq />
    <Cta />
  </div> 
  );
}
