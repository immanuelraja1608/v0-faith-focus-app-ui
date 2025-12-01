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
  preferredLanguage: string
}

const bibleContent: Record<string, { number: number; text: string }[]> = {
  english: [
    { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    { number: 2, text: "He was with God in the beginning." },
    { number: 3, text: "Through him all things were made; without him nothing was made that has been made." },
    { number: 4, text: "In him was life, and that life was the light of all mankind." },
    { number: 5, text: "The light shines in the darkness, and the darkness has not overcome it." },
    { number: 6, text: "There was a man sent from God whose name was John." },
    {
      number: 7,
      text: "He came as a witness to testify concerning that light, so that through him all might believe.",
    },
    { number: 8, text: "He himself was not the light; he came only as a witness to the light." },
    { number: 9, text: "The true light that gives light to everyone was coming into the world." },
    {
      number: 10,
      text: "He was in the world, and though the world was made through him, the world did not recognize him.",
    },
    { number: 11, text: "He came to that which was his own, but his own did not receive him." },
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
  ],
  tamil: [
    { number: 1, text: "ஆதியிலே வார்த்தை இருந்தது, அந்த வார்த்தை தேவனிடத்திலிருந்தது, அந்த வார்த்தை தேவனாயிருந்தது." },
    { number: 2, text: "அவர் ஆதியிலே தேவனோடிருந்தார்." },
    { number: 3, text: "சகலமும் அவர் மூலமாய் உண்டாயிற்று; உண்டானதொன்றும் அவராலேயன்றி உண்டாகவில்லை." },
    { number: 4, text: "அவருக்குள் ஜீவன் இருந்தது, அந்த ஜீவன் மனுஷருக்கு ஒளியாயிருந்தது." },
    { number: 5, text: "அந்த ஒளி இருளிலே பிரகாசிக்கிறது; இருளானது அதைப் பற்றிக்கொள்ளவில்லை." },
    { number: 6, text: "தேவனால் அனுப்பப்பட்ட ஒரு மனுஷன் இருந்தான், அவன் பேர் யோவான்." },
    { number: 7, text: "அவன் அந்த ஒளியைக்குறித்துச் சாட்சிகொடுக்கவும், எல்லாரும் அவன் மூலமாய் விசுவாசிக்கவும் சாட்சியாக வந்தான்." },
    { number: 8, text: "அவன் அந்த ஒளியல்ல, அந்த ஒளியைக்குறித்துச் சாட்சிகொடுக்க வந்தவனாயிருந்தான்." },
    { number: 9, text: "எந்த மனுஷனையும் பிரகாசிப்பிக்கிற மெய்யான ஒளி உலகத்திலே வந்தது." },
    { number: 10, text: "அவர் உலகத்தில் இருந்தார், உலகம் அவர் மூலமாய் உண்டாயிற்று, உலகமோ அவரை அறியவில்லை." },
  ],
  hindi: [
    { number: 1, text: "आदि में वचन था, और वचन परमेश्‍वर के साथ था, और वचन परमेश्‍वर था।" },
    { number: 2, text: "यही आदि में परमेश्‍वर के साथ था।" },
    { number: 3, text: "सब कुछ उसी के द्वारा उत्पन्‍न हुआ, और जो कुछ उत्पन्‍न हुआ है उसमें से कुछ भी उसके बिना उत्पन्‍न नहीं हुआ।" },
    { number: 4, text: "उसमें जीवन था, और वह जीवन मनुष्यों की ज्योति थी।" },
    { number: 5, text: "और ज्योति अंधकार में चमकती है, और अंधकार ने उसे ग्रहण नहीं किया।" },
    { number: 6, text: "एक मनुष्य परमेश्‍वर की ओर से आया जिसका नाम यूहन्ना था।" },
    { number: 7, text: "यह गवाही देने आया कि ज्योति की गवाही दे, ताकि सब उसके द्वारा विश्‍वास लाएँ।" },
    { number: 8, text: "वह आप तो वह ज्योति नहीं था, परन्तु उस ज्योति की गवाही देने आया था।" },
    { number: 9, text: "सच्‍ची ज्योति जो हर एक मनुष्य को प्रकाशित करती है, जगत में आनेवाली थी।" },
    { number: 10, text: "वह जगत में था, और जगत उसके द्वारा उत्पन्‍न हुआ, और जगत ने उसे नहीं पहचाना।" },
  ],
  malayalam: [
    { number: 1, text: "ആദിയിൽ വചനം ഉണ്ടായിരുന്നു; വചനം ദൈവത്തോടുകൂടെ ആയിരുന്നു; വചനം ദൈവം ആയിരുന്നു." },
    { number: 2, text: "അവൻ ആദിയിൽ ദൈവത്തോടുകൂടെ ആയിരുന്നു." },
    { number: 3, text: "സകലവും അവൻ മുഖാന്തരം ഉണ്ടായി; ഉണ്ടായതൊന്നും അവനെ കൂടാതെ ഉണ്ടായതല്ല." },
    { number: 4, text: "അവനിൽ ജീവൻ ഉണ്ടായിരുന്നു; ജീവൻ മനുഷ്യരുടെ വെളിച്ചമായിരുന്നു." },
    { number: 5, text: "വെളിച്ചം ഇരുളിൽ പ്രകാശിക്കുന്നു; ഇരുൾ അതിനെ പിടിച്ചടക്കിയിട്ടില്ല." },
    { number: 6, text: "ദൈവം അയച്ച ഒരു മനുഷ്യൻ ഉണ്ടായി; അവന്റെ പേർ യോഹന്നാൻ." },
    { number: 7, text: "അവൻ സാക്ഷ്യത്തിനായി, വെളിച്ചത്തെക്കുറിച്ചു സാക്ഷ്യം പറവാൻ തന്നേ, എല്ലാവരും അവൻ മുഖാന്തരം വിശ്വസിക്കേണ്ടതിന്നു വന്നു." },
    { number: 8, text: "അവൻ വെളിച്ചം അല്ല, വെളിച്ചത്തെക്കുറിച്ചു സാക്ഷ്യം പറവാൻ വന്നവനത്രേ." },
    { number: 9, text: "സകല മനുഷ്യരെയും പ്രകാശിപ്പിക്കുന്ന സത്യവെളിച്ചം ലോകത്തിലേക്കു വന്നുകൊണ്ടിരുന്നു." },
    { number: 10, text: "അവൻ ലോകത്തിൽ ഉണ്ടായിരുന്നു; ലോകം അവൻ മുഖാന്തരം ഉണ്ടായി; ലോകമോ അവനെ അറിഞ്ഞില്ല." },
  ],
}

const translations: Record<string, { id: string; name: string }[]> = {
  english: [
    { id: "niv", name: "NIV" },
    { id: "esv", name: "ESV" },
    { id: "kjv", name: "KJV" },
    { id: "nlt", name: "NLT" },
    { id: "nasb", name: "NASB" },
  ],
  tamil: [
    { id: "tbov", name: "Tamil Bible OV" },
    { id: "tbcl", name: "Tamil Bible CL" },
    { id: "tbrc", name: "Tamil Bible RC" },
  ],
  hindi: [
    { id: "hhb", name: "Hindi Holy Bible" },
    { id: "hcl", name: "Hindi CL" },
    { id: "irv", name: "IRV Hindi" },
  ],
  malayalam: [
    { id: "mbov", name: "Malayalam OV" },
    { id: "mbcl", name: "Malayalam CL" },
    { id: "mbrc", name: "Malayalam RC" },
  ],
}

export function BibleReader({ timerActive, setTimerActive, timerSeconds, preferredLanguage }: BibleReaderProps) {
  const [book, setBook] = useState("john")
  const [chapter, setChapter] = useState("1")
  const [language, setLanguage] = useState(preferredLanguage)
  const [translation, setTranslation] = useState(translations[preferredLanguage]?.[0]?.id || "niv")
  const [fontSize, setFontSize] = useState("lg")
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light")

  // Update translation when language changes
  useEffect(() => {
    setTranslation(translations[language]?.[0]?.id || "niv")
  }, [language])

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

  const currentVerses = bibleContent[language] || bibleContent.english
  const currentTranslations = translations[language] || translations.english

  return (
    <div className="h-full flex">
      {/* Left Controls Panel */}
      <div className="w-72 border-r border-border bg-gradient-to-b from-card to-secondary/20 p-6 flex flex-col gap-6">
        {/* Language selector */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full h-11">
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

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Book</label>
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger className="w-full h-11">
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
            <SelectTrigger className="w-full h-11">
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
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Translation" />
            </SelectTrigger>
            <SelectContent>
              {currentTranslations.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
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
                  John {chapter} ·{" "}
                  {translations[language]?.find((t) => t.id === translation)?.name || translation.toUpperCase()}
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
          <div className="max-w-3xl mx-auto px-8 py-12">
            <h1 className="font-serif text-5xl font-bold mb-3 tracking-tight">John</h1>
            <h2 className="text-lg text-muted-foreground mb-10">Chapter {chapter}</h2>

            <div className={`font-serif ${getFontSizeClass()} leading-loose space-y-6`}>
              {currentVerses.map((verse) => (
                <p key={verse.number} className="scripture-text">
                  <sup className="text-primary font-sans text-xs font-semibold mr-2 select-none">{verse.number}</sup>
                  {verse.text}
                </p>
              ))}
            </div>
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
