import React from "react"

// TODO: "CarouselTag" mit in diese Komponente einbauen.

type BadgeProps = {
  children: React.ReactNode
  muted?: boolean
}

export default function Badge({ children, muted = false }: BadgeProps) {
  return (
    <>
      <span
        className={
          "rounded-md px-2 py-1 text-xs font-semibold " +
          (muted ? "bg-white/15 text-white/90" : "bg-white/20 text-white")
        }>
        {children}
      </span>
    </>
  )
}
