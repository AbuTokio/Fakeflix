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
    <>
      <div className="group w-[256px] h-[392px]  cursor-pointer" onClick={() => onOpen?.(id)}>
        <div className="h-[90%] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-1 flex flex-row justify-between px-2 items-start gap-0.5">
          <p className="text-sm font-semibold text-red-500">{title}</p>
          <p>
            <StarRating value={rating} max={10} size={16} />
          </p>
        </div>
      </div>
    </>
  )
}
