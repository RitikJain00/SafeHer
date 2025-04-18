"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { SOSConfirmDialog } from "@/components/sos-confirm-dialog"

export function SOSButton() {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="sos-button font-bold" size="lg">
            <AlertCircle className="mr-2 h-5 w-5" />
            SOS
          </Button>
        </DialogTrigger>
        <SOSConfirmDialog setShowConfirm={setShowConfirm} />
      </Dialog>
    </>
  )
}
