import HeroSection from "@/components/Home/HeroSection"
import Features from "@/components/Home/Features"
import HowItWorks from "@/components/Home/HowItWorks"
import Testimonial from "@/components/Home/Testimonial"
import Faq from "@/components/Home/Faq"
import Cta from "@/components/Home/Cta"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
    <HeroSection />
    <Features />
    <HowItWorks />
    <Testimonial />
    <Faq />
    <Cta />
  </div> 
  );
}
