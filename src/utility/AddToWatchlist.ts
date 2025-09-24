import type React from "react"
import type { dummyMoviePopular } from "../dummy/data"

export default function AddToWatchlist(
  user: { name: string; email: string } | null,
  watchlist: typeof dummyMoviePopular.results,
  setWatchlist: React.Dispatch<React.SetStateAction<typeof dummyMoviePopular.results>>,
  movie: (typeof dummyMoviePopular.results)[0]
) {
  setWatchlist((prev) => [...prev, movie])
  localStorage.setItem(`watchlist_${user?.email}`, JSON.stringify([...watchlist, movie]))
}
