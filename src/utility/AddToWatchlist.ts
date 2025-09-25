import type React from "react"
import type { ResultMovieList } from "../interface/MovieList"

export default function AddToWatchlist(
  user: { name: string; email: string } | null,
  watchlist: ResultMovieList[],
  setWatchlist: React.Dispatch<React.SetStateAction<ResultMovieList[]>>,
  movie: ResultMovieList
) {
  setWatchlist((prev: ResultMovieList[]) => [...prev, movie])
  localStorage.setItem(`watchlist_${user?.email}`, JSON.stringify([...watchlist, movie]))
}
