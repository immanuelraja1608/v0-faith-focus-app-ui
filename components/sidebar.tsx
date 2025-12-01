"use client"

import type React from "react"
import type { PageType } from "@/app/page"
import { cn } from "@/lib/utils"
import { Home, BookOpen, TrendingUp, Award, Settings, LogOut, Sparkles } from "lucide-react"

interface SidebarProps {
  currentPage: PageType
  onNavigate: (page: PageType) => void
  onLogout: () => void
}

const navItems: { id: PageType; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "reader", label: "Bible Reader", icon: BookOpen },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-sidebar-foreground tracking-tight">FaithFocus</h1>
            <p className="text-xs text-muted-foreground">Read with intention</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-accent/20 text-primary shadow-sm border border-primary/10"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
