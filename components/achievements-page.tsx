"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Sparkles, Star, Trophy } from "lucide-react"

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
      return "from-slate-100 to-slate-200 border-slate-300"
    case "rare":
      return "from-blue-50 to-blue-100 border-blue-300"
    case "epic":
      return "from-purple-50 to-purple-100 border-purple-300"
    case "legendary":
      return "from-amber-50 to-amber-100 border-amber-300"
    default:
      return "from-slate-100 to-slate-200 border-slate-300"
  }
}

const getRarityBadge = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-slate-500"
    case "rare":
      return "bg-blue-500"
    case "epic":
      return "bg-purple-500"
    case "legendary":
      return "bg-amber-500"
    default:
      return "bg-slate-500"
  }
}

export function AchievementsPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Achievements</h1>
        <p className="text-muted-foreground mt-1">Celebrate your milestones and keep growing in faith</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Badges</p>
              <p className="text-2xl font-bold text-foreground">
                {unlockedCount} / {badges.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faith Points</p>
              <p className="text-2xl font-bold text-foreground">1,240</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rarest Badge</p>
              <p className="text-lg font-bold text-foreground">Gospel Explorer</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Goal</p>
              <p className="text-lg font-bold text-foreground">Month Master</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badge Grid */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} hover:shadow-lg`
                    : "bg-muted/50 border-muted hover:bg-muted/70"
                }`}
              >
                {/* Rarity indicator */}
                {badge.unlocked && (
                  <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${getRarityBadge(badge.rarity)}`} />
                )}

                <div className="flex flex-col items-center gap-3">
                  <div className={`text-4xl ${badge.unlocked ? "" : "grayscale opacity-40"}`}>
                    {badge.unlocked ? badge.icon : <Lock className="w-8 h-8" />}
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedBadge(null)}
        >
          <Card className="w-96 border-0 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8 text-center">
              <div
                className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center text-5xl bg-gradient-to-br ${
                  selectedBadge.unlocked ? getRarityColor(selectedBadge.rarity) : "from-muted to-muted"
                }`}
              >
                {selectedBadge.unlocked ? selectedBadge.icon : <Lock className="w-12 h-12 text-muted-foreground" />}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{selectedBadge.name}</h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4 ${getRarityBadge(
                  selectedBadge.rarity,
                )}`}
              >
                {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
              </span>
              <p className="text-muted-foreground mb-4">{selectedBadge.description}</p>
              {selectedBadge.unlocked && selectedBadge.unlockedAt && (
                <p className="text-sm text-primary font-medium">Unlocked on {selectedBadge.unlockedAt}</p>
              )}
              {!selectedBadge.unlocked && (
                <p className="text-sm text-muted-foreground italic">Keep reading to unlock this achievement!</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
