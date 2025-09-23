import StarRating from "../starRating/StarRating"

// FIXME Typesierung ändern
type Movie = {
  id: number
  title: string
  posterUrl: string
  rating: number
}

export default function MovieCard({ movie, onOpen }: { movie: Movie; onOpen?: (id: number) => void }) {
  const { id, title, posterUrl, rating } = movie

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen?.(id)}
      className="group cursor-pointer select-none outline-none w-full flex flex-col">
      {/* Poster mit Ratio */}
      <div className="w-full aspect-[2/3] overflow-hidden rounded-md bg-neutral-900">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          draggable={false}
        />
      </div>

      {/* Text + Rating */}
      <div className="mt-2 flex items-start justify-between gap-2 px-1">
        <div className="text-sm font-semibold text-red-500 truncate" title={title}>
          {title}
        </div>
        <div className="shrink-0">
          <StarRating value={rating} max={10} size={16} />
        </div>
      </div>
    </div>
  )
}
