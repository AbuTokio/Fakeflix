import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import NotFound from "./pages/notFound/NotFound"
import MovieDetail from "./pages/movies/movieDetail/MovieDetail"
import MainProvider from "./context/MainProvider"
import Genres from "./pages/genre/Genres"
import GenreDetail from "./pages/genre/genreDetail/GenreDetail"
import Intro from "./pages/home/Intro"
import Home from "./pages/home/Home"
import Watchlist from "./pages/watchlist/Watchlist"
import Login from "./pages/login/Login"
import Search from "./pages/search/Search"
import DiscoverDetail from "./pages/discover/discoverDetail/DiscoverDetail"

function App() {
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
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies/genre/:genre" element={""} />
        <Route path="/movies/detail/:id" element={<MovieDetail />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<GenreDetail />} />
        <Route path="/discover/:discover" element={<DiscoverDetail />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
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
