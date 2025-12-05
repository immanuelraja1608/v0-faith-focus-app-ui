"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Type, Sun, Moon, Coffee } from "lucide-react"
import { getBibleVersions, getBibleBooks, getBibleChapters, BibleVersion, BibleBook, BibleChapter } from "@/lib/bibleApi"
import { getBibleChapter } from "@/lib/bibleCacheClient"

interface BibleReaderProps {
  timerActive: boolean
  setTimerActive: (active: boolean) => void
  timerSeconds: number
  setTimerSeconds: (seconds: number | ((prev: number) => number)) => void

}



export function BibleReader({ timerActive, setTimerActive, timerSeconds, setTimerSeconds }: BibleReaderProps) {
  const [book, setBook] = useState<string | undefined>(undefined)
  const [currentBookName, setCurrentBookName] = useState<string | undefined>(undefined)
  const [chapter, setChapter] = useState<string | undefined>(undefined)

  const [translation, setTranslation] = useState<string | undefined>(undefined)
  const [isTamilBibleSelected, setIsTamilBibleSelected] = useState(false)
  const [tamilIframeUrl, setTamilIframeUrl] = useState<string | undefined>(undefined)
  const [fontSize, setFontSize] = useState("lg")
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light")

  const [bibleVersions, setBibleVersions] = useState<BibleVersion[]>([])
  const [bibleBooks, setBibleBooks] = useState<BibleBook[]>([])
  const [bibleChapters, setBibleChapters] = useState<BibleChapter[]>([])
  const [chapterContent, setChapterContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch Bible versions on component mount
  useEffect(() => {
    async function fetchVersions() {
      try {
        setIsLoading(true)
        setError(null)
        const versions = await getBibleVersions();
        const filteredVersions = versions.filter(version =>
          (["english", "tamil", "hindi", "malayalam"].includes(version.language.name.toLowerCase()) || version.name === "Tamil Bible (tamilbible.org)")
        );
        setBibleVersions(filteredVersions);
        if (filteredVersions.length > 0) {
          setTranslation(filteredVersions[0].id);
        }
      } catch (err) {
        setError("Failed to load Bible versions.")
        console.error("Error fetching chapter content:", err);
      } finally {
        setIsLoading(false)
      }
    }
    fetchVersions()
  }, [])

  // Fetch books when translation (bibleId) changes
  useEffect(() => {
    async function fetchBooks() {
      if (!translation) return
      try {
        setIsLoading(true)
        setError(null)
        const books = await getBibleBooks(translation)
        setBibleBooks(books)
        if (books.length > 0) {
          setBook(books[0].id)
          setCurrentBookName(books[0].name.toLowerCase())
        }
      } catch (err) {
        setError("Failed to load Bible books.")
        console.error("Error fetching chapter content:", err);
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [translation])

  // Fetch chapters when book changes
  useEffect(() => {
    async function fetchChapters() {
      if (!translation || !book) return
      try {
        setIsLoading(true)
        setError(null)
        const chapters = await getBibleChapters(translation, book)
        setBibleChapters(chapters)
        if (chapters.length > 0) {
          setChapter(chapters[0].id)
        }
      } catch (err) {
        setError("Failed to load Bible chapters.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchChapters()
  }, [translation, book])

  // Fetch chapter content when chapter changes
  useEffect(() => {
    async function fetchChapterContent() {
      if (!translation || !book || !chapter) return

      const selectedVersion = bibleVersions.find(v => v.id === translation)
      console.log("Debug: selectedVersion?.name", selectedVersion?.name)
      const isTamil = selectedVersion?.name === "Indian Revised Version (IRV) Tamil - 2019"

      setIsTamilBibleSelected(isTamil)

      console.log("Debug: isTamilBibleSelected", isTamil)
      console.log("Debug: currentBookName", currentBookName)
      console.log("Debug: chapter", chapter)

      if (isTamil) {
        if (currentBookName && chapter) {
          const chapterNumber = chapter.split('.')[1]
          const newTamilIframeUrl = `https://tamilbible.org/tamil/${currentBookName}/${chapterNumber}`
          setTamilIframeUrl(newTamilIframeUrl)
          setChapterContent(null) // Clear previous content
          setError(null)
          setIsLoading(false)
          console.log("Debug: Tamil iframe URL set to", newTamilIframeUrl)
          return // Moved return here
        }
      }

      console.log("Debug: Fetching chapter content for:", { translation, book, chapter });
      try {
        setIsLoading(true)
        setError(null)
        const content = await getBibleChapter({
          bibleId: translation,
          chapterId: chapter,
        })
        setChapterContent(content.data.content)
      } catch (err) {
        setError("Failed to load chapter content.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchChapterContent()
  }, [translation, book, chapter])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "sepia":
        return "bg-amber-50/80 text-amber-950"
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
      <div className="w-72 border-r border-border bg-gradient-to-b from-card to-secondary/20 p-6 flex flex-col gap-6">
        {/* Language selector */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Language
          </label>
          <Select value={translation} onValueChange={setTranslation}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              {bibleVersions.map((version) => (
                <SelectItem key={version.id} value={version.id}>
                  {version.name} ({version.language.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Book</label>
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select book" />
            </SelectTrigger>
            <SelectContent>
              {bibleBooks.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Chapter
          </label>
          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent>
              {bibleChapters.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>



        {!isTamilBibleSelected && (
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
                className={`flex-1 h-11 rounded-xl flex items-center justify-center ${opt.size} font-serif transition-all ${
                  fontSize === opt.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        )}

        {!isTamilBibleSelected && (
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Theme</label>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 h-11 rounded-xl flex items-center justify-center transition-all ${
                theme === "light"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("sepia")}
              className={`flex-1 h-11 rounded-xl flex items-center justify-center transition-all ${
                theme === "sepia"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Coffee className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 h-11 rounded-xl flex items-center justify-center transition-all ${
                theme === "dark"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
        )}

        <div className="mt-auto">
          <div className="p-5 bg-gradient-to-br from-accent/50 to-primary/10 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Reading Tip</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Take your time with each verse. Let the words settle in your heart before moving on.
            </p>
          </div>
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Timer Banner */}
        <div className="px-8 py-4 border-b border-border bg-card/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {bibleBooks.find(b => b.id === book)?.name} {chapter} ·{" "}
                  {bibleVersions.find(v => v.id === translation)?.name || translation?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Card
                className={`flex items-center gap-3 px-5 py-2.5 border-0 shadow-md transition-all ${
                  timerActive ? "bg-primary/10 border border-primary/20" : "bg-secondary"
                }`}
              >
                <span className="text-sm text-muted-foreground">Session</span>
                <span className={`text-lg font-mono font-semibold ${timerActive ? "text-primary" : "text-foreground"}`}>
                  {formatTime(timerSeconds)}
                </span>
                <Button
                  size="sm"
                  variant={timerActive ? "secondary" : "default"}
                  className="h-9 rounded-full px-5"
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
          <div className="max-w-5xl mx-auto px-6 py-12">
            {isTamilBibleSelected && tamilIframeUrl ? (
              <div className="flex flex-col h-full">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Reading from tamilbible.org – content belongs to the publisher.
                </p>
                <iframe
                  src={tamilIframeUrl}
                  title="Tamil Bible"
                  className="w-full flex-1 border-0"
                  style={{ minHeight: '600px' }}
                ></iframe>
              </div>
            ) : (
              <>
                <h1 className="font-serif text-5xl font-bold mb-3 tracking-tight">John</h1>
                <h2 className="text-lg text-muted-foreground mb-10">Chapter {chapter}</h2>

                <div className={`font-serif ${getFontSizeClass()} leading-loose space-y-6`}>
                  {isLoading && <p className="text-center text-muted-foreground">Loading chapter...</p>}
                  {error && <p className="text-center text-destructive">Error: {error}</p>}
                  {chapterContent && (
                    <>
                      <h1 className="text-3xl font-bold text-center mb-6">
                        {bibleBooks.find(b => b.id === book)?.name} {bibleChapters.find(c => c.id === chapter)?.number}
                      </h1>
                      <div
                        className={`font-serif leading-relaxed ${getFontSizeClass()}`}
                        dangerouslySetInnerHTML={{ __html: chapterContent }}
                      />
                    </>
                  )}
                  {!isLoading && !error && !chapterContent && (
                    <p className="text-center text-muted-foreground">Select a Bible, book, and chapter to read.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="px-8 py-4 border-t border-border bg-card/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <Button variant="ghost" className="gap-2 h-11 rounded-xl">
              <ChevronLeft className="w-4 h-4" />
              Previous Chapter
            </Button>
            <span className="text-sm text-muted-foreground">Chapter {chapter} of 21</span>
            <Button variant="ghost" className="gap-2 h-11 rounded-xl">
              Next Chapter
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
