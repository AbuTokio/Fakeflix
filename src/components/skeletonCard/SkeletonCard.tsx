export function SkeletonCard() {
  return (
    <div className="group w-[256px] h-[392px] cursor-pointer animate-pulse">
      {/* Poster Placeholder */}
      <div className="h-[90%] w-full bg-gray-700 rounded-md" />

      {/* Text + Rating Placeholder */}
      <div className="mt-1 flex flex-row justify-between px-2 items-start gap-0.5">
        {/* Title Placeholder */}
        <div className="h-4 w-2/3 bg-gray-700 rounded" />
        {/* Star Placeholder */}
        <div className="h-4 w-12 bg-gray-700 rounded" />
      </div>
    </div>
  )
}
