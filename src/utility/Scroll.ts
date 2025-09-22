import { useEffect } from "react"
import { useLocation } from "react-router"

// FIXME Seite lädt nicht wenn Funktion aufgerufen wird.

export default function useScrollToTop(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
}
