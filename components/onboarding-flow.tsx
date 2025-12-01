"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight, Sparkles, Globe, Clock, BookOpen } from "lucide-react"
import type { UserData } from "@/app/page"

interface OnboardingFlowProps {
  onComplete: (data: UserData) => void
}

const languages = [
  { id: "english", label: "English", native: "English" },
  { id: "tamil", label: "Tamil", native: "தமிழ்" },
  { id: "hindi", label: "Hindi", native: "हिन्दी" },
  { id: "malayalam", label: "Malayalam", native: "മലയാളം" },
]

const goalOptions = [
  { minutes: 15, label: "15 min", desc: "Light reading" },
  { minutes: 30, label: "30 min", desc: "Balanced" },
  { minutes: 45, label: "45 min", desc: "Deep study" },
  { minutes: 60, label: "60 min", desc: "Immersive" },
]

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState("")
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(0)

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleComplete = () => {
    onComplete({
      firstName,
      preferredLanguage,
      dailyGoalMinutes,
    })
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return firstName.trim().length >= 2
      case 2:
        return preferredLanguage !== ""
      case 3:
        return dailyGoalMinutes > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center p-8">
      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i + 1 <= step ? "w-12 bg-primary" : "w-8 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <Card className="border-0 shadow-2xl shadow-primary/5 overflow-hidden">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>

              <h1 className="text-3xl font-semibold text-center text-foreground mb-3">Welcome to FaithFocus</h1>
              <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
                Let&apos;s personalize your reading experience. What should we call you?
              </p>

              <div className="max-w-sm mx-auto space-y-3">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-14 text-lg text-center"
                  autoFocus
                />
              </div>

              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="h-14 px-10 rounded-xl text-base"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <Card className="border-0 shadow-2xl shadow-primary/5 overflow-hidden">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <Globe className="w-10 h-10 text-primary" />
                </div>
              </div>

              <h1 className="text-3xl font-semibold text-center text-foreground mb-3">Choose your language</h1>
              <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
                Select your preferred Bible reading language, {firstName}.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setPreferredLanguage(lang.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      preferredLanguage === lang.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 hover:bg-accent/30"
                    }`}
                  >
                    {preferredLanguage === lang.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <p className="text-lg font-medium text-foreground">{lang.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{lang.native}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="h-14 px-10 rounded-xl text-base"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Daily Goal */}
        {step === 3 && (
          <Card className="border-0 shadow-2xl shadow-primary/5 overflow-hidden">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-primary" />
                </div>
              </div>

              <h1 className="text-3xl font-semibold text-center text-foreground mb-3">Set your daily goal</h1>
              <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
                How much time would you like to spend reading each day?
              </p>

              <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
                {goalOptions.map((goal) => (
                  <button
                    key={goal.minutes}
                    onClick={() => setDailyGoalMinutes(goal.minutes)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                      dailyGoalMinutes === goal.minutes
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 hover:bg-accent/30"
                    }`}
                  >
                    {dailyGoalMinutes === goal.minutes && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <p className="text-2xl font-bold text-foreground">{goal.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{goal.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="h-14 px-10 rounded-xl text-base"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="border-0 shadow-2xl shadow-primary/5 overflow-hidden">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Check className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>

              <h1 className="text-3xl font-semibold text-center text-foreground mb-3">
                You&apos;re all set, {firstName}!
              </h1>
              <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
                Your reading journey begins now. Here&apos;s a summary of your preferences:
              </p>

              <div className="max-w-md mx-auto space-y-4 mb-10">
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Language</span>
                  </div>
                  <span className="font-medium text-foreground capitalize">{preferredLanguage}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Daily Goal</span>
                  </div>
                  <span className="font-medium text-foreground">{dailyGoalMinutes} minutes</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleComplete} size="lg" className="h-14 px-10 rounded-xl text-base">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Go to my reading space
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
