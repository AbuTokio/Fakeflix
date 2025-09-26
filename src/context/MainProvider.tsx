import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import type { Genre, MovieGenre } from "../interface/Genre"
import type { MovieDetails, MovieSimilar, MovieVideos, ResultVideo } from "../interface/Movie"
import type { ResponseMovieList, ResultMovieList } from "../interface/MovieList"
import { tmdb } from "../api/tmdb"
import type { ResultMovie } from "../interface/Search"

export const mainContext = createContext<MainContextProps | null>(null)

type DialogData = ResultMovieList | ResultMovie | MovieDetails

type DialogState = {
  open: boolean
  movieId: number | null
  data: DialogData | null
}

interface MainContextProps {
  movieGenres: Genre[]
  moviePopular: ResultMovieList[]
  movieTopRated: ResultMovieList[]
  movieUpcoming: ResultMovieList[]
  movieDetails: MovieDetails | null
  movieSimilar: ResultMovieList[]
  movieVideos: ResultVideo[]
  searchedMovies: ResultMovieList[]
  discoveredMovies: Record<number, ResultMovieList[]>

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

  fetchPopular: (page: number) => Promise<void>
  fetchTopRated: (page: number) => Promise<void>
  fetchUpcoming: (page: number) => Promise<void>
  fetchMovieDetails: (id: number) => Promise<void>
  fetchMovieSimilar: (id: number) => Promise<void>
  fetchMovieVideos: (id: number) => Promise<void>
  searchMovies: (query: string) => Promise<void>
  discoverMovies: (genreId: number, page: number) => Promise<void>
  loadingByGenre: Record<number, boolean>
  errorByGenre: Record<number, string | null>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  setTotalPages: React.Dispatch<React.SetStateAction<number>>

  watchlist: (MovieDetails | ResultMovieList)[]
  setWatchlist: React.Dispatch<React.SetStateAction<(MovieDetails | ResultMovieList)[]>>
  user: { name: string; email: string } | null
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>

