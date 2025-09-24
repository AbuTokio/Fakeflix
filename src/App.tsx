import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import NotFound from "./pages/notFound/NotFound"
import MovieDetail from "./pages/movies/movieDetail/MovieDetail"
import Series from "./pages/series/Series"
import SeriesDetail from "./pages/series/seriesDetail/SeriesDetail"
import MainProvider from "./context/MainProvider"
import SeriesProvider from "./context/SeriesProvider"
import MoviesProvider from "./context/MoviesProvider"
import Genres from "./pages/genre/Genres"
import GenreDetail from "./pages/genre/genreDetail/GenreDetail"
import Intro from "./pages/home/Intro"
import Home from "./pages/home/Home"
import Watchlist from "./pages/watchlist/Watchlist"

function App() {
  // useEffect(() => useScrollToTop())

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainProvider>
            <Layout />
          </MainProvider>
        }>
        <Route index element={<Intro />} />

        <Route
          path="/home"
          element={
            <MoviesProvider>
              <Home />
            </MoviesProvider>
          }
        />
        <Route path="/movies/genre/:genre" element={""} />
        <Route path="/movies/detail/:id" element={<MovieDetail />} />

        <Route
          path="/series"
          element={
            <SeriesProvider>
              <Series />
            </SeriesProvider>
          }
        />
        <Route path="/series/genre/:genre" element={""} />
        <Route path="/series/detail/:id" element={<SeriesDetail />} />

        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:name" element={<GenreDetail />} />

        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
