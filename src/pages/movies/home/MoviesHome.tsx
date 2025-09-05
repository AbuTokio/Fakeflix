import MovieSection from "../../../components/movieSection/MovieSection"

export default function MoviesHome() {
  return (
    <section className="p-6">
      <MovieSection title="Recent" viewAllHref="/movies/1" />
    </section>
  )
}
