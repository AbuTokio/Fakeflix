import { useMain } from "../../hooks/ContextHooks"
import MovieDialog from "../movieDialog/MovieDialog"

export default function GlobalMovieDialog() {
  const { dialog, closeMovieDialog } = useMain()

  if (!dialog.open || !dialog.data) return null

  return <MovieDialog open data={dialog.data} ctaHref={`/movies/detail/${dialog.movieId}`} onClose={closeMovieDialog} />
}
