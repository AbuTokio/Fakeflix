export function SkeletonCard() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="w-full aspect-[2/3] overflow-hidden rounded-md bg-neutral-800" />
      <div className="mt-2 flex items-start justify-between gap-2 px-1">
        <div className="h-4 w-2/3 rounded bg-neutral-800" />
        <div className="h-4 w-12 rounded bg-neutral-800" />
      </div>
    </div>
  )
}
