import { useEffect } from "react"
import "./IntroLoader.css"

export default function IntroLoader({
  letter = "F",
  className = "w-screen h-screen flex items-center justify-center bg-black overflow-hidden",
  duration = 3200,
  onComplete,
}: {
  letter?: "F"
  className?: string
  duration?: number
  onComplete?: () => void
}) {
  const furs = Array.from({ length: 31 }, (_, i) => i + 1)
  const lamps = Array.from({ length: 28 }, (_, i) => i + 1)

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const Brush = () => (
    <div className="effect-brush">
      {furs.map((n) => (
        <span key={n} className={`fur-${n}`}></span>
      ))}
    </div>
  )

  const Lumieres = () => (
    <div className="effect-lumieres">
      {lamps.map((n) => (
        <span key={n} className={`lamp-${n}`}></span>
      ))}
    </div>
  )

  return (
    <div className={className} role="status" aria-live="polite" aria-label="Intro animation">
      <div className="fakeflixintro" data-letter={letter}>
        <div className="helper-1">
          <Brush />
          <Lumieres />
        </div>
        <div className="helper-2">
          <Brush />
        </div>
        <div className="helper-3">
          <Brush />
        </div>
        <div className="helper-4">
          <Brush />
        </div>
      </div>
    </div>
  )
}
