import { useCallback, useState } from "react"
import type { Movie } from "../../components/movieOpenController/MovieOpenController"
import type { DialogMovieData } from "../../components/movieDialog/MovieDialog"
import MovieOpenController from "../../components/movieOpenController/MovieOpenController"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import Carousel from "../../components/carousel/Carousel"
import MovieSection from "../../components/movieSection/MovieSection"
import MovieCard from "../../components/movieCard/MovieCard"
import MovieDialog from "../../components/movieDialog/MovieDialog"

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

export default function Movies() {
  const [open, setOpen] = useState(false)
  const [dialogData, setDialogData] = useState<DialogMovieData | null>(null)

  function handleOpenById(id: number) {
    const m = movies.find((x) => x.id === id)
    if (!m) return
    setDialogData(toDialogData(m))
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    // optional: setDialogData(null)
  }

  return (
    <>
      <Carousel />
      <section className="p-6">
        {/* <MovieOpenController
          title="New Release – Movies"
          // TODO Route anpassen
          viewAllHref="/movies/section"
          items={movies}
          limit={4}
          toDialogData={toDialogData}
        /> */}

        <MovieSection title="Top Rated" viewAllHref="/movies/top">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onOpen={handleOpenById} />
          ))}
        </MovieSection>

        {dialogData && (
          <MovieDialog
            open={open}
            onClose={handleClose}
            data={dialogData}
            ctaLabel="Details"
            ctaHref={`/movie/detail/${dialogData.id}`}
          />
        )}
      </section>
      <section>
        <SkeletonCard />
      </section>
    </>
  )
}
