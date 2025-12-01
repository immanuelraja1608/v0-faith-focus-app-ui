"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, Clock, X } from "lucide-react"

interface TimerStartModalProps {
  open: boolean
  onStart: () => void
  onSkip: () => void
  onClose: () => void
}

export function TimerStartModal({ open, onStart, onSkip, onClose }: TimerStartModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="relative h-32 bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]" />
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary-foreground" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl text-center">Ready to read?</DialogTitle>
            <p className="text-center text-muted-foreground mt-2">
              Start your reading timer to track your daily progress and maintain your streak.
            </p>
          </DialogHeader>

          <div className="space-y-3">
            <Button onClick={onStart} className="w-full h-14 text-base rounded-xl" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Timer & Read
            </Button>

            <Button onClick={onSkip} variant="ghost" className="w-full h-12 text-base rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Read without timer
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Tip: The timer pauses automatically when you switch tabs
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
