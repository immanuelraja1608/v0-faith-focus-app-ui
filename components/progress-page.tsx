"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Flame, Target, TrendingUp, Calendar, CheckCircle2 } from "lucide-react"
import type { UserData } from "@/app/page"

interface ProgressPageProps {
  userData: UserData | null
}

const weeklyData = [
  { day: "Mon", minutes: 45, goal: 60 },
  { day: "Tue", minutes: 60, goal: 60 },
  { day: "Wed", minutes: 32, goal: 60 },
  { day: "Thu", minutes: 60, goal: 60 },
  { day: "Fri", minutes: 55, goal: 60 },
  { day: "Sat", minutes: 75, goal: 60 },
  { day: "Sun", minutes: 24, goal: 60 },
]

const recentSessions = [
  { date: "Today", book: "John 3", minutes: 24, completed: false },
  { date: "Yesterday", book: "John 2", minutes: 60, completed: true },
  { date: "Dec 10", book: "John 1", minutes: 55, completed: true },
  { date: "Dec 9", book: "Matthew 28", minutes: 60, completed: true },
  { date: "Dec 8", book: "Matthew 27", minutes: 45, completed: false },
  { date: "Dec 7", book: "Matthew 26", minutes: 65, completed: true },
]

const streakData = [
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
]

const intensityData = [
  0.8, 0.5, 0, 0.9, 0.6, 0.7, 0.3, 0, 0.5, 0.9, 0.4, 0, 0.7, 0.8, 0.6, 0.5, 0.9, 0, 0, 0.6, 0.8, 0.7, 0.4, 0.9, 0, 0.5,
  0.6, 0.8, 0.7, 0.9, 0, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0, 0.6, 0.8, 0.5, 0.7, 0, 0.9, 0.6, 0.4, 0.8, 0.7, 0.5, 0, 0.6,
  0.8, 0.9, 0.4, 0.7, 0, 0.5, 0.6, 0.8, 0.9,
]

export function ProgressPage({ userData }: ProgressPageProps) {
  const dailyGoal = userData?.dailyGoalMinutes || 60
  const maxMinutes = Math.max(...weeklyData.map((d) => Math.max(d.minutes, dailyGoal)))

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Your Journey</h1>
        <p className="text-muted-foreground mt-1">Track your reading progress and build lasting habits</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Time</p>
            <p className="text-3xl font-bold text-foreground">42h 30m</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Best Streak</p>
            <p className="text-3xl font-bold text-foreground">21 days</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Goals Met</p>
            <p className="text-3xl font-bold text-foreground">45 / 60</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-200">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Chapters Read</p>
            <p className="text-3xl font-bold text-foreground">128</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="col-span-2 border-0 shadow-lg overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">This Week</CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-500" />
                  <span className="text-muted-foreground">Minutes Read</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-dashed border-muted-foreground/50" />
                  <span className="text-muted-foreground">Goal ({dailyGoal}m)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-end justify-between gap-4 h-52">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1 relative h-44">
                    {/* Goal line */}
                    <div
                      className="absolute w-full border-t-2 border-dashed border-primary/30"
                      style={{
                        bottom: `${(dailyGoal / maxMinutes) * 100}%`,
                      }}
                    />
                    {/* Bar */}
                    <div className="w-full h-full flex items-end justify-center px-1">
                      <div
                        className={`w-full max-w-10 rounded-t-xl transition-all duration-500 ${
                          day.minutes >= dailyGoal
                            ? "bg-gradient-to-t from-primary to-purple-500 shadow-lg shadow-primary/20"
                            : "bg-gradient-to-t from-primary/40 to-purple-400/40"
                        }`}
                        style={{
                          height: `${(day.minutes / maxMinutes) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                  <span
                    className={`text-xs font-semibold ${day.minutes >= dailyGoal ? "text-primary" : "text-foreground"}`}
                  >
                    {day.minutes}m
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        session.completed
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-200"
                          : "bg-muted"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${session.completed ? "text-white" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.book}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${session.completed ? "text-primary" : "text-foreground"}`}>
                    {session.minutes}m
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Calendar - Using pre-generated data instead of Math.random() */}
      <Card className="mt-6 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Streak History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-30 gap-1.5">
            {streakData.map((isActive, i) => {
              const intensity = intensityData[i]
              return (
                <div
                  key={i}
                  className={`w-4 h-4 rounded transition-all hover:scale-110 cursor-pointer ${
                    !isActive
                      ? "bg-secondary"
                      : intensity > 0.7
                        ? "bg-gradient-to-br from-primary to-purple-500 shadow-sm"
                        : intensity > 0.4
                          ? "bg-primary/60"
                          : "bg-primary/30"
                  }`}
                  title={`Day ${60 - i}`}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded bg-secondary" />
              <div className="w-3 h-3 rounded bg-primary/30" />
              <div className="w-3 h-3 rounded bg-primary/60" />
              <div className="w-3 h-3 rounded bg-gradient-to-br from-primary to-purple-500" />
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
