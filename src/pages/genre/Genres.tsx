import MovieCard from "../../components/movieCard/MovieCard"
import MovieSection from "../../components/movieSection/MovieSection"
import { dummyMovieGenres } from "../../dummy/data"

export default function Genres() {
  const data = dummyMovieGenres.genres
  return (
    <>
      <div>
        {data.map((genre) => {
          return (
            <div>
              <MovieSection key={genre.id} title={genre.name} viewAllHref={`/genres/${genre.name}`}>
                <h4 className="text-red-300">MovieCard</h4>
              </MovieSection>
            </div>
          )
        })}
      </div>
    </>
  )
}
