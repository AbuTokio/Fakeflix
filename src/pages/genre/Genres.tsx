import { useEffect } from "react"
import MovieSection from "../../components/movieSection/MovieSection"
import { useMain } from "../../hooks/ContextHooks"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import MovieCard from "../../components/movieCard/MovieCard"
import CardCarousel from "../../components/cardCarousel/CardCarousel"

function EmptyCard() {
  return (
    <div className="w-full aspect-[2/3] bg-neutral-800 rounded-md flex items-center justify-center text-neutral-400 text-sm">
      Kein Inhalt
    </div>
  )
}

export default function Genres() {
  const { movieGenres, discoverMovies, discoveredMovies, loading, openMovieDialog } = useMain()

  useEffect(() => {
    if (movieGenres.length > 0) {
      discoverMovies(movieGenres[0].id)
    }
  }, [movieGenres])

  return (
    <>
      <div className="space-y-10">
        {movieGenres.map((genre) => {
          const movies = discoveredMovies.filter((m) => m.genre_ids.includes(genre.id)).slice(0, 10)

          const cards = loading.discover
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.length === 0
            ? [<EmptyCard key={`empty-${genre.id}`} />] // 👈 als Array!
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
