import { createContext, useContext } from "react"

export const seriesContext = createContext<SeriesContextProps | null>(null)

interface SeriesContextProps {}

export default function SeriesProvider({ children }: { children: React.ReactNode }) {
  return <seriesContext.Provider value={""}>{children}</seriesContext.Provider>
}
