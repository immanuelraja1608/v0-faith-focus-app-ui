"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles, Star, Trophy, X } from "lucide-react"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
}

const badges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first reading session",
    icon: "👣",
    unlocked: true,
    rarity: "common",
    unlockedAt: "Nov 15, 2024",
  },
  {
    id: "2",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlocked: true,
    rarity: "common",
    unlockedAt: "Nov 22, 2024",
  },
  {
    id: "3",
    name: "Gospel Explorer",
    description: "Read all four Gospels",
    icon: "📖",
    unlocked: true,
    rarity: "rare",
    unlockedAt: "Dec 1, 2024",
  },
  {
    id: "4",
    name: "Early Bird",
    description: "Complete 10 morning reading sessions",
    icon: "🌅",
    unlocked: true,
    rarity: "common",
    unlockedAt: "Nov 28, 2024",
  },
  {
    id: "5",
    name: "Night Owl",
    description: "Complete 10 evening reading sessions",
    icon: "🦉",
    unlocked: true,
    rarity: "common",
    unlockedAt: "Dec 5, 2024",
  },
  {
    id: "6",
    name: "Dedicated Reader",
    description: "Read for 10 hours total",
    icon: "⏱️",
    unlocked: true,
    rarity: "rare",
    unlockedAt: "Dec 8, 2024",
  },
  {
    id: "7",
    name: "Psalm Master",
    description: "Read all 150 Psalms",
    icon: "🎵",
    unlocked: false,
    rarity: "epic",
  },
  {
    id: "8",
    name: "Month Master",
    description: "Maintain a 30-day streak",
    icon: "📅",
    unlocked: false,
    rarity: "epic",
  },
  {
    id: "9",
    name: "Bible Scholar",
    description: "Read the entire Bible",
    icon: "✝️",
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: "10",
    name: "Wisdom Seeker",
    description: "Complete Proverbs and Ecclesiastes",
    icon: "💎",
    unlocked: true,
    rarity: "rare",
    unlockedAt: "Dec 10, 2024",
  },
  {
    id: "11",
    name: "Century Club",
    description: "Read for 100 hours total",
    icon: "💯",
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: "12",
    name: "Perfect Week",
    description: "Meet your daily goal every day for a week",
    icon: "⭐",
    unlocked: true,
    rarity: "rare",
    unlockedAt: "Dec 3, 2024",
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "from-slate-50 to-slate-100 border-slate-200"
    case "rare":
      return "from-blue-50 to-indigo-50 border-blue-200"
    case "epic":
      return "from-violet-50 to-purple-50 border-purple-200"
    case "legendary":
      return "from-amber-50 to-orange-50 border-amber-200"
    default:
      return "from-slate-50 to-slate-100 border-slate-200"
  }
}

const getRarityGradient = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "from-slate-400 to-slate-500"
    case "rare":
      return "from-blue-400 to-indigo-500"
    case "epic":
      return "from-violet-400 to-purple-500"
    case "legendary":
      return "from-amber-400 to-orange-500"
    default:
      return "from-slate-400 to-slate-500"
  }
}

const getRarityBadge = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gradient-to-r from-slate-400 to-slate-500"
    case "rare":
      return "bg-gradient-to-r from-blue-400 to-indigo-500"
    case "epic":
      return "bg-gradient-to-r from-violet-400 to-purple-500"
    case "legendary":
      return "bg-gradient-to-r from-amber-400 to-orange-500"
    default:
      return "bg-gradient-to-r from-slate-400 to-slate-500"
  }
}

export function AchievementsPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Achievements</h1>
        <p className="text-muted-foreground mt-1">Celebrate your milestones and keep growing in faith</p>
      </div>

      {/* Stats - Fixed card positioning */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Badges</p>
            <p className="text-3xl font-bold text-foreground">
              {unlockedCount} <span className="text-lg text-muted-foreground font-normal">/ {badges.length}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-200">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Faith Points</p>
            <p className="text-3xl font-bold text-foreground">1,240</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Rarest Badge</p>
            <p className="text-lg font-bold text-foreground">Gospel Explorer</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 pointer-events-none" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-xl">🎯</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Next Goal</p>
            <p className="text-lg font-bold text-foreground">Month Master</p>
          </CardContent>
        </Card>
      </div>

      {/* Badge Grid */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Your Collection</CardTitle>
            <div className="flex items-center gap-3 text-xs">
              {["common", "rare", "epic", "legendary"].map((rarity) => (
                <div key={rarity} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getRarityGradient(rarity)}`} />
                  <span className="text-muted-foreground capitalize">{rarity}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} hover:shadow-xl`
                    : "bg-muted/30 border-muted/50 hover:bg-muted/50"
                }`}
              >
                {/* Rarity indicator */}
                {badge.unlocked && (
                  <div
                    className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r ${getRarityGradient(badge.rarity)} shadow-sm`}
                  />
                )}

                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`text-5xl transition-transform ${badge.unlocked ? "hover:scale-110" : "grayscale opacity-30"}`}
                  >
                    {badge.unlocked ? badge.icon : <Lock className="w-10 h-10 text-muted-foreground" />}
                  </div>
                  <div className="text-center">
                    <p
                      className={`font-medium text-sm ${badge.unlocked ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {badge.name}
                    </p>
                    {badge.unlocked && badge.unlockedAt && (
                      <p className="text-xs text-muted-foreground mt-1">{badge.unlockedAt}</p>
                    )}
                    {!badge.unlocked && <p className="text-xs text-muted-foreground mt-1">Locked</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedBadge(null)}
        >
          <Card className="w-[420px] border-0 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header gradient based on rarity */}
            <div className={`h-28 bg-gradient-to-br ${getRarityGradient(selectedBadge.rarity)} relative`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2),transparent)]" />
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <CardContent className="p-8 text-center -mt-12 relative">
              <div
                className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center text-5xl border-4 border-card shadow-xl bg-gradient-to-br ${
                  selectedBadge.unlocked ? getRarityColor(selectedBadge.rarity) : "from-muted to-muted/80"
                }`}
              >
                {selectedBadge.unlocked ? selectedBadge.icon : <Lock className="w-12 h-12 text-muted-foreground" />}
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3">{selectedBadge.name}</h3>

              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-5 ${getRarityBadge(selectedBadge.rarity)}`}
              >
                {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
              </span>

              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedBadge.description}</p>

              {selectedBadge.unlocked && selectedBadge.unlockedAt && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm text-primary font-medium">Unlocked on {selectedBadge.unlockedAt}</p>
                </div>
              )}

              {!selectedBadge.unlocked && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground">Keep reading to unlock this achievement!</p>
                </div>
              )}

              <Button onClick={() => setSelectedBadge(null)} className="mt-6 rounded-xl h-12 px-8" variant="outline">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
