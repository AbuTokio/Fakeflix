import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

type Props = {
  cards: React.ReactNode[]
  gapClassName?: string
  cardWidthClasses?: string
}

export default function Carousel({
  cards,
  gapClassName = "gap-3 sm:gap-4",
  cardWidthClasses = `
    w-[clamp(140px,40vw,160px)]
    md:w-[clamp(180px,30vw,220px)]
    lg:w-[clamp(220px,22vw,360px)]
    xl:w-[280px]
    2xl:w-[300px]
  `,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [stepPx, setStepPx] = useState(0)

  const measure = () => {
    const track = trackRef.current
    if (!track) return
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0")
    const first = track.querySelector<HTMLElement>("[data-card]")
    if (!first) return
    const w = first.getBoundingClientRect().width
    setStepPx(w + gap)
  }

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!trackRef.current || stepPx === 0) return

    const maxIndex = cards.length - 1
    const maxX = -(maxIndex * stepPx)

    Draggable.create(trackRef.current, {
      type: "x",
      bounds: { minX: maxX, maxX: 0 },
      inertia: true,
      onDragEnd: function () {
        const raw = Math.round(-this.x / stepPx)
        const newIndex = Math.min(Math.max(raw, 0), maxIndex)
        gsap.to(trackRef.current, { x: -newIndex * stepPx, duration: 0.4, ease: "power3.out" })
      },
    })
  }, [stepPx, cards.length])

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div ref={trackRef} className={`flex ${gapClassName}`}>
        {cards.map((card, i) => (
          <div key={i} data-card className={`shrink-0 ${cardWidthClasses}`}>
            {card}
          </div>
        ))}
      </div>
    </div>
  )
}
