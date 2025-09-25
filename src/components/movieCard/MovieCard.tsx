import { TmdbImageSize } from "../../enum/TmdbImage"
import type { ResultMovieList } from "../../interface/MovieList"
import StarRating from "../starRating/StarRating"

type MovieCardProps = {
  movie: ResultMovieList
  onOpen?: (movie: ResultMovieList) => void
  className?: string
  showRating?: boolean
}

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p"

export default function MovieCard({ movie, onOpen, className = "", showRating = true }: MovieCardProps) {
  const title = (movie as any).title ?? (movie as any).name ?? "Untitled"

  const posterUrl = movie.poster_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${movie.poster_path}`
    : movie.backdrop_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${movie.backdrop_path}`
    : null

  const rating = movie.vote_average ?? movie.vote_average ?? 0

  const handleOpen = () => onOpen?.(movie)
  // TODO HAndleOpen anpassen
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
      className={`group cursor-pointer select-none outline-none w-full flex flex-col ${className}`}>
      {/* Poster mit Ratio */}
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

      {/* Text + Rating */}
      <div className="mt-2 flex items-start justify-between gap-2 px-1">
        <div className="text-sm font-semibold text-red-500 truncate" title={title}>
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
