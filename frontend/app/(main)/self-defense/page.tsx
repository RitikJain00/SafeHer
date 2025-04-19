import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, BookOpen, Video, AlertTriangle, CheckCircle2, ExternalLink, MapPin } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SelfDefense() {
  const techniques = [
    {
      title: "Basic Stance and Awareness",
      level: "Beginner",
      description: "Learn the proper stance and awareness techniques to avoid dangerous situations.",
      steps: [
        "Stand with feet shoulder-width apart",
        "Keep knees slightly bent for stability",
        "Keep hands up in a non-threatening but ready position",
        "Stay aware of your surroundings at all times",
      ],
    },
    {
      title: "Breaking Free from Wrist Grabs",
      level: "Beginner",
      description: "Simple techniques to break free if someone grabs your wrist.",
      steps: [
        "Rotate your arm in the same direction as your thumb",
        "Use your body weight to create momentum",
        "Pull sharply against the weakest point of the grip (usually the thumb)",
        "Move away immediately after breaking free",
      ],
    },
    {
      title: "Palm Strike",
      level: "Intermediate",
      description: "An effective striking technique that reduces risk of injury to your hand.",
      steps: [
        "Keep your hand open with fingers together and slightly bent",
        "Strike with the heel of your palm, not your fingers",
        "Aim for vulnerable areas like the nose or chin",
        "Retract quickly after striking",
      ],
    },
    {
      title: "Basic Blocks",
      level: "Intermediate",
      description: "Defensive techniques to block incoming strikes.",
      steps: [
        "Use your forearm to deflect strikes away from your body",
        "Move your body off the line of attack",
        "Keep your blocking arm strong but not tense",
        "Follow blocks with a quick counter when possible",
      ],
    },
    {
      title: "Escape from Bear Hug",
      level: "Advanced",
      description: "Techniques to escape if someone grabs you from behind.",
      steps: [
        "Lower your center of gravity by bending your knees",
        "Create space by using your elbows against attacker's arms",
        "Step to the side and turn your body",
        "Break the grip and move away quickly",
      ],
    },
  ]

  const safetyTips = [
    {
      title: "Plan Your Route",
      description: "Always plan your route in advance and stick to well-lit, populated areas.",
    },
    {
      title: "Share Your Location",
      description: "Let someone know where you're going and when you expect to arrive.",
    },
    {
      title: "Stay Alert",
      description: "Avoid distractions like headphones or looking at your phone while walking.",
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels wrong, trust your gut and remove yourself from the situation.",
    },
    {
      title: "Use SafeRoutes App",
      description: "Utilize the SafeRoutes app to find the safest path to your destination.",
    },
    {
      title: "Carry Safety Items",
      description: "Consider carrying legal safety items like a whistle or personal alarm.",
    },
  ]

  return (
    <SidebarProvider>
    <div className="flex h-full ">
      {/* Sidebar */}
      <div className="hidden md:block w-52 flex-shrink-0 border-r">
        <AppSidebar />
      </div>

    </div>
    <div className="flex flex-col h-full w-full  mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Self-Defense Resources</h1>
        <p className="text-muted-foreground">Learn techniques and tips to stay safe</p>
      </div>

      <Tabs defaultValue="techniques" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="techniques" className="text-base">
            Self-Defense Techniques
          </TabsTrigger>
          <TabsTrigger value="tips" className="text-base">
            Safety Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="techniques">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Important Disclaimer
              </CardTitle>
              <CardDescription>
                These techniques are for educational purposes only. The best self-defense is awareness and avoidance.
                Always prioritize escape over confrontation when possible.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {techniques.map((technique, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{technique.title}</CardTitle>
                    <Badge
                      className={
                        technique.level === "Beginner"
                          ? "bg-green-600"
                          : technique.level === "Intermediate"
                            ? "bg-amber-600"
                            : "bg-red-600"
                      }
                    >
                      {technique.level}
                    </Badge>
                  </div>
                  <CardDescription>{technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Steps:</h4>
                  <ul className="space-y-2">
                    {technique.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Video className="mr-2 h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Find Self-Defense Classes Near You</CardTitle>
              <CardDescription>
                Learning from qualified instructors is the best way to develop effective self-defense skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                <MapPin className="mr-2 h-4 w-4" />
                Find Classes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-teal-600" />
                Personal Safety Tips
              </CardTitle>
              <CardDescription>Practical advice to help you stay safe in various situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-md border">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Resources</CardTitle>
              <CardDescription>Additional resources to help you stay safe</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Walking Alone at Night</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Stay in well-lit, populated areas</li>
                      <li>Walk confidently and be aware of your surroundings</li>
                      <li>Keep your phone charged but avoid using it while walking</li>
                      <li>Consider using the SafeRoutes app to find the safest path</li>
                      <li>Have your keys ready before you reach your door</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Public Transportation Safety</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Wait in well-lit areas near other people</li>
                      <li>Sit near the driver or in a car with other passengers</li>
                      <li>Stay awake and alert during your journey</li>
                      <li>Keep your belongings secure and close to your body</li>
                      <li>Know the schedule to minimize waiting time</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Using Rideshare Services Safely</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Verify the driver and car details before getting in</li>
                      <li>Share your trip details with a friend or family member</li>
                      <li>Sit in the back seat rather than the front</li>
                      <li>Follow your route on your own phone to ensure you're going the right way</li>
                      <li>
                        Trust your instincts - if something feels wrong, request to be let out in a safe, populated area
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Home Safety Tips</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 ml-6 list-disc">
                      <li>Keep doors and windows locked, even when you're home</li>
                      <li>Install good lighting around entrances</li>
                      <li>Don't hide spare keys outside</li>
                      <li>Consider a security system or camera doorbell</li>
                      <li>Be cautious about sharing your location on social media</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 grid gap-4">
                <Button variant="outline" className="flex justify-between w-full">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Complete Safety Guide PDF</span>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </Button>

                <Button variant="outline" className="flex justify-between w-full">
                  <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Safety Awareness Video Series</span>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </SidebarProvider>
  )
}
