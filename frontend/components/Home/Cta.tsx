import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

const Cta = () => {
  return (
    <div className='w-full'>
       {/* CTA Section */}
       <section className="mx-auto py-20 bg-purple-600 text-white">
       <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Thousands of Women Feeling Safer Every Day</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-purple-100">
              Download SafeHer today and take control of your personal safety with our comprehensive protection tools.
            </p>
            <Link href="/dashboard" passHref>
              <Button
             className="bg-gray-900  h-11 mt-5 animate-bounce cursor-pointer"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
    </div>
  )
}

export default Cta