import StarRating from "../starRating/StarRating"

export default function MovieCard({
  movie,
  onOpen,
}: {
  movie: string //type
  onOpen?: (id: number) => void
}) {
  const title =
    // # movie.title ?? movie.name ??
    "Untitled"

  return (
    <button
      type="button"
      onClick={
        () => onOpen?.(1) // # movie.id
      }
      className="group relative block w-[256px] h-[392px] cursor-pointer focus:outline-none">
      <img
        src="/246907730f03f9d29d217e7943f72688.png"
        alt={title}
        className="w-full object-cover transition-transform duration-300 group-hover:scale-102"
      />
      <div className="mt-1 flex flex-col items-start gap-0.5">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p>
          <StarRating value={8.1} max={10} size={16} />
        </p>
      </div>
    </button>
  )
}
