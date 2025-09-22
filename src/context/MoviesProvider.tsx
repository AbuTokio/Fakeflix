import { createContext, useContext } from "react"

export const moviesContext = createContext<MoviesContextProps | null>(null)

interface MoviesContextProps {}

export default function MoviesProvider({ children }: { children: React.ReactNode }) {
  return <moviesContext.Provider value={""}>{children}</moviesContext.Provider>
}
