import { useMain } from "../hooks/ContextHooks"

export default function GenreIdToString(genreId: number): string {
  const mainCtx = useMain()

  const genre = mainCtx.movieGenres.find(({ id }) => id === genreId)
  return genre ? genre.name : "Unkown"
}
