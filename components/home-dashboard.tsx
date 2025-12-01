"use client"

import type { PageType, UserData } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Flame, Trophy, Star, ChevronRight, Sparkles, Clock, Target, TrendingUp } from "lucide-react"

interface HomeDashboardProps {
  onNavigate: (page: PageType) => void
  userData: UserData | null
}

export function HomeDashboard({ onNavigate, userData }: HomeDashboardProps) {
  const dailyGoal = userData?.dailyGoalMinutes || 60
  const minutesCompleted = 24
  const progressPercentage = (minutesCompleted / dailyGoal) * 100

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-accent/5 to-card">
          <CardContent className="p-10">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Today&apos;s Focus</span>
                  </div>
                </div>
                <h2 className="text-4xl font-semibold text-foreground mb-4 tracking-tight leading-tight">
                  Keep the momentum going, {userData?.firstName || "Friend"}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  You&apos;re building a beautiful habit of daily scripture reading. Every minute brings you closer to
                  your goal.
                </p>
                <Button
                  size="lg"
                  className="h-14 rounded-2xl px-8 shadow-lg shadow-primary/20 text-base"
                  onClick={() => onNavigate("reader")}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Continue Reading
                </Button>
              </div>

              {/* Progress Circle - Premium design */}
              <div className="relative w-56 h-56">
                <div className="relative w-full h-full">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-secondary"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                      strokeDasharray={`${2 * Math.PI * 100}`}
                      strokeDashoffset={`${2 * Math.PI * 100 * (1 - progressPercentage / 100)}`}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(260, 80%, 65%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-foreground">{minutesCompleted}</span>
                    <span className="text-sm text-muted-foreground mt-1">of {dailyGoal} min</span>
                    <div className="mt-2 px-3 py-1 bg-primary/10 rounded-full">
                      <span className="text-xs font-medium text-primary">
                        {Math.round(progressPercentage)}% complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {/* Streak Card */}
        <Card className="border-0 shadow-lg premium-card overflow-hidden relative bg-gradient-to-br from-orange-50 to-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">7</span>
              <span className="text-muted-foreground">days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Current Streak</p>
          </CardContent>
        </Card>

        {/* Faith Points Card */}
        <Card className="border-0 shadow-lg premium-card overflow-hidden relative bg-gradient-to-br from-violet-50 to-purple-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Level 5</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">1,240</span>
              <span className="text-muted-foreground">pts</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress to Level 6</span>
                <span>75%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card
          className="border-0 shadow-lg premium-card overflow-hidden cursor-pointer relative bg-gradient-to-br from-amber-50 to-yellow-50/50"
          onClick={() => onNavigate("achievements")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-200">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">12</span>
              <span className="text-muted-foreground">badges</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Achievements</p>
          </CardContent>
        </Card>

        {/* Reading Time Card */}
        <Card className="border-0 shadow-lg premium-card overflow-hidden relative bg-gradient-to-br from-emerald-50 to-teal-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">8.5</span>
              <span className="text-muted-foreground">hrs</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Continue Reading Card */}
        <Card
          className="col-span-2 border-0 shadow-lg premium-card cursor-pointer group overflow-hidden"
          onClick={() => onNavigate("reader")}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Continue where you left off</p>
                <h3 className="text-2xl font-semibold text-foreground mb-2">John 3:16-21</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">The Gospel of John</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Chapter 3</span>
                </div>
              </div>
              <ChevronRight className="w-8 h-8 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
            </div>
          </CardContent>
        </Card>

        {/* Daily Goal Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Daily Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-foreground mb-4">{dailyGoal} minutes</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium text-foreground">{minutesCompleted} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-foreground">{dailyGoal - minutesCompleted} min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scripture Quote */}
      <div className="mt-10 text-center">
        <div className="inline-block px-8 py-6 rounded-2xl bg-accent/30">
          <blockquote className="font-serif text-2xl text-foreground/80 italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
          </blockquote>
          <p className="text-sm text-muted-foreground mt-4">— Psalm 119:105</p>
        </div>
      </div>
    </div>
  )
}
