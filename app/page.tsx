"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HomeDashboard } from "@/components/home-dashboard"
import { BibleReader } from "@/components/bible-reader"
import { ProgressPage } from "@/components/progress-page"
import { AchievementsPage } from "@/components/achievements-page"
import { SettingsPage } from "@/components/settings-page"
import { AuthScreen } from "@/components/auth-screen"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { TimerStartModal } from "@/components/timer-start-modal"

export type PageType = "home" | "reader" | "progress" | "achievements" | "settings"

export interface UserData {
  firstName: string
  preferredLanguage: string
  dailyGoalMinutes: number
}

export default function FaithFocusApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerPaused, setTimerPaused] = useState(false)

  // Auth and onboarding state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const [mounted, setMounted] = useState(false)

  // Timer modal state for Bible reader
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [pendingReaderNavigation, setPendingReaderNavigation] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleVisibilityChange = () => {
      if (document.hidden && timerActive) {
        setTimerPaused(true)
        setTimerActive(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [timerActive, mounted])

  // Navigation handler with timer modal for reader
  const handleNavigate = useCallback(
    (page: PageType) => {
      if (page === "reader" && !timerActive && timerSeconds === 0) {
        setPendingReaderNavigation(true)
        setShowTimerModal(true)
      } else {
        setCurrentPage(page)
      }
    },
    [timerActive, timerSeconds],
  )

  const handleStartReading = () => {
    setTimerActive(true)
    setTimerPaused(false)
    setShowTimerModal(false)
    if (pendingReaderNavigation) {
      setCurrentPage("reader")
      setPendingReaderNavigation(false)
    }
  }

  const handleSkipTimer = () => {
    setShowTimerModal(false)
    if (pendingReaderNavigation) {
      setCurrentPage("reader")
      setPendingReaderNavigation(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data)
    setShowOnboarding(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowOnboarding(false)
    setUserData(null)
    setCurrentPage("home")
  }

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />
  }

  // Show onboarding if authenticated but not completed
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard onNavigate={handleNavigate} userData={userData} />
      case "reader":
        return (
          <BibleReader
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
            preferredLanguage={userData?.preferredLanguage || "english"}
          />
        )
      case "progress":
        return <ProgressPage userData={userData} />
      case "achievements":
        return <AchievementsPage />
      case "settings":
        return <SettingsPage userData={userData} onLogout={handleLogout} />
      default:
        return <HomeDashboard onNavigate={handleNavigate} userData={userData} />
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          timerActive={timerActive}
          setTimerActive={setTimerActive}
          timerSeconds={timerSeconds}
          setTimerSeconds={setTimerSeconds}
          timerPaused={timerPaused}
          setTimerPaused={setTimerPaused}
          userData={userData}
        />
        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
      </div>

      {/* Timer Start Modal */}
      <TimerStartModal
        open={showTimerModal}
        onStart={handleStartReading}
        onSkip={handleSkipTimer}
        onClose={() => {
          setShowTimerModal(false)
          setPendingReaderNavigation(false)
        }}
      />
    </div>
  )
}
