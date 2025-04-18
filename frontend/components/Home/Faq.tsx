import React from 'react'

const Faq = () => {
  return (
    <div>
      <section id="faq" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find answers to common questions about SafeHer and how it can help you.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Is SafeHer available worldwide?</h3>
                <p className="text-muted-foreground">
                  SafeHer is currently available in the United States, Canada, UK, and Australia. We're expanding to
                  more countries soon.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">How does the emergency alert system work?</h3>
                <p className="text-muted-foreground">
                  When you trigger an alert, your trusted contacts receive an SMS and app notification with your
                  real-time location and a message indicating you need help.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Is my data secure and private?</h3>
                <p className="text-muted-foreground">
                  Yes, we take privacy seriously. Your location data is only shared with your explicit permission and
                  with the contacts you choose. We use bank-level encryption for all data.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Is there a cost to use SafeHer?</h3>
                <p className="text-muted-foreground">
                  SafeHer offers a free basic plan with core safety features. Our premium plan includes additional
                  features like 24/7 live support and advanced safety tools for $4.99/month.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Faq