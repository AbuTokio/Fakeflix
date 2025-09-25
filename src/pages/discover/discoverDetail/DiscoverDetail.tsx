import { useEffect, useState } from "react"
import { useMain } from "../../../hooks/ContextHooks"
import { Navigate, useParams, useSearchParams } from "react-router"
import MovieSection from "../../../components/movieSection/MovieSection"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import MovieCard from "../../../components/movieCard/MovieCard"
import Animation from "../../../components/animation/Animation"
import MovieDialog from "../../../components/movieDialog/MovieDialog"
import Pagination from "../../../components/pagination/Pagination"

export default function DiscoverDetail() {
  const mainCtx = useMain()
  const { discover } = useParams<{ discover: string }>()
  const searchParams = useSearchParams()
  const pageParam = searchParams[0].get("page")

  useEffect(() => {
    if (Number(pageParam) === 0) {
      mainCtx.setPage(1)
    } else {
      mainCtx.setPage(Number(pageParam))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam])

  useEffect(() => {
    mainCtx.fetchPopular(Number(pageParam))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCtx.page])

  const [loading] = useState(false)

  return (
    <>
      <Animation delay={0.5}>
        <section className="p-6">
          <MovieSection className="capitalize" title={`Discover ${discover}`} grid>
            {loading
              ? Array.from({ length: mainCtx.watchlist.length }).map((_, i) => <SkeletonCard key={i} />)
              : mainCtx.moviePopular.map((m) => (
                  <MovieCard key={m.id} movie={m} onOpen={() => mainCtx.openMovieDialog(m)} />
                ))}
          </MovieSection>
        </section>

        {mainCtx.dialog.open && mainCtx.dialog.data && (
          <MovieDialog
            open
            ctaHref={`/movies/detail/${mainCtx.dialog.movieId}`}
            onClose={mainCtx.closeMovieDialog}
            data={mainCtx.dialog.data}
          />
        )}
      </Animation>
      <Pagination />
      {/* {!pageParam && <Navigate to="?page=1" />} */}
    </>
  )
}
