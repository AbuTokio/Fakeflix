import { createContext, useEffect, useState } from "react"
import type { Genre, MovieGenre } from "../interface/Genre"
import type { Movie } from "../interface/Movie"
import { tmdb } from "../api/tmdb"

export const mainContext = createContext<MainContextProps | null>(null)

interface MainContextProps {
  movieGenres: Genre[]
  moviePopular: Movie[]
  movieTopRated: Movie[]
  loading: {
    genres: boolean
    popular: boolean
    topRated: boolean
  }
  error: {
    genres: string | null
    popular: string | null
    topRated: string | null
  }
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [moviePopular, setMoviePopular] = useState<Movie[]>([])
  const [movieTopRated, setMovieTopRated] = useState<Movie[]>([])

  const [loading, setLoading] = useState({
    genres: false,
    popular: false,
    topRated: false,
  })

  const [error, setError] = useState({
    genres: null as string | null,
    popular: null as string | null,
    topRated: null as string | null,
  })

  //# GENRES - Movie List - https://developer.themoviedb.org/reference/genre-movie-list
  // https://api.themoviedb.org/3/genre/movie/list?language=en

  useEffect(() => {
    async function fetchGenres() {
      setLoading((prev) => ({ ...prev, genres: true }))
      setError((prev) => ({ ...prev, genres: null }))

      try {
        const res = await tmdb.get<MovieGenre>("/genre/movie/list")
        setMovieGenres(res.data.genres)
      } catch (err) {
        console.error("Fehler beim Laden der Genres", err)
        setError((prev) => ({ ...prev, genres: "Genres konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, genres: false }))
      }
    }

    fetchGenres()
  }, [])

  //# MOVIE LISTS - Popular - https://developer.themoviedb.org/reference/movie-popular-list
  // "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"

  useEffect(() => {
    async function fetchPopular() {
      setLoading((prev) => ({ ...prev, popular: true }))
      setError((prev) => ({ ...prev, popular: null }))

      try {
        const res = await tmdb.get("/movie/popular", { params: { page: 1 } })
        setMoviePopular(res.data.results)
      } catch (err) {
        console.error("Fehler beim Laden der populären Filme", err)
        setError((prev) => ({ ...prev, popular: "Populäre Filme konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, popular: false }))
      }
    }

    fetchPopular()
  }, [])

  //# MOVIE LISTS	-	Top Rated - https://developer.themoviedb.org/reference/movie-top-rated-list
  // "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"

  useEffect(() => {
    async function fetchTopRated() {
      setLoading((prev) => ({ ...prev, topRated: true }))
      setError((prev) => ({ ...prev, topRated: null }))

      try {
        const res = await tmdb.get("/movie/top_rated", { params: { page: 1 } })
        setMovieTopRated(res.data.results)
      } catch (err) {
        console.error("Fehler beim Laden der Top Rated Filme", err)
        setError((prev) => ({ ...prev, topRated: "Top Rated Filme konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, topRated: false }))
      }
    }

    fetchTopRated()
  }, [])

  const value: MainContextProps = {
    movieGenres,
    moviePopular,
    movieTopRated,
    loading,
    error,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}

//# MOVIE LISTS	-	Upcoming - https://developer.themoviedb.org/reference/movie-upcoming-list
// "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"

//# MOVIES - Details - https://developer.themoviedb.org/reference/movie-details
// "https://api.themoviedb.org/3/movie/movie_id?language=en-US"

//# MOVIES - Similar - https://developer.themoviedb.org/reference/movie-similar
// "https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1"

//# MOVIES - Videos - https://developer.themoviedb.org/reference/movie-videos
// https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US

//# SEARCH - Movie - https://developer.themoviedb.org/reference/search-movie
// "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1"

//# DISCOVER - Movie - https://developer.themoviedb.org/reference/discover-movie
// "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres={genre ID}'
//todo mit discover soll die ID des Genres verwendet werden
