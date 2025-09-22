import { useContext } from "react"
import { mainContext } from "../context/MainProvider"
import { moviesContext } from "../context/MoviesProvider"
import { seriesContext } from "../context/SeriesProvider"

export function useSeries() {
  const ctx = useContext(seriesContext)
  if (!ctx) throw new Error("useSeries must be used within SeriesProvider")
  return ctx
}

export function useMovies() {
  const ctx = useContext(moviesContext)
  if (!ctx) throw new Error("useMovies must be used within MoviesProvider")
  return ctx
}

export function useMain() {
  const ctx = useContext(mainContext)
  if (!ctx) throw new Error("useMain must be used within MainProvider")
  return ctx
}
