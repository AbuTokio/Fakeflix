import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { useMain } from "../../hooks/ContextHooks"

type AnimationProps = {
  children: React.ReactNode
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  delay?: number
  duration?: number
  className?: string
  freeze?: boolean
}

export default function Animation({
  children,
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  delay = 0,
  duration = 1,
  className = "",
  freeze,
}: AnimationProps) {
  const { dialog } = useMain()
  const ani = useRef<HTMLDivElement | null>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const effectiveFreeze = freeze ?? dialog.open

  useEffect(() => {
    if (!ani.current) return
    tween.current?.kill()
    tween.current = null

    if (effectiveFreeze) {
      gsap.set(ani.current, to)
      return
    }

    tween.current = gsap.fromTo(ani.current, from, { ...to, delay, duration, overwrite: "auto" })

    return () => {
      tween.current?.kill()
      tween.current = null
    }
  }, [from, to, delay, duration, effectiveFreeze])

  return (
    <div ref={ani} className={className}>
      {children}
    </div>
  )
}
