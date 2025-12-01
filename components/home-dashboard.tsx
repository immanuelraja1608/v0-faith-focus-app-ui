"use client"

import type { PageType } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Flame, Trophy, Star, ChevronRight, Sparkles } from "lucide-react"

interface HomeDashboardProps {
  onNavigate: (page: PageType) => void
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const progressPercentage = (24 / 60) * 100

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-accent/30">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Today&apos;s Focus</span>
                </div>
                <h2 className="text-3xl font-semibold text-foreground mb-2 tracking-tight">Keep the momentum going</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You&apos;re building a beautiful habit of daily scripture reading. Every minute counts.
                </p>
                <Button size="lg" className="rounded-full px-8 shadow-md" onClick={() => onNavigate("reader")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Reading
                </Button>
              </div>

              {/* Progress Circle */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-primary transition-all duration-1000"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercentage / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">24</span>
                  <span className="text-sm text-muted-foreground">of 60 min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Streak Card */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">7</span>
              <span className="text-muted-foreground">days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">You&apos;re on fire! Keep it up 🔥</p>
          </CardContent>
        </Card>

        {/* Rewards Card */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Faith Points</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">1,240</span>
              <span className="text-muted-foreground">pts</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Level 5</span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Preview */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">12</span>
              <span className="text-muted-foreground">badges</span>
            </div>
            <div className="flex gap-1 mt-2">
              {["🌟", "📖", "🔥", "✝️"].map((emoji, i) => (
                <span key={i} className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
                  {emoji}
                </span>
              ))}
              <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs text-muted-foreground">
                +8
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Reading Card */}
      <Card
        className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
        onClick={() => onNavigate("reader")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Continue where you left off</p>
                <h3 className="text-xl font-semibold text-foreground">John 3:16-21</h3>
                <p className="text-sm text-muted-foreground mt-1">The Gospel of John • Chapter 3</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>

      {/* Scripture Quote */}
      <div className="mt-8 text-center">
        <blockquote className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
          &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
        </blockquote>
        <p className="text-sm text-muted-foreground mt-3">— Psalm 119:105</p>
      </div>
    </div>
  )
}
