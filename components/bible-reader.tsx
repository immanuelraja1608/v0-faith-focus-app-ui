"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Type, Sun, Moon, Coffee } from "lucide-react"

interface BibleReaderProps {
  timerActive: boolean
  setTimerActive: (active: boolean) => void
  timerSeconds: number
  setTimerSeconds: (seconds: number | ((prev: number) => number)) => void
}

const sampleVerses = [
  {
    number: 1,
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  },
  { number: 2, text: "He was with God in the beginning." },
  {
    number: 3,
    text: "Through him all things were made; without him nothing was made that has been made.",
  },
  {
    number: 4,
    text: "In him was life, and that life was the light of all mankind.",
  },
  {
    number: 5,
    text: "The light shines in the darkness, and the darkness has not overcome it.",
  },
  {
    number: 6,
    text: "There was a man sent from God whose name was John.",
  },
  {
    number: 7,
    text: "He came as a witness to testify concerning that light, so that through him all might believe.",
  },
  {
    number: 8,
    text: "He himself was not the light; he came only as a witness to the light.",
  },
  {
    number: 9,
    text: "The true light that gives light to everyone was coming into the world.",
  },
  {
    number: 10,
    text: "He was in the world, and though the world was made through him, the world did not recognize him.",
  },
  {
    number: 11,
    text: "He came to that which was his own, but his own did not receive him.",
  },
  {
    number: 12,
    text: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God—",
  },
  {
    number: 13,
    text: "children born not of natural descent, nor of human decision or a husband's will, but born of God.",
  },
  {
    number: 14,
    text: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
  },
]

export function BibleReader({ timerActive, setTimerActive, timerSeconds, setTimerSeconds }: BibleReaderProps) {
  const [book, setBook] = useState("john")
  const [chapter, setChapter] = useState("1")
  const [translation, setTranslation] = useState("niv")
  const [fontSize, setFontSize] = useState("lg")
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev: number) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, setTimerSeconds])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "sepia":
        return "bg-amber-50 text-amber-950"
      case "dark":
        return "bg-neutral-900 text-neutral-100"
      default:
        return "bg-card text-foreground"
    }
  }

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-base"
      case "lg":
        return "text-xl"
      case "xl":
        return "text-2xl"
      default:
        return "text-lg"
    }
  }

  return (
    <div className="h-full flex">
      {/* Left Controls Panel */}
      <div className="w-64 border-r border-border bg-card p-6 flex flex-col gap-6">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Book</label>
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select book" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">Genesis</SelectItem>
              <SelectItem value="psalms">Psalms</SelectItem>
              <SelectItem value="proverbs">Proverbs</SelectItem>
              <SelectItem value="matthew">Matthew</SelectItem>
              <SelectItem value="john">John</SelectItem>
              <SelectItem value="romans">Romans</SelectItem>
              <SelectItem value="revelation">Revelation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Chapter
          </label>
          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 21 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Chapter {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Translation
          </label>
          <Select value={translation} onValueChange={setTranslation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Translation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="niv">NIV</SelectItem>
              <SelectItem value="esv">ESV</SelectItem>
              <SelectItem value="kjv">KJV</SelectItem>
              <SelectItem value="nlt">NLT</SelectItem>
              <SelectItem value="nasb">NASB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-border pt-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Font Size
          </label>
          <div className="flex gap-2">
            {[
              { value: "sm", label: "A", size: "text-sm" },
              { value: "md", label: "A", size: "text-base" },
              { value: "lg", label: "A", size: "text-lg" },
              { value: "xl", label: "A", size: "text-xl" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFontSize(opt.value)}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center ${opt.size} font-serif transition-all ${
                  fontSize === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Theme</label>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 h-10 rounded-lg flex items-center justify-center transition-all ${
                theme === "light"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("sepia")}
              className={`flex-1 h-10 rounded-lg flex items-center justify-center transition-all ${
                theme === "sepia"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Coffee className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 h-10 rounded-lg flex items-center justify-center transition-all ${
                theme === "dark"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-4 bg-accent/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Reading Tip</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Take your time with each verse. Let the words settle in your heart before moving on.
            </p>
          </div>
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="flex-1 flex flex-col">
        {/* Timer Banner */}
        <div className="px-8 py-4 border-b border-border bg-card">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  John {chapter} · {translation.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Card className="flex items-center gap-3 px-4 py-2 border-0 bg-secondary shadow-sm">
                <span className="text-sm text-muted-foreground">Session</span>
                <span className="text-lg font-mono font-semibold text-foreground">{formatTime(timerSeconds)}</span>
                <Button
                  size="sm"
                  variant={timerActive ? "secondary" : "default"}
                  className="h-8 rounded-full px-4"
                  onClick={() => setTimerActive(!timerActive)}
                >
                  {timerActive ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Scripture Content */}
        <div className={`flex-1 overflow-y-auto ${getThemeClasses()}`}>
          <div className="max-w-3xl mx-auto px-8 py-12">
            <h1 className="font-serif text-4xl font-bold mb-2 tracking-tight">John</h1>
            <h2 className="text-lg text-muted-foreground mb-8">Chapter {chapter}</h2>

            <div className={`font-serif ${getFontSizeClass()} leading-loose space-y-6`}>
              {sampleVerses.map((verse) => (
                <p key={verse.number} className="scripture-text">
                  <sup className="text-primary font-sans text-xs font-medium mr-2 select-none">{verse.number}</sup>
                  {verse.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="px-8 py-4 border-t border-border bg-card">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Previous Chapter
            </Button>
            <span className="text-sm text-muted-foreground">Chapter {chapter} of 21</span>
            <Button variant="ghost" className="gap-2">
              Next Chapter
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
