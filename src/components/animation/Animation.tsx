import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMain } from "../../hooks/ContextHooks"

gsap.registerPlugin(ScrollTrigger)

type AnimationProps = {
  children: React.ReactNode
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  delay?: number
  duration?: number
  className?: string
  freeze?: boolean
  // Parallax
  variant?: "default" | "parallax"
  parallaxStrength?: number
  parallaxAxis?: "y" | "x"
  parallaxAnchor?: "center" | "top"
  markers?: boolean
  useParentAsTrigger?: boolean
}

export default function Animation({
  children,
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  delay = 0,
  duration = 1,
  className = "",
  freeze,
  variant = "default",
  parallaxStrength = 120,
  parallaxAxis = "y",
  parallaxAnchor = "center",
  markers = false,
  useParentAsTrigger = false,
}: AnimationProps) {
  const { dialog } = useMain()
  const ani = useRef<HTMLDivElement | null>(null)
  const tween = useRef<gsap.core.Tween | null>(null)

  const effectiveFreeze = freeze ?? dialog.open

  useLayoutEffect(() => {
    if (!ani.current) return

    // Clean up vorherigen Tween
    tween.current?.scrollTrigger?.kill()
    tween.current?.kill()
    tween.current = null

    const el = ani.current

    if (effectiveFreeze) {
      gsap.set(el, to)
      return
    }

    if (variant === "parallax") {
      const target = (el.firstElementChild as HTMLElement) ?? el

      let fromX = 0,
        toX = 0,
        fromY = 0,
        toY = 0

      if (parallaxAxis === "y") {
        if (parallaxAnchor === "center") {
          fromY = -parallaxStrength / 2
          toY = parallaxStrength / 2
        } else {
          fromY = 0
          toY = parallaxStrength
        }
      } else {
        if (parallaxAnchor === "center") {
          fromX = -parallaxStrength / 2
          toX = parallaxStrength / 2
        } else {
          fromX = 0
          toX = parallaxStrength
        }
      }

      gsap.set(target, { willChange: "transform", scale: 1 })

      const triggerEl = useParentAsTrigger && el.parentElement ? el.parentElement : el

      tween.current = gsap.fromTo(
        target,
        { x: fromX, y: fromY },
        {
          x: toX,
          y: toY,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 0%",
            end: "bottom 20%",
            scrub: 0.3,
            markers,
            invalidateOnRefresh: true,
          },
        }
      )
    } else {
      // normale Fade/Move Animation
      tween.current = gsap.fromTo(el, from, { ...to, delay, duration, overwrite: "auto" })
    }

    return () => {
      tween.current?.scrollTrigger?.kill()
      tween.current?.kill()
      tween.current = null
    }
  }, [
    from,
    to,
    delay,
    duration,
    effectiveFreeze,
    variant,
    parallaxStrength,
    parallaxAxis,
    parallaxAnchor,
    markers,
    useParentAsTrigger,
  ])

  return (
    <div ref={ani} className={className}>
      {children}
    </div>
  )
}
