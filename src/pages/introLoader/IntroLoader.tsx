import "./IntroLoader.css"

export default function IntroLoader({
  letter = "F",
  className = "w-screen h-screen flex items-center justify-center bg-black overflow-hidden",
}: {
  letter?: "F"
  className?: string
}) {
  const furs = Array.from({ length: 31 }, (_, i) => i + 1)
  const lamps = Array.from({ length: 28 }, (_, i) => i + 1)

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
    <div className={className}>
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
