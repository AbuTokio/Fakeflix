import { TMDB_IMG_BASE, TmdbImageSize } from "../../enum/TmdbImage"
import { useMain } from "../../hooks/ContextHooks"
import type { MovieDetails } from "../../interface/Movie"
import type { ResultMovieList } from "../../interface/MovieList"
import type { ResultMovie } from "../../interface/Search"
import StarRating from "../starRating/StarRating"

type CardItem = ResultMovieList | ResultMovie | MovieDetails

type MovieCardProps = {
  movie: CardItem
  className?: string
  showRating?: boolean
  titleClassName?: string
}

export default function MovieCard({
  movie,
  className = "",
  showRating = true,
  titleClassName = "text-zinc-200 group-hover:text-white",
}: MovieCardProps) {
  const { openMovieDialog } = useMain()

  const title = movie.title ?? movie.original_title ?? "Untitled"

  const posterUrl = movie.poster_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${movie.poster_path}`
    : movie.backdrop_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${movie.backdrop_path}`
    : null

  const rating = movie.vote_average ?? movie.vote_average ?? 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openMovieDialog(movie)}
      className={`group cursor-pointer select-none outline-none w-full flex flex-col ${className}`}>
      <div className="w-full aspect-[2/3] overflow-hidden rounded-md bg-neutral-900">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-neutral-500 text-xs">No image</div>
        )}
      </div>
      <div className="mt-2 flex items-start justify-between gap-2 px-1">
        <div className={["text-sm font-semibold truncate", titleClassName].join(" ")} title={title}>
          {title}
        </div>

        {showRating && (
          <div className="shrink-0">
            <StarRating value={rating} max={10} size={16} />
          </div>
        )}
      </div>
    </div>
  )
}
