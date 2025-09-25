import { createContext, useEffect, useState, useEffect, useState } from "react"
import type { dummyMoviePopular } from "../dummy/data"
import type { Genre, MovieGenre } from "../interface/Genre"
import type { MovieDetails, MovieSimilar, MovieVideos, ResultVideo } from "../interface/Movie"
import type { ResultMovieList } from "../interface/MovieList"
import { tmdb } from "../api/tmdb"

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<MainContextProps | null>(null)

interface MainContextProps {
  movieGenres: Genre[]
  moviePopular: ResultMovieList[]
  movieTopRated: ResultMovieList[]
  movieUpcoming: ResultMovieList[]
  movieDetails: MovieDetails | null
  movieSimilar: ResultMovieList[]
  movieVideos: ResultVideo[]
  searchedMovies: ResultMovieList[]
  discoveredMovies: ResultMovieList[]

  loading: {
    genres: boolean
    popular: boolean
    topRated: boolean
    upcoming: boolean
    details: boolean
    similar: boolean
    videos: boolean
    search: boolean
    discover: boolean
  }

  error: {
    genres: string | null
    popular: string | null
    topRated: string | null
    upcoming: string | null
    details: string | null
    similar: string | null
    videos: string | null
    search: string | null
    discover: string | null
  }
  fetchMovieDetails: (id: number) => Promise<void>
  fetchMovieSimilar: (id: number) => Promise<void>
  fetchMovieVideos: (id: number) => Promise<void>
  searchMovies: (query: string) => Promise<void>
  discoverMovies: (genreId: number) => Promise<void>
}
interface MainContextProps {
  watchlist: typeof dummyMoviePopular.results
  setWatchlist: React.Dispatch<React.SetStateAction<typeof dummyMoviePopular.results>>
  user: { name: string; email: string } | null
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<typeof dummyMoviePopular.results>([])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem(`watchlist_${user?.email}`) ?? "[]"))
  }, [user])

  const value: MainContextProps = {
    watchlist,
    setWatchlist,
    user,
    setUser,
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [moviePopular, setMoviePopular] = useState<ResultMovieList[]>([])
  const [movieTopRated, setMovieTopRated] = useState<ResultMovieList[]>([])
  const [movieUpcoming, setMovieUpcoming] = useState<ResultMovieList[]>([])
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [movieSimilar, setMovieSimilar] = useState<ResultMovieList[]>([])
  const [movieVideos, setMovieVideos] = useState<ResultVideo[]>([])
  const [searchedMovies, setSearchedMovies] = useState<ResultMovieList[]>([])
  const [discoveredMovies, setDiscoveredMovies] = useState<ResultMovieList[]>([])

  const [loading, setLoading] = useState({
    genres: false,
    popular: false,
    topRated: false,
    upcoming: false,
    details: false,
    similar: false,
    videos: false,
    search: false,
    discover: false,
  })

  const [error, setError] = useState<MainContextProps["error"]>({
    genres: null,
    popular: null,
    topRated: null,
    upcoming: null,
    details: null,
    similar: null,
    videos: null,
    search: null,
    discover: null,
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
    //Initial die Genres laden
    fetchGenres()
  }, [])

  //# MOVIE LISTS - Popular - https://developer.themoviedb.org/reference/movie-popular-list
  // "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  useEffect(() => {
    async function fetchPopular() {
      setLoading((prev) => ({ ...prev, popular: true }))
      setError((prev) => ({ ...prev, popular: null }))
      try {
        const res = await tmdb.get<ResultMovieList>("/movie/popular", { params: { page: 1 } })
        setMoviePopular(res.data.results)
      } catch (err) {
        console.error("Fehler beim Laden der populären Filme", err)
        setError((prev) => ({ ...prev, popular: "Populäre Filme konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, popular: false }))
      }
    }
    //Initial die Popular Movies laden
    fetchPopular()
  }, [])

  //# MOVIE LISTS - Top Rated - https://developer.themoviedb.org/reference/movie-top-rated-list
  // "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  useEffect(() => {
    async function fetchTopRated() {
      setLoading((prev) => ({ ...prev, topRated: true }))
      setError((prev) => ({ ...prev, topRated: null }))
      try {
        const res = await tmdb.get<ResultMovieList>("/movie/top_rated", { params: { page: 1 } })
        setMovieTopRated(res.data.results)
      } catch (err) {
        console.error("Fehler beim Laden der Top Rated Filme", err)
        setError((prev) => ({ ...prev, topRated: "Top Rated Filme konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, topRated: false }))
      }
    }
    //Initial die Top Rated Movies laden
    fetchTopRated()
  }, [])

  //# MOVIE LISTS - Upcoming - https://developer.themoviedb.org/reference/movie-upcoming-list
  // "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
  useEffect(() => {
    async function fetchUpcoming() {
      setLoading((prev) => ({ ...prev, upcoming: true }))
      setError((prev) => ({ ...prev, upcoming: null }))
      try {
        const res = await tmdb.get<ResultMovieList>("/movie/upcoming", { params: { page: 1 } })
        setMovieUpcoming(res.data.results)
      } catch (err) {
        console.error("Fehler beim Laden der kommenden Filme", err)
        setError((prev) => ({ ...prev, upcoming: "Kommende Filme konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, upcoming: false }))
      }
    }
    //Initial die Upcoming Movies laden
    fetchUpcoming()
  }, [])

  //# MOVIES - Details - https://developer.themoviedb.org/reference/movie-details
  // "https://api.themoviedb.org/3/movie/movie_id?language=en-US"
  async function fetchMovieDetails(id: number) {
    setLoading((prev) => ({ ...prev, details: true }))
    setError((prev) => ({ ...prev, details: null }))
    try {
      const res = await tmdb.get<MovieDetails>(`/movie/${id}`)
      setMovieDetails(res.data)
    } catch (err) {
      console.error("Fehler beim Laden der Filmdetails", err)
      setError((prev) => ({ ...prev, details: "Filmdetails konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, details: false }))
    }
  }

  //# MOVIES - Similar - https://developer.themoviedb.org/reference/movie-similar
  // "https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1"
  async function fetchMovieSimilar(id: number) {
    setLoading((prev) => ({ ...prev, similar: true }))
    setError((prev) => ({ ...prev, similar: null }))
    try {
      const res = await tmdb.get<MovieSimilar>(`/movie/${id}/similar`, { params: { page: 1 } })
      setMovieSimilar(res.data.results)
    } catch (err) {
      console.error("Fehler beim Laden ähnlicher Filme", err)
      setError((prev) => ({ ...prev, similar: "Ähnliche Filme konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, similar: false }))
    }
  }

  //# MOVIES - Videos - https://developer.themoviedb.org/reference/movie-videos
  // https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US
  async function fetchMovieVideos(id: number) {
    setLoading((prev) => ({ ...prev, videos: true }))
    setError((prev) => ({ ...prev, videos: null }))
    try {
      const res = await tmdb.get<MovieVideos>(`/movie/${id}/videos`)
      setMovieVideos(res.data.results)
    } catch (err) {
      console.error("Fehler beim Laden der Filmvideos", err)
      setError((prev) => ({ ...prev, videos: "Filmvideos konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, videos: false }))
    }
  }

  //# SEARCH - Movie - https://developer.themoviedb.org/reference/search-movie
  // "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1"
  async function searchMovies(query: string) {
    setLoading((prev) => ({ ...prev, search: true }))
    setError((prev) => ({ ...prev, search: null }))
    try {
      const res = await tmdb.get<ResultMovieList>("/search/movie", {
        params: { query, include_adult: false, page: 1 },
      })
      setSearchedMovies(res.data.results)
    } catch (err) {
      console.error("Fehler bei der Filmsuche", err)
      setError((prev) => ({ ...prev, search: "Filme konnten nicht gesucht werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, search: false }))
    }
  }

  //# DISCOVER - Movie - https://developer.themoviedb.org/reference/discover-movie
  // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres={genre ID}"
  async function discoverMovies(genreId: number) {
    setLoading((prev) => ({ ...prev, discover: true }))
    setError((prev) => ({ ...prev, discover: null }))
    try {
      const res = await tmdb.get<ResultMovieList>("/discover/movie", {
        params: {
          with_genres: genreId,
          include_adult: false,
          include_video: false,
          sort_by: "popularity.desc",
          page: 1,
        },
      })
      setDiscoveredMovies(res.data.results)
    } catch (err) {
      console.error("Fehler beim Laden der Discover-Filme", err)
      setError((prev) => ({ ...prev, discover: "Discover-Filme konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, discover: false }))
    }
  }

  //Für bessere lesbarkeit
  const value: MainContextProps = {
    movieGenres,
    moviePopular,
    movieTopRated,
    movieUpcoming,
    movieDetails,
    movieSimilar,
    movieVideos,
    searchedMovies,
    discoveredMovies,
    loading,
    error,
    fetchMovieDetails,
    fetchMovieSimilar,
    fetchMovieVideos,
    searchMovies,
    discoverMovies,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
