import { useCallback } from "react"
import type { DialogMovieData } from "../../../components/movieDialog/MovieDialog"
import Carousel from "../../../components/carousel/Carousel"
import type { Movie } from "../../../components/movieOpenController/MovieOpenController"
import MovieOpenController from "../../../components/movieOpenController/MovieOpenController"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"

// TODO Data entfernen
const movies: Movie[] = [
  { id: 1, title: "Ghosted", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.1 },
  { id: 2, title: "John Wick 4", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.0 },
  { id: 3, title: "Guardians of the Galaxy", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.3 },
  { id: 4, title: "The Covenant", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.8 },
  { id: 10, title: "Silo", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.5 },
  { id: 11, title: "Black Knight", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.3 },
  { id: 12, title: "Drops of God", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.1 },
  { id: 13, title: "The Night Agent", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.9 },
  { id: 14, title: "The Covenant", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.8 },
  { id: 20, title: "Silo", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.5 },
  { id: 21, title: "Black Knight", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.3 },
  { id: 22, title: "Drops of God", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.1 },
  { id: 23, title: "The Night Agent", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.9 },
]

export default function MoviesHome() {
  const toDialogData = useCallback((m: Movie): DialogMovieData => {
    return {
      id: m.id,
      title: m.title,
      backdropUrl: m.posterUrl,
      rating: m.rating,
      year: "2023",
      certification: "PG-13",
      kindLabel: "Film",
      genres: ["Action", "Thriller"],
      overview: "Kurzbeschreibung / Overview zum Film. Ersetze das mit echten Daten aus deiner Quelle.",
    }
  }, [])
  return (
    <>
      <Carousel />
      <section className="p-6">
        <MovieOpenController
          title="New Release – Movies"
          viewAllHref="/movies/section"
          items={movies}
          limit={8}
          toDialogData={toDialogData}
        />
      </section>
      <section>
        <SkeletonCard />
      </section>
    </>
  )
}
