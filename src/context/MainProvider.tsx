import { createContext, useEffect, useState } from "react"
import type { dummyMoviePopular } from "../dummy/data"

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<MainContextProps | null>(null)

interface MainContextProps {
  watchlist: typeof dummyMoviePopular.results
  setWatchlist: React.Dispatch<React.SetStateAction<typeof dummyMoviePopular.results>>
  user: { name: string; email: string } | null
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<typeof dummyMoviePopular.results>([])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem(`watchlist_${user?.email}`) ?? "[]"))
  }, [user])

  const value: MainContextProps = {
    watchlist,
    setWatchlist,
    user,
    setUser,
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
