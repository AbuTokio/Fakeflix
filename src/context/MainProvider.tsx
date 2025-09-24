import { createContext, useEffect, useState } from "react"
import type { dummyMoviePopular } from "../dummy/data"

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<MainContextProps | null>(null)

interface MainContextProps {
  watchlist: typeof dummyMoviePopular.results
  setWatchlist: React.Dispatch<React.SetStateAction<typeof dummyMoviePopular.results>>
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<typeof dummyMoviePopular.results>([])

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem("watchlist") ?? "[]"))
  }, [])

  const value: MainContextProps = {
    watchlist,
    setWatchlist,
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
