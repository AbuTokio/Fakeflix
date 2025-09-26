import { useState } from "react"
import Animation from "../../components/animation/Animation"
import MovieCard from "../../components/movieCard/MovieCard"
import MovieSection from "../../components/movieSection/MovieSection"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import { useMain } from "../../hooks/ContextHooks"

export default function Watchlist() {
  const mainCtx = useMain()

  const [loading] = useState(false)

  return (
    <>
      {mainCtx.user === null && (
        <p className="absolute top-1/2 -translate-y-1/2 text-center text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-white">
          You need to be logged in to view your watchlist!
        </p>
      )}

      {mainCtx.watchlist.length === 0 && mainCtx.user !== null && (
        <p className="absolute top-1/2 -translate-y-1/2 text-center text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-white">
          Pretty empty in here, why don't you add your upcoming movie plans to the watchlist?
        </p>
      )}

      {mainCtx.watchlist.length > 0 && mainCtx.user !== null && (
        <Animation delay={0.5}>
          <section className="p-2">
            <MovieSection className="capitalize" title={`${mainCtx.user.name}'s Watchlist`} grid>
              {loading
                ? Array.from({ length: mainCtx.watchlist.length }).map((_, i) => <SkeletonCard key={i} />)
                : mainCtx.watchlist.map((m) => <MovieCard key={m.id} movie={m} />)}
            </MovieSection>
          </section>
        </Animation>
      )}
    </>
  )
}
