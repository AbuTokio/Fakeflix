import { useCallback, useState } from "react"
import Animation from "../../components/animation/Animation"
import MovieCard from "../../components/movieCard/MovieCard"
import MovieDialog from "../../components/movieDialog/MovieDialog"
import MovieSection from "../../components/movieSection/MovieSection"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import { useMain } from "../../hooks/ContextHooks"

export default function Watchlist() {
  const mainCtx = useMain()

  const [openId, setOpenId] = useState<number | null>(null)
  const [loading] = useState(false)

  const handleOpen = useCallback((id: number) => {
    setOpenId(id)
  }, [])

  const handleClose = useCallback(() => setOpenId(null), [])

  const selected = mainCtx.watchlist.find((m) => m.id === openId)!

  return (
    <>
      {mainCtx.watchlist.length === 0 ? (
        <p className="absolute top-1/2 -translate-y-1/2 text-center text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-white">
          Pretty empty in here, why don't you add your upcoming movie plans to the watchlist?
        </p>
      ) : (
        <Animation delay={0.5}>
          <section className="p-6">
            <MovieSection title="Watchlist">
              {loading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : mainCtx.watchlist.map((m) => <MovieCard key={m.id} movie={m} onOpen={handleOpen} />)}
            </MovieSection>
          </section>
          {openId !== null && (
            <MovieDialog open ctaHref={`/movies/detail/${openId}`} onClose={handleClose} data={selected} />
          )}
        </Animation>
      )}
    </>
  )
}
