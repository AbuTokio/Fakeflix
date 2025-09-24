import React from "react"

// TODO: "CarouselTag" mit in diese Komponente einbauen.

type BadgeProps = {
  children: React.ReactNode
  muted?: boolean
  hero?: boolean
}

export default function Badge({ children, muted = false, hero = false }: BadgeProps) {
  return (
    <>
      <span
        className={`rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap
          ${muted && !hero && "bg-white/15 text-white/90"}
          ${!muted && !hero && "bg-white/20 text-white"}
          ${hero && "flex justify-between items-center gap-2 text-lg font-bold font-nunito p-4 rounded-3xl w-fit"}
          ${!muted && hero && "bg-white text-black"}
          ${muted && hero && "bg-transparent text-white"}`}>
        {children}
      </span>
    </>
  )
}
