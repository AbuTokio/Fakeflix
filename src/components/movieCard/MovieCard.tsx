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
    <>
      <div className="group w-[256px] h-[392px]  cursor-pointer" onClick={() => onOpen?.(1)}>
        <div className="h-[90%] overflow-hidden">
          <img
            src="/246907730f03f9d29d217e7943f72688.png"
            alt={title}
            className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-1 flex flex-row justify-between px-2 items-start gap-0.5">
          <p className="text-sm font-semibold text-black">{title}</p>
          <p>
            <StarRating value={8.1} max={10} size={16} />
          </p>
        </div>
      </div>
    </>
  )
}
