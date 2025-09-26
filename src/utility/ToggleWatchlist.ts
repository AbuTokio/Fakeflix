import type React from "react"
import type { ResultMovieList } from "../interface/MovieList"
import toast from "react-hot-toast"
import type { MovieDetails } from "../interface/Movie"

export default function ToggleWatchlist(
  user: { name: string; email: string } | null,
  watchlist: (MovieDetails | ResultMovieList)[],
  setWatchlist: React.Dispatch<React.SetStateAction<(MovieDetails | ResultMovieList)[]>>,
  movie: MovieDetails | ResultMovieList
) {
  const exists = watchlist.some((m) => m.id === movie.id)

  if (!user) {
    toast.error("You need to be logged in to add movies to your watchlist!")
    return
  }

  if (exists) {
    const updated = watchlist.filter((m) => m.id !== movie.id)
    setWatchlist(updated)
    localStorage.setItem(`watchlist_${user.email}`, JSON.stringify(updated))
    toast.success("Movie removed from your watchlist")
  } else {
    const updated = [...watchlist, movie]
    setWatchlist(updated)
    localStorage.setItem(`watchlist_${user.email}`, JSON.stringify(updated))
    toast.success("Movie added to your watchlist")
  }
}
