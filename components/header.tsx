"use client"

import { useEffect } from "react"
import { Flame, Timer, Play, Pause, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  timerActive: boolean
  setTimerActive: (active: boolean) => void
  timerSeconds: number
  setTimerSeconds: (seconds: number | ((prev: number) => number)) => void
}

export function Header({ timerActive, setTimerActive, timerSeconds, setTimerSeconds }: HeaderProps) {
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

  return (
    <header className="h-16 border-b border-border bg-card px-8 flex items-center justify-between">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-medium text-foreground">
          {getGreeting()}, <span className="text-primary">Immanuel</span>
        </h2>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-foreground">7 day streak</span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-full">
          <Timer className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono font-medium text-foreground min-w-[52px]">{formatTime(timerSeconds)}</span>
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
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
          <User className="w-5 h-5 text-primary" />
        </button>
      </div>
    </header>
  )
}
