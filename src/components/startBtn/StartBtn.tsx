import React from "react"

type Props = {
  label?: string
  href?: string
  bars?: number
}

export default function FakeflixButton({ label = "Fakeflix", href = "#", bars = 120 }: Props) {
  return (
    <a
      href={href}
      className="
        relative group w-[240px] h-[80px]
        flex items-center justify-center
        bg-black/20 rounded-[10px] cursor-pointer overflow-hidden
        text-[#e50914] text-2xl uppercase
        tracking-[0.05em]
        transition-all duration-500
        hover:text-white
        hover:tracking-[0.2em]
        hover:[filter:drop-shadow(0_0_10px_#e50914)_drop-shadow(0_0_30px_#e50914)]
      ">
      {label}

      {Array.from({ length: bars }).map((_, i) => {
        const delay = Math.random()
        return (
          <span
            key={i}
            className={`
              absolute top-0 -z-10
              w-[2px] h-full bg-[#e50914] pointer-events-none
              transition-transform duration-200 ease-in-out
              ${i % 2 === 0 ? "origin-top group-hover:origin-bottom" : "origin-bottom group-hover:origin-top"}
              scale-y-0 group-hover:scale-y-100
            `}
            style={{
              left: `${i * 2}px`,
              transitionDelay: `${delay}s`,
            }}
          />
        )
      })}
    </a>
  )
}
