import { useMediaQuery } from "react-responsive"

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  _2xl: 1536,
}

export function useBreakpoints() {
  const isSm = useMediaQuery({ minWidth: breakpoints.sm })
  const isMd = useMediaQuery({ minWidth: breakpoints.md })
  const isLg = useMediaQuery({ minWidth: breakpoints.lg })
  const isXl = useMediaQuery({ minWidth: breakpoints.xl })
  const is2xl = useMediaQuery({ minWidth: breakpoints._2xl })

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    active: (is2xl && "2xl") || (isXl && "xl") || (isLg && "lg") || (isMd && "md") || (isSm && "sm") || "base",
  }
}

export function useResponsive() {
  const bp = useBreakpoints()
  if (!bp) throw new Error("An error occurred in useResponsive!")
  return bp
}
