"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HomeDashboard } from "@/components/home-dashboard"
import { BibleReader } from "@/components/bible-reader"
import { ProgressPage } from "@/components/progress-page"
import { AchievementsPage } from "@/components/achievements-page"
import { SettingsPage } from "@/components/settings-page"

export type PageType = "home" | "reader" | "progress" | "achievements" | "settings"

export default function FaithFocusApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard onNavigate={setCurrentPage} />
      case "reader":
        return (
          <BibleReader
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
          />
        )
      case "progress":
        return <ProgressPage />
      case "achievements":
        return <AchievementsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <HomeDashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          timerActive={timerActive}
          setTimerActive={setTimerActive}
          timerSeconds={timerSeconds}
          setTimerSeconds={setTimerSeconds}
        />
        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  )
}
