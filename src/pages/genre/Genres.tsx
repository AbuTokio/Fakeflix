import { useEffect } from "react"
import MovieSection from "../../components/movieSection/MovieSection"
import { useMain } from "../../hooks/ContextHooks"
import MovieCard from "../../components/movieCard/MovieCard"
import CardCarousel from "../../components/cardCarousel/CardCarousel"
import SkeletonSection from "../../components/skeletonSection/SkeletonSection"
import type { ResultMovieList } from "../../interface/MovieList"

export function EmptyCard() {
  return (
    <div className="w-full aspect-[2/3] bg-neutral-800 rounded-md flex items-center justify-center text-neutral-400 text-sm">
      Kein Inhalt
    </div>
  )
}

export default function Genres() {
  const { page, movieGenres, discoverMovies, discoveredMovies, loadingByGenre, errorByGenre } = useMain()

  useEffect(() => {
    movieGenres.forEach((g) => {
      if (!discoveredMovies[g.id]) discoverMovies(g.id, page)
    })
  }, [movieGenres, discoveredMovies, page])

  return (
    <>
      <div className="space-y-10">
        {movieGenres.length === 0 ? (
          <>
            <SkeletonSection />
          </>
        ) : (
          movieGenres.map((genre) => {
            const movies: ResultMovieList[] | undefined = discoveredMovies[genre.id]
            const isLoading = !!loadingByGenre[genre.id] || !movies
            const err = errorByGenre[genre.id]
            if (isLoading) {
              return <SkeletonSection key={`s-${genre.id}`} />
            }
            if (err) {
              return (
                <MovieSection key={`e-${genre.id}`} title={genre.name} viewAllHref={`/genres/${genre.id}`}>
                  <div className="w-full aspect-[2/3] rounded-md grid place-items-center text-red-400 text-sm bg-neutral-900">
                    {String(err)}
                  </div>
                </MovieSection>
              )
            }

            const list = (movies ?? []).slice(0, 10)
            const cards =
              list.length === 0
                ? [<EmptyCard key={`empty-${genre.id}`} />]
                : list.map((movie) => <MovieCard key={movie.id} movie={movie} />)

            return (
              <MovieSection key={genre.id} title={genre.name} viewAllHref={`/genres/${genre.id}`}>
                <CardCarousel cards={cards} />
              </MovieSection>
            )
          })
        )}
      </div>
    </>
  )
}
