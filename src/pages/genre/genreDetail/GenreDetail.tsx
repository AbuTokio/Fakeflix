import { useParams, useSearchParams } from "react-router"
import { useMain } from "../../../hooks/ContextHooks"
import { useEffect, useMemo } from "react"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import { EmptyCard } from "../Genres"
import MovieCard from "../../../components/movieCard/MovieCard"
import MovieSection from "../../../components/movieSection/MovieSection"
import type { ResultMovieList } from "../../../interface/MovieList"
import Pagination from "../../../components/pagination/Pagination"

export default function GenreDetail() {
  const { id } = useParams<{ id: string }>()
  const genreId = id ? Number(id) : null

  const {
    page,
    setPage,
    movieGenres,
    discoverMovies,
    discoveredMovies,
    loadingByGenre,
    errorByGenre,
    openMovieDialog,
  } = useMain()

  const genre = useMemo(() => movieGenres.find((g) => g.id === genreId), [movieGenres, genreId])

  const searchParams = useSearchParams()
  const pageParam = searchParams[0].get("page")

  const hasCache = !!(genreId && discoveredMovies[genreId])

  useEffect(() => {
    if (Number(pageParam) === 0) {
      setPage(1)
    } else {
      setPage(Number(pageParam))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam])

  useEffect(() => {
    if (!genreId) return
    discoverMovies(genreId, page)
  }, [genreId, hasCache, page, pageParam])

  const loading = !!loadingByGenre[genreId!]
  const error = errorByGenre[genreId!] ?? null

  return (
    <>
      <div className="p-6 space-y-6">
        <MovieSection titleClassName="!text-3xl !font-bold" title={`Genre ${genre?.name ?? "Unknown"}`}>
          {loading && genreId && discoveredMovies[genreId].length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : genreId && discoveredMovies[genreId].length === 0 ? (
            <EmptyCard />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genreId &&
                discoveredMovies[genreId].map((m: ResultMovieList) => (
                  <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />
                ))}
            </div>
          )}
        </MovieSection>
      </div>
      <Pagination />
    </>
  )
}
