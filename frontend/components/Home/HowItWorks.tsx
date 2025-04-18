import React from 'react'



const HowItWorks = () => {
  return (
    <div>
       {/* How It Works Section */}
       <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How SafeHer Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Getting started with SafeHer is easy. Follow these simple steps to enhance your personal safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div
                    className="absolute top-0 left-full h-0.5 w-full bg-purple-200 hidden md:block"
                    style={{ width: "calc(100% - 4rem)", left: "4rem" }}
                  ></div>
                </div>
                <h3 className="text-xl font-bold mb-3">Download & Sign Up</h3>
                <p className="text-muted-foreground">
                  Download the SafeHer app from your app store and create your secure account in minutes.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div
                    className="absolute top-0 left-full h-0.5 w-full bg-purple-200 hidden md:block"
                    style={{ width: "calc(100% - 4rem)", left: "4rem" }}
                  ></div>
                </div>
                <h3 className="text-xl font-bold mb-3">Add Trusted Contacts</h3>
                <p className="text-muted-foreground">
                  Add family and friends to your trusted contacts list who will receive alerts when needed.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div
                    className="absolute top-0 left-full h-0.5 w-full bg-purple-200 hidden md:block"
                    style={{ width: "calc(100% - 4rem)", left: "4rem" }}
                  ></div>
                </div>
                <h3 className="text-xl font-bold mb-3">Stay Protected</h3>
                <p className="text-muted-foreground">
                  Use SafeHer's features whenever you need them - commuting, traveling, or in unfamiliar areas.
                </p>
              </div>
            </div>

      
          </div>
        </section>
    </div>
  )
}

export default HowItWorks