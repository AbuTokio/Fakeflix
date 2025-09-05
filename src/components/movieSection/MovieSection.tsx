import React, { useState } from "react"
import MovieCard from "../movieCard/MovieCard"
import type { DialogMovieData } from "../movieDialog/MovieDialog"
import MovieDialog from "../movieDialog/MovieDialog"

type MovieSectionProps<T> = {
  title: string
  viewAllHref?: string
  items?: T[]
  renderItem?: (item: T, index: number) => React.ReactNode
}

export default function MovieSection<T>({ title, viewAllHref, items, renderItem }: MovieSectionProps<T>) {
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
      <section className="space-y-4 w-[90%] m-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {viewAllHref && <a href={viewAllHref}>View All →</a>}
        </div>
        <div className="grid grid-cols-4 justify-around">
          <MovieCard movie="Mein Nachbar Totoro" onOpen={handleOpen} />
          <MovieCard movie="Mein Nachbar Totoro" onOpen={handleOpen} />
        </div>

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
    </>
  )
}
