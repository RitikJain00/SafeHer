"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SafetyTips() {
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    {
      title: "Basic Stance",
      description: "Stand with feet shoulder-width apart, knees slightly bent, and hands up to protect your face.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Palm Strike",
      description: "Use the heel of your palm to strike upward at an attacker's nose or chin.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Elbow Strike",
      description: "Use your elbow to strike an attacker when they are close to you.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)
  }

  return (
    <div className="relative">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-20 h-20 mb-2">
              <img
                src={tips[currentTip].image || "/placeholder.svg"}
                alt={tips[currentTip].title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="font-medium">{tips[currentTip].title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tips[currentTip].description}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-2">
        <Button variant="ghost" size="icon" onClick={prevTip} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1 items-center">
          {tips.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full ${index === currentTip ? "w-4 bg-primary" : "w-1.5 bg-muted"}`}
            />
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={nextTip} className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
