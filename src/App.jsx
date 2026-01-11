import { useState } from "react"
import { getMood } from "./utils/getMood"
import { moodMap } from "./data/moodMap"
import CursorGlow from "./components/CursorGlow"
import SpotifyEmbed from "./components/SpotifyEmbed"

const sillyTexts = [
  "Reading your vibe 🎧",
  "Consulting the music gods 🎵",
  "Aligning emotions with beats 🌀",
  "Overthinking your feelings so you don't have to 🤯",
]

export default function App() {
  const [text, setText] = useState("")
  const [mood, setMood] = useState(null)
  const [step, setStep] = useState("home")
  const isGlitch =
  mood && ["angry", "chaotic", "overwhelmed"].includes(mood)
  const pulseClass = mood === "chaotic" ? "bg-pulse animate-pulse-fast" : "bg-pulse"


  const moodData = mood ? moodMap[mood] : null
  const randomText =
    sillyTexts[Math.floor(Math.random() * sillyTexts.length)]

  function handleGenerate() {
    if (!text.trim()) return

    setStep("loading")

    setTimeout(() => {
      const detectedMood = getMood(text)
      setMood(detectedMood)
      setStep("result")
    }, 1800)
  }

  function resetApp() {
    setText("")
    setMood(null)
    setStep("home")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

{/* HOME PAGE BACKGROUND GLOW */}
    {step === "home" && (
      <div
        className="absolute w-screen h-screen
        bg-gradient-to-br from-purple-900/30 via-black to-black
        blur-3xl"
      />
    )}
    {step === "home" && <CursorGlow />}

      {/* Dynamic Background */}
      {moodData && step === "result" && (
  <div
    className={`absolute inset-0 bg-gradient-to-br ${moodData.color} blur-2xl bg-pulse`}
  />
)}


      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-xl p-8
        bg-white/5 backdrop-blur-xl
        rounded-3xl border border-white/10
        shadow-[0_0_40px_rgba(168,85,247,0.15)]
        transition-all duration-700 ${isGlitch ? "glitch" : ""}`}
      >

        {/* HOME */}
        {step === "home" && (
          <>
            <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight">
  Turn your <span className="text-purple-400">feelings</span><br />
  into <span className="text-purple-400">music</span>
</h1>


            <p className="text-sm md:text-base text-gray-400 text-center mt-4 leading-relaxed">
  Type how you feel.  
  We’ll find the music that understands you.
</p>

            <textarea
  className="w-full h-32 mt-8 p-5
  bg-black/50 border border-white/10
  rounded-2xl text-lg
  placeholder:text-gray-500
  focus:outline-none focus:ring-2 focus:ring-purple-500/60
  transition resize-none"
  placeholder="I feel empty but calm…"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

            <button
  onClick={handleGenerate}
  className="w-full mt-6 py-4 rounded-2xl
  bg-gradient-to-r from-purple-600 to-pink-600
  hover:scale-[1.02] active:scale-[0.98]
  transition-all duration-200
  font-semibold text-lg shadow-lg"
>
  Generate My Vibe 🎶
</button>

<p className="text-xs text-gray-500 text-center mt-4">
  No login. No data saved. Just vibes.
</p>


          </>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-purple-500
              border-t-transparent rounded-full animate-spin mb-6" />

            <p className="text-gray-300 text-center animate-pulse">
              {randomText}
            </p>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && moodData && (
          <>
            <p className="text-xs text-gray-400 mb-1">Detected Mood</p>
            <h2 className="text-3xl font-bold capitalize mb-2">
              {mood}
            </h2>

            <p className="text-gray-300 italic mb-4">
              “{moodData.vibe}”
            </p>

            <SpotifyEmbed playlistId={moodData.playlistId} />

            <button
              onClick={resetApp}
              className="w-full mt-6 py-3 rounded-xl
              border border-purple-500/40
              text-purple-300 hover:bg-purple-500/10 transition"
            >
              Generate New Vibe
            </button>
          </>
        )}

      </div>
    </div>
  )
}
