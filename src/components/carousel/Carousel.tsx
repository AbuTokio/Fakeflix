import React, { useEffect, useState } from "react"

interface CarouselProps {
  cards: React.ReactNode[]
  autoMs?: number
  fadeMs?: number
}

export default function Carousel({ cards, autoMs = 6000, fadeMs = 600 }: CarouselProps) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = (next: number) => {
    if (next === active) return
    setFading(true)
    setTimeout(() => {
      setActive(next)
      setFading(false)
    }, fadeMs)
  }

  useEffect(() => {
    if (cards.length === 0) return
    const id = setInterval(() => {
      goTo((active + 1) % cards.length)
    }, autoMs)
    return () => clearInterval(id)
  }, [active, cards.length, autoMs])

  if (cards.length === 0) return null

  return (
    <div className="relative w-full aspect-video max-h-[80vh] overflow-hidden bg-black">
      {cards.map((card, i) => (
        <div
          key={i}
          className={[
            "absolute inset-0 w-full h-full transition-opacity",
            fading && i === active ? "opacity-0 duration-500" : "",
            i === active ? "opacity-100 duration-500" : "opacity-0 duration-300",
          ].join(" ")}>
          <div className="absolute inset-0 w-full h-full">{card}</div>
        </div>
      ))}

      {/* Dots */}
      <div className="pointer-events-auto flex gap-2 md:gap-3 absolute bottom-3 left-1/2 -translate-x-1/2 p-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              "h-1.5 md:h-2 rounded-full transition-all",
              i === active ? "w-12 md:w-16 bg-red-600" : "w-6 md:w-8 bg-white/70 hover:bg-white",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}
