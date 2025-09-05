import { useState } from "react"
import MovieCard from "../../../components/movieCard/MovieCard"
import type { DialogMovieData } from "../../../components/movieDialog/MovieDialog"
import MovieDialog from "../../../components/movieDialog/MovieDialog"
import Carousel from "../../../components/carousel/Carousel"

export default function MoviesHome() {
  const [open, setOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<DialogMovieData | null>(null)

  const handleOpen = (id: number) => {
    // aktuell: Dummy-Daten
    const dummyTotoro: DialogMovieData = {
      id,
      title: "Mein Nachbar Totoro",
      year: 1988,
      certification: "0",
      kindLabel: "Film",
      genres: ["Animation", "Familie", "Fantasy"],
      overview:
        "Die Schwestern Satsuki und Mei ziehen mit ihrem Vater aufs Land. In den nahegelegenen Wäldern begegnen sie geheimnisvollen Wesen – darunter dem freundlichen Waldgeist Totoro.",
      backdropUrl: "/246907730f03f9d29d217e7943f72688.png", //
      rating: 8.1,
    }

    setSelectedMovie(dummyTotoro)
    setOpen(true)
  }

  return (
    <>
      <section className="p-6">
        <MovieCard movie="Mein Nachbar Totoro" onOpen={handleOpen} />

        {/* Dialog */}
        {selectedMovie && (
          <MovieDialog
            open={open}
            onClose={() => setOpen(false)}
            data={selectedMovie}
            ctaHref="/movies/1"
            onCtaClick={() => {
              console.log("Weiter zu Details für:", selectedMovie.id)
            }}
          />
        )}
      </section>
      <Carousel />
    </>
  )
}
