import CardCarousel from "../cardCarousel/CardCarousel"
import MovieSection from "../movieSection/MovieSection"
import { SkeletonCard } from "../skeletonCard/SkeletonCard"

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-800 ${className}`} />
}

export default function SkeletonSection() {
  return (
    <MovieSection title="">
      {/* Header-Skeleton */}
      <div className="col-span-full flex flex-wrap items-center justify-between gap-3 my-2 sm:my-4">
        <SkeletonLine className="h-5 w-28 sm:h-6 sm:w-40" />
        <SkeletonLine className="h-4 w-16 sm:h-5 sm:w-20" />
      </div>
      <div className="w-full">
        <CardCarousel
          cards={Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        />
      </div>
    </MovieSection>
  )
}
