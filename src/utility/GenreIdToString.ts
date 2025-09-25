// TODO drüber schauen
export default function GenreIdToString(type: "movie" | "TV", genreId: number): string {
  if (type === "movie") {
    const genre = dummyMovieGenres.genres.find(({ id }) => id === genreId)
    return genre ? genre.name : "Unkown"
  } else if (type === "TV") {
    const genre = dummyTVGenres.genres.find(({ id }) => id === genreId)
    return genre ? genre.name : "Unkown"
  }
  return "Unkown"
}
