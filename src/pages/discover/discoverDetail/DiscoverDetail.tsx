import { useEffect, useState } from "react"
import { useMain } from "../../../hooks/ContextHooks"
import { useParams, useSearchParams } from "react-router"
import MovieSection from "../../../components/movieSection/MovieSection"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import MovieCard from "../../../components/movieCard/MovieCard"
import Animation from "../../../components/animation/Animation"
import Pagination from "../../../components/pagination/Pagination"
import type { ResultMovieList } from "../../../interface/MovieList"

export default function DiscoverDetail() {
  const mainCtx = useMain()
  const { discover } = useParams<{ discover: string }>()
  const searchParams = useSearchParams()
  const pageParam = searchParams[0].get("page")
  const [movies, setMovies] = useState<ResultMovieList[]>([])

  useEffect(() => {
    if (Number(pageParam) === 0) {
      mainCtx.setPage(1)
    } else {
      mainCtx.setPage(Number(pageParam))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam])

  useEffect(() => {
    switch (discover) {
      case "popular":
        mainCtx.fetchPopular(mainCtx.page)
        break
      case "toprated":
        mainCtx.fetchTopRated(mainCtx.page)
        break
      case "upcoming":
        mainCtx.fetchUpcoming(mainCtx.page)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCtx.page])

  useEffect(() => {
    switch (discover) {
      case "popular":
        setMovies(mainCtx.moviePopular)
        break
      case "toprated":
        setMovies(mainCtx.movieTopRated)
        break
      case "upcoming":
        setMovies(mainCtx.movieUpcoming)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCtx.moviePopular, mainCtx.movieTopRated, mainCtx.movieUpcoming])

  const [loading] = useState(false)

  return (
    <>
      <Animation delay={0.5}>
        <section className="p-6">
          <MovieSection className="capitalize" title={`Discover ${discover}`} grid>
            {loading
              ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
              : movies.map((m) => <MovieCard key={m.id} movie={m} onOpen={() => mainCtx.openMovieDialog(m)} />)}
          </MovieSection>
        </section>
      </Animation>
      <Pagination />
    </>
  )
}