  dialog: DialogState
  openMovieDialog: (item: DialogData) => void
  closeMovieDialog: () => void
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<(MovieDetails | ResultMovieList)[]>([])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem(`watchlist_${user?.email}`) ?? "[]"))
  }, [user])

  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [moviePopular, setMoviePopular] = useState<ResultMovieList[]>([])
  const [movieTopRated, setMovieTopRated] = useState<ResultMovieList[]>([])
  const [movieUpcoming, setMovieUpcoming] = useState<ResultMovieList[]>([])
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [movieSimilar, setMovieSimilar] = useState<ResultMovieList[]>([])
  const [movieVideos, setMovieVideos] = useState<ResultVideo[]>([])
  const [searchedMovies, setSearchedMovies] = useState<ResultMovieList[]>([])
  const [discoveredMovies, setDiscoveredMovies] = useState<Record<number, ResultMovieList[]>>({})
  const [loadingByGenre, setLoadingByGenre] = useState<Record<number, boolean>>({})
  const [errorByGenre, setErrorByGenre] = useState<Record<number, string | null>>({})
  const [dialog, setDialog] = useState<DialogState>({ open: false, movieId: null, data: null })

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

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  useEffect(() => {
    async function fetchGenres() {
      setLoading((prev) => ({ ...prev, genres: true }))
      setError((prev) => ({ ...prev, genres: null }))
      try {
        const res = await tmdb.get<MovieGenre>("/genre/movie/list")
        setMovieGenres(res.data.genres.filter((genre) => genre.id !== 10749))
      } catch (err) {
        console.error("Fehler beim Laden der Genres", err)
        setError((prev) => ({ ...prev, genres: "Genres konnten nicht geladen werden." }))
      } finally {
        setLoading((prev) => ({ ...prev, genres: false }))
      }
    }
    fetchGenres()
  }, [])

  async function fetchPopular(page: number) {
    setLoading((prev) => ({ ...prev, popular: true }))
    setError((prev) => ({ ...prev, popular: null }))
    try {
      const res = await tmdb.get<ResponseMovieList>("/movie/popular", { params: { page: page, region: "US" } })
      setMoviePopular(res.data.results.filter((movie) => movie.adult === false))
      setTotalPages(res.data.total_pages)
    } catch (err) {
      console.error("Fehler beim Laden der populären Filme", err)
      setError((prev) => ({ ...prev, popular: "Populäre Filme konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, popular: false }))
    }
  }

  useEffect(() => {
    fetchPopular(1)
  }, [])
  async function fetchTopRated(page: number) {
    setLoading((prev) => ({ ...prev, topRated: true }))
    setError((prev) => ({ ...prev, topRated: null }))
    try {
      const res = await tmdb.get<ResponseMovieList>("/movie/top_rated", { params: { page: page, region: "US" } })
      setMovieTopRated(res.data.results)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      console.error("Fehler beim Laden der Top Rated Filme", err)
      setError((prev) => ({ ...prev, topRated: "Top Rated Filme konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, topRated: false }))
    }
  }

  useEffect(() => {
    fetchTopRated(1)
  }, [])
  async function fetchUpcoming(page: number) {
    setLoading((prev) => ({ ...prev, upcoming: true }))
    setError((prev) => ({ ...prev, upcoming: null }))
    try {
      const res = await tmdb.get<ResponseMovieList>("/movie/upcoming", { params: { page: page, region: "US" } })
      setMovieUpcoming(res.data.results)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      console.error("Fehler beim Laden der kommenden Filme", err)
      setError((prev) => ({ ...prev, upcoming: "Kommende Filme konnten nicht geladen werden." }))
    } finally {
      setLoading((prev) => ({ ...prev, upcoming: false }))
    }
  }
  useEffect(() => {
    fetchUpcoming(1)
  }, [])

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

  async function searchMovies(query: string) {
    setLoading((prev) => ({ ...prev, search: true }))
    setError((prev) => ({ ...prev, search: null }))
    try {
      const res = await tmdb.get<ResponseMovieList>("/search/movie", {
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

  async function discoverMovies(genreId: number, page: number) {
    setLoadingByGenre((prev) => ({ ...prev, [genreId]: true }))
    setErrorByGenre((prev) => ({ ...prev, [genreId]: null }))
    try {
      const res = await tmdb.get<ResponseMovieList>("/discover/movie", {
        params: {
          with_genres: genreId,
          include_adult: false,
          include_video: false,
          sort_by: "popularity.desc",
          page: page,
        },
      })
      setDiscoveredMovies((prev) => ({ ...prev, [genreId]: res.data.results }))
      setTotalPages(res.data.total_pages)
    } catch (err) {
      console.error("Fehler bei der Filmsuche", err)
      setErrorByGenre((prev) => ({ ...prev, [genreId]: "Discover-Filme konnten nicht geladen werden." }))
    } finally {
      setLoadingByGenre((prev) => ({ ...prev, [genreId]: false }))
    }
  }

  const openMovieDialog = useCallback((item: DialogData) => {
    setDialog({ open: true, movieId: item.id, data: item })
    document.body.style.overflow = "hidden"
  }, [])

  const closeMovieDialog = useCallback(() => {
    setDialog({ open: false, movieId: null, data: null })
    document.body.style.overflow = ""
  }, [])

  const value = useMemo<MainContextProps>(
    () => ({
      movieGenres,
      moviePopular,
      movieTopRated,
      movieUpcoming,
      movieDetails,
      movieSimilar,
      movieVideos,
      searchedMovies,
      discoveredMovies,
      loadingByGenre,
      errorByGenre,
      loading,
      error,
      fetchMovieDetails,
      fetchMovieSimilar,
      fetchMovieVideos,
      searchMovies,
      discoverMovies,
      watchlist,
      setWatchlist,
      user,
      setUser,
      dialog,
      openMovieDialog,
      closeMovieDialog,
      fetchPopular,
      fetchTopRated,
      fetchUpcoming,
      page,
      setPage,
      totalPages,
      setTotalPages,
    }),
    [
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
      watchlist,
      user,
      dialog,
      openMovieDialog,
      closeMovieDialog,
      page,
      setPage,
      totalPages,
      setTotalPages,
    ]
  )

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
