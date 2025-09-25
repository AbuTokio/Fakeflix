import { useParams } from "react-router"
import { useMain } from "../../hooks/ContextHooks"
import MovieSection from "../../components/movieSection/MovieSection"
import { useEffect, useState } from "react"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import MovieCard from "../../components/movieCard/MovieCard"
import MovieDialog from "../../components/movieDialog/MovieDialog"
import type { ResultMovieList } from "../../interface/MovieList"

export default function Search() {
  const { query } = useParams<{ query: string }>()
  const mainCtx = useMain()
  const [loading] = useState(false)

  useEffect(() => {
    if (query) mainCtx.searchMovies(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <>
      {mainCtx.loading.search && <p>Suche läuft...</p>}
      {mainCtx.error.search && <p className="text-red-500">{mainCtx.error.search}</p>}
      {!mainCtx.loading.search && !mainCtx.error.search && mainCtx.searchedMovies.length > 0 && (
        <>
          <section className="w-full">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
              <MovieSection grid title={`Search Results for "${query}"`}>
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                  : mainCtx.searchedMovies.map((m: ResultMovieList) => (
                      <MovieCard key={m.id} movie={m} onOpen={() => mainCtx.openMovieDialog(m)} />
                    ))}
              </MovieSection>
            </div>
          </section>

          {mainCtx.dialog.open && mainCtx.dialog.data && (
            <MovieDialog
              open
              ctaHref={`/movies/detail/${mainCtx.dialog.movieId}`}
              onClose={mainCtx.closeMovieDialog}
              data={mainCtx.dialog.data}
            />
          )}
        </>
      )}
      {!mainCtx.loading.search && query && mainCtx.searchedMovies.length === 0 && (
        <p className="text-gray-400">No Results found for {query}...</p>
      )}
    </>
  )
}
