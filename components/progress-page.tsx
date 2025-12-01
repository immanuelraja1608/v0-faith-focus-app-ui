"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Flame, Target, TrendingUp, Calendar, CheckCircle2 } from "lucide-react"

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

export function ProgressPage() {
  const maxMinutes = Math.max(...weeklyData.map((d) => Math.max(d.minutes, d.goal)))

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Your Journey</h1>
        <p className="text-muted-foreground mt-1">Track your reading progress and build lasting habits</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold text-foreground">42h 30m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="text-2xl font-bold text-foreground">21 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goals Met</p>
                <p className="text-2xl font-bold text-foreground">45 / 60</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chapters Read</p>
                <p className="text-2xl font-bold text-foreground">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="col-span-2 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">This Week</CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Minutes Read</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-border" />
                  <span className="text-muted-foreground">Daily Goal</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4 h-48">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1 relative h-40">
                    {/* Goal line */}
                    <div
                      className="absolute w-full border-t-2 border-dashed border-muted-foreground/30"
                      style={{
                        bottom: `${(day.goal / maxMinutes) * 100}%`,
                      }}
                    />
                    {/* Bar */}
                    <div className="w-full h-full flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          day.minutes >= day.goal ? "bg-primary" : "bg-primary/50"
                        }`}
                        style={{
                          height: `${(day.minutes / maxMinutes) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                  <span className="text-xs text-foreground">{day.minutes}m</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        session.completed ? "bg-green-100" : "bg-muted"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${session.completed ? "text-green-600" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.book}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{session.minutes}m</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Calendar */}
      <Card className="mt-6 border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Streak History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-30 gap-1">
            {Array.from({ length: 60 }).map((_, i) => {
              const isActive = Math.random() > 0.3
              const intensity = isActive ? Math.random() : 0
              return (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm transition-colors ${
                    !isActive
                      ? "bg-secondary"
                      : intensity > 0.7
                        ? "bg-primary"
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
              <div className="w-3 h-3 rounded-sm bg-secondary" />
              <div className="w-3 h-3 rounded-sm bg-primary/30" />
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
