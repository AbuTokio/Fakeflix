import { useCallback, useState } from "react"
import MovieSection from "../movieSection/MovieSection"
import MovieCard from "../movieCard/MovieCard"
import MovieDialog from "../movieDialog/MovieDialog"
import type { DialogMovieData } from "../movieDialog/MovieDialog"

export type Movie = {
  id: number
  title: string
  posterUrl: string
  rating: number
}

type MovieOpenControllerProps = {
  title: string
  viewAllHref?: string
  items: Movie[]
  limit?: number
  toDialogData: (m: Movie) => DialogMovieData
}

export default function MovieOpenController({
  title,
  viewAllHref,
  items,
  limit,
  toDialogData,
}: MovieOpenControllerProps) {
  const [open, setOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<DialogMovieData | null>(null)

  const handleOpen = useCallback(
    (id: number) => {
      const movie = items.find((m) => m.id === id)
      if (!movie) return
      setSelectedMovie(toDialogData(movie))
      setOpen(true)
    },
    [items, toDialogData]
  )

  return (
    <>
      <MovieSection
        title={title}
        viewAllHref={viewAllHref}
        items={items}
        limit={limit}
        renderItem={(movie) => <MovieCard movie={movie} onOpen={handleOpen} />}
      />

      {selectedMovie && (
        <MovieDialog
          open={open}
          onClose={() => setOpen(false)}
          data={selectedMovie}
          ctaHref={`/movies/moviedetail`}
          ctaLabel="Details"
          onCtaClick={() => console.log("Weiter zu Details für:", selectedMovie.id)}
        />
      )}
    </>
  )
}
