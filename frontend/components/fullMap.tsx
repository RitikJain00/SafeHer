// FullMapModal.tsx
"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import  Map  from "./map"

interface FullMapModalProps {
  open: boolean
  onClose: () => void
  isLoaded: boolean
}

export default function FullMapModal({ open, onClose, isLoaded }: FullMapModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full p-0 overflow-hidden">
        {isLoaded ? (
          <div className="w-screen h-screen">
            <Map />
          </div>
        ) : (
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            <p className="ml-3 text-muted-foreground">Loading full map...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
