import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Phone, Copy } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface ShareLocationModalProps {
  onClose: () => void;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function ShareLocationModal({ onClose, location }: ShareLocationModalProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  const whatsappLink = `https://wa.me/?text=My%20location:%20${encodeURIComponent(mapLink)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mapLink);
    toast({ description: "Location link copied to clipboard!" });
  };

  const handleConfirm = async () => {
    setSending(true);

    const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    try {
      const requestBody = {
        message: `🚨 SOS! I need help. My location: ${googleMapsUrl}`,
        contacts: ["+919343334022"], // Replace with actual numbers
      };

      const res = await axios.post("http://localhost:5000/sos", requestBody);

      if (res.data.success) {
        setSent(true);
        toast({ description: "🚀 SOS sent successfully!" });
      } else {
        toast({ description: "❌ Failed to send SOS." });
      }
    } catch (err) {
      console.error("SOS Error:", err);
      toast({ description: "❌ Could not send SOS. Please try again." });
    }

    setSending(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-gray-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Share Your Location
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Label className="text-sm text-muted-foreground">Google Maps Link</Label>
          <div className="flex gap-2">
            <Input type="text" value={mapLink} readOnly className="text-xs text-white" />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-muted-foreground text-sm">Choose how you'd like to share:</p>
          <div className="flex justify-around">
            <Button
              variant="outline"
              onClick={() => window.open(whatsappLink, "_blank")}
              className="flex gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={handleConfirm}
              disabled={sending}
              className="flex gap-2"
            >
              <Phone className="h-4 w-4" />
              {sending ? "Sending..." : sent ? "Sent!" : "Send SOS"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
