import { PhoneCall, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HelplineModal({ onClose }: { onClose: () => void }) {
  const helplines = [
    { name: "Women's Helpline", number: "1091" },
    { name: "Police", number: "100" },
    { name: "National Commission for Women", number: "7827170170" },
    { name: "Emergency Response Support System", number: "112" },
  ];

  return (
    <Dialog open onOpenChange={onClose} >
      <DialogContent className="max-w-md bg-gray-950">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg flex items-center gap-2">
            <PhoneCall className="h-5 w-5" /> Emergency Helplines
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4 bg-gray-900">
          {helplines.map((line, index) => (
            <div
              key={index}
              className="p-3 border rounded-md flex justify-between items-center bg-muted/10"
            >
              <div>
                <h4 className="font-medium">{line.name}</h4>
                <p className="text-muted-foreground text-sm">Dial: {line.number}</p>
              </div>
              <a href={`tel:${line.number}`}>
                <Button size="sm" variant="outline">
                  Call
                </Button>
              </a>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
