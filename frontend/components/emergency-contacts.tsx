"use client"

import { Phone, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmergencyContacts() {
  const contacts = [
    { name: "National Women's Helpline", type: "emergency", phone: "1800-XXX-XXXX" },
    { name: "Local Police Station", type: "police", phone: "100" },
    { name: "Mom", type: "personal", phone: "XXX-XXX-XXXX" },
    { name: "Sister", type: "personal", phone: "XXX-XXX-XXXX" },
    { name: "Roommate", type: "personal", phone: "XXX-XXX-XXXX" },
  ]

  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-md border">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-md ${
                contact.type === "emergency"
                  ? "bg-destructive/10"
                  : contact.type === "police"
                    ? "bg-primary/10"
                    : "bg-muted"
              }`}
            >
              {contact.type === "emergency" ? (
                <Phone className="h-4 w-4 text-destructive" />
              ) : contact.type === "police" ? (
                <Shield className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm">{contact.name}</h4>
              <p className="text-xs text-muted-foreground">{contact.phone}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
