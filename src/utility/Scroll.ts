import { useEffect } from "react"
import { useLocation } from "react-router"

export default function useScrollToTop(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
}
