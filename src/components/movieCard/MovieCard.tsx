import StarRating from "../starRating/StarRating"

// FIXME Typesierung ändern
type MovieInput = {
  id: number
  title?: string
  original_title?: string
  name?: string

  // Bild-Varianten
  poster_path?: string | null
  backdrop_path?: string | null
  posterUrl?: string | null

  // Rating-Varianten
  vote_average?: number
  rating?: number
}

type MovieCardProps = {
  movie: MovieInput
  onOpen?: (id: number) => void
  imgSize?: "w185" | "w342" | "w500" | "original"
  className?: string
  showRating?: boolean
}

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p"

export default function MovieCard({
  movie,
  onOpen,
  imgSize = "w342",
  className = "",
  showRating = true,
}: MovieCardProps) {
  const { id } = movie

  const title = movie.title ?? movie.original_title ?? movie.name ?? "Untitled"

  const posterUrl =
    movie.posterUrl ??
    (movie.poster_path ? `${TMDB_IMG_BASE}/${imgSize}${movie.poster_path}` : null) ??
    (movie.backdrop_path ? `${TMDB_IMG_BASE}/${imgSize}${movie.backdrop_path}` : null)

  const rating = movie.vote_average ?? movie.rating ?? 0

  const handleOpen = () => onOpen?.(id)

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
