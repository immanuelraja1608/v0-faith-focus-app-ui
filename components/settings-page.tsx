"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { User, Globe, Target, Moon, Bell, LogOut, Save, ChevronRight } from "lucide-react"
import type { UserData } from "@/app/page"

interface SettingsPageProps {
  userData: UserData | null
  onLogout: () => void
}

export function SettingsPage({ userData, onLogout }: SettingsPageProps) {
  const [name, setName] = useState(userData?.firstName || "Immanuel")
  const [email, setEmail] = useState("immanuel@example.com")
  const [language, setLanguage] = useState(userData?.preferredLanguage || "english")
  const [dailyGoal, setDailyGoal] = useState(String(userData?.dailyGoalMinutes || 60))
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [reminderTime, setReminderTime] = useState("09:00")

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your FaithFocus experience</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/5" />
          <CardHeader className="-mt-12 pb-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 border-4 border-card flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="pb-2">
                <CardTitle className="text-xl font-semibold">{name}</CardTitle>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  First Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reading Preferences */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Reading Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium">
                  Daily Reading Goal
                </Label>
                <Select value={dailyGoal} onValueChange={setDailyGoal}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">
                  Preferred Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="tamil">Tamil (தமிழ்)</SelectItem>
                    <SelectItem value="hindi">Hindi (हिन्दी)</SelectItem>
                    <SelectItem value="malayalam">Malayalam (മലയാളം)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch to a darker color scheme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="py-4">
              <p className="font-medium text-foreground mb-4">Reader Theme</p>
              <div className="flex gap-4">
                {[
                  {
                    name: "Light",
                    bg: "bg-white",
                    text: "text-neutral-900",
                    border: "border-neutral-200",
                    active: true,
                  },
                  {
                    name: "Sepia",
                    bg: "bg-amber-50",
                    text: "text-amber-900",
                    border: "border-amber-200",
                    active: false,
                  },
                  {
                    name: "Dark",
                    bg: "bg-neutral-900",
                    text: "text-neutral-100",
                    border: "border-neutral-700",
                    active: false,
                  },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    className={`flex-1 p-5 rounded-2xl border-2 transition-all ${theme.border} ${theme.bg} ${
                      theme.active ? "ring-2 ring-primary ring-offset-2" : "hover:border-primary/50"
                    }`}
                  >
                    <p className={`text-sm font-medium ${theme.text}`}>{theme.name}</p>
                    <p className={`text-xs mt-1 opacity-60 ${theme.text}`}>Sample text</p>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded to read every day</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            {notifications && (
              <div className="space-y-2 pb-4 border-b border-border">
                <Label htmlFor="reminder" className="text-sm font-medium">
                  Reminder Time
                </Label>
                <Input
                  id="reminder"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="h-12 rounded-xl w-48"
                />
              </div>
            )}
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-foreground">Streak Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when your streak is at risk</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {["Export Reading Data", "Privacy Settings", "Help & Support"].map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary/60 transition-colors"
              >
                <span className="text-foreground">{item}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={onLogout}
            className="rounded-xl h-12 px-6 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent border-destructive/30"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button className="rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
