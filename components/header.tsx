"use client"

import { useEffect } from "react"
import { Flame, Timer, Play, Pause, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserData } from "@/app/page"

interface HeaderProps {
  timerActive: boolean
  setTimerActive: (active: boolean) => void
  timerSeconds: number
  setTimerSeconds: (seconds: number | ((prev: number) => number)) => void
  timerPaused: boolean
  setTimerPaused: (paused: boolean) => void
  userData: UserData | null
}

export function Header({
  timerActive,
  setTimerActive,
  timerSeconds,
  setTimerSeconds,
  timerPaused,
  setTimerPaused,
  userData,
}: HeaderProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev: number) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, setTimerSeconds])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const handleResumeTimer = () => {
    setTimerPaused(false)
    setTimerActive(true)
  }

  const firstName = userData?.firstName || "Friend"

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm px-8 flex items-center justify-between">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-medium text-foreground">
          {getGreeting()}, <span className="text-primary">{firstName}</span>
        </h2>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Paused indicator */}
        {timerPaused && timerSeconds > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResumeTimer}
            className="gap-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            <AlertCircle className="w-4 h-4" />
            Timer paused - Click to resume
          </Button>
        )}

        {/* Streak */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-foreground">7 day streak</span>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
            timerActive ? "bg-primary/10 border border-primary/30" : "bg-secondary border border-transparent"
          }`}
        >
          <Timer className={`w-4 h-4 ${timerActive ? "text-primary" : "text-muted-foreground"}`} />
          <span
            className={`text-sm font-mono font-medium min-w-[52px] ${timerActive ? "text-primary" : "text-foreground"}`}
          >
            {formatTime(timerSeconds)}
          </span>
          <Button
            size="sm"
            variant={timerActive ? "secondary" : "default"}
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => setTimerActive(!timerActive)}
          >
            {timerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </Button>
        </div>

        {/* Profile */}
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center hover:from-primary/30 hover:to-accent/40 transition-all">
          <User className="w-5 h-5 text-primary" />
        </button>
      </div>
    </header>
  )
}
