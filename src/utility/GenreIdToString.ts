import { dummyMovieGenres, dummyTVGenres } from "../dummy/data"

export default function GenreIdToString(type: "movie" | "TV", genreId: number) {
  if (type === "movie") {
    dummyMovieGenres.genres.forEach(({ id, name }) => {
      if (id === genreId) {
        console.log(name)
        return name
      }
    })
  } else if (type === "TV") {
    dummyTVGenres.genres.forEach(({ id, name }) => {
      if (id === genreId) {
        console.log(name)
        return name
      }
    })
  }
  return "Unknown"
}
