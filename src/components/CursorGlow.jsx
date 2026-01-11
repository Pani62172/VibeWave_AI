import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [pulse, setPulse] = useState(0)
  const [hue, setHue] = useState(280)

  useEffect(() => {
    // Track mouse
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)

    // Ambient pulse animation
    let direction = 1
    const interval = setInterval(() => {
      setPulse(prev => {
        if (prev >= 1) direction = -1
        if (prev <= 0) direction = 1
        return prev + direction * 0.02
      })
      setHue(prev => (prev + 1) % 360) // slowly shift hue
    }, 30)

    return () => {
      window.removeEventListener("mousemove", move)
      clearInterval(interval)
    }
  }, [])

  const size = 200 + pulse * 150

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-0
        rounded-full blur-3xl transition-transform duration-75"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.2 + pulse * 0.4,
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
        background: `radial-gradient(circle, hsl(${hue}, 80%, 60%) 0%, hsl(${(hue + 40) % 360}, 80%, 50%) 100%)`,
      }}
    />
  )
}
