import { useEffect } from "react"
import MovieSection from "../../components/movieSection/MovieSection"
import { useMain } from "../../hooks/ContextHooks"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import MovieCard from "../../components/movieCard/MovieCard"
import CardCarousel from "../../components/cardCarousel/CardCarousel"

export function EmptyCard() {
  return (
    <div className="w-full aspect-[2/3] bg-neutral-800 rounded-md flex items-center justify-center text-neutral-400 text-sm">
      Kein Inhalt
    </div>
  )
}

export default function Genres() {
  const { movieGenres, discoverMovies, discoveredMovies, loadingByGenre, errorByGenre, openMovieDialog } = useMain()

  useEffect(() => {
    movieGenres.forEach((g) => {
      if (!discoveredMovies[g.id]) discoverMovies(g.id)
    })
  }, [movieGenres, discoveredMovies])

  return (
    <>
      <div className="space-y-10">
        {movieGenres.map((genre) => {
          const movies = (discoveredMovies[genre.id] ?? []).slice(0, 10)
          const isLoading = !!loadingByGenre[genre.id]
          const err = errorByGenre[genre.id]

          const cards = isLoading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : err
            ? [
                <div
                  key={`err-${genre.id}`}
                  className="w-full aspect-[2/3] rounded-md grid place-items-center text-red-400 text-sm bg-neutral-900">
                  {err}
                </div>,
              ]
            : movies.length === 0
            ? [<EmptyCard key={`empty-${genre.id}`} />]
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} onOpen={() => openMovieDialog(movie)} />)

          return (
            <MovieSection key={genre.id} title={genre.name} viewAllHref={`/genres/${genre.id}`}>
              <CardCarousel cards={cards} />
            </MovieSection>
          )
        })}
      </div>
    </>
  )
}
