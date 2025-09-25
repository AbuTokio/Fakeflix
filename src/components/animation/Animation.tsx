import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMain } from "../../hooks/ContextHooks"
import { useResponsive } from "../../hooks/ResponsiveHooks"

gsap.registerPlugin(ScrollTrigger)

type AnimationProps = {
  children: React.ReactNode
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  delay?: number
  duration?: number
  className?: string
  freeze?: boolean
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
  const bp = useResponsive()
  const ani = useRef<HTMLDivElement | null>(null)
  const tween = useRef<gsap.core.Tween | null>(null)

  const effectiveFreeze = freeze ?? dialog.open

  const getScrollConfig = () => {
    if (bp.is2xl || bp.isXl) {
      return { start: "top 10%", end: "bottom 30%", scrub: 0.4, strength: parallaxStrength }
    }
    if (bp.isLg) {
      return { start: "top 10%", end: "bottom 25%", scrub: 0.35, strength: parallaxStrength * 0.85 }
    }
    if (bp.isMd) {
      return { start: "top 10%", end: "bottom 30%", scrub: 0.3, strength: parallaxStrength * 0.7 }
    }
    return { start: "top 0%", end: "bottom 15%", scrub: 0.25, strength: parallaxStrength * 0.5 }
  }

  useLayoutEffect(() => {
    if (!ani.current) return

    // Kill vorherige
    tween.current?.scrollTrigger?.kill()
    tween.current?.kill()
    tween.current = null

    const el = ani.current
    const { start, end, scrub, strength } = getScrollConfig()

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
          fromY = -strength / 2
          toY = strength / 2
        } else {
          fromY = 0
          toY = strength
        }
      } else {
        if (parallaxAnchor === "center") {
          fromX = -strength / 2
          toX = strength / 2
        } else {
          fromX = 0
          toX = strength
        }
      }

      gsap.set(target, { willChange: "transform", scale: 1.05 })

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
            start,
            end,
            scrub,
            markers,
            invalidateOnRefresh: true,
          },
        }
      )
    } else {
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
    bp.active,
  ])

  return (
    <div ref={ani} className={className}>
      {children}
    </div>
  )
}
