import React, { useEffect, useRef } from "react"
import gsap from "gsap"

type AnimationProps = {
  children: React.ReactNode
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  delay?: number
  duration?: number
  className?: string
}

export default function Animation({
  children,
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  delay = 0,
  duration = 1,
  className = "",
}: AnimationProps) {
  const ani = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ani.current) {
      gsap.fromTo(ani.current, from, { ...to, delay, duration })
    }
  }, [from, to, delay, duration])

  return (
    <div ref={ani} className={className}>
      {children}
    </div>
  )
}
