import { useParams } from "react-router"
import { useMain } from "../../../hooks/ContextHooks"
import { useEffect, useMemo } from "react"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import { EmptyCard } from "../Genres"
import MovieCard from "../../../components/movieCard/MovieCard"

export default function GenreDetail() {
  const { id } = useParams<{ id: string }>()
  const genreId = id ? Number(id) : null

  const { movieGenres, discoverMovies, discoveredMovies, loadingByGenre, errorByGenre, openMovieDialog } = useMain()

  const genre = useMemo(() => movieGenres.find((g) => g.id === genreId), [movieGenres, genreId])

  const hasCache = !!(genreId && discoveredMovies[genreId])

  useEffect(() => {
    if (!genreId) return
    if (!hasCache) {
      // TODO Pagination
      discoverMovies(genreId)
    }
  }, [genreId, hasCache])

  const entry = (genreId && discoveredMovies[genreId]) as any
  const movies = Array.isArray(entry) ? entry : entry?.items ?? []
  const loading = !!loadingByGenre[genreId!]
  const error = errorByGenre[genreId!] ?? null

  return (
    <>
      <div className="p-6 space-y-6">
        <h3 className="text-red-500 text-3xl font-bold">{genre?.name ?? "Unknown Genre"}</h3>

        {loading && movies.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : movies.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((m: any) => (
              <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
