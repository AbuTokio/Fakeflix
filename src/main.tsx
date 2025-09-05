import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import "./index.css"
import App from "./App.tsx"
import Home from "./pages/home/Home.tsx"
import Movies from "./pages/movies/Movies.tsx"
import MoviesHome from "./pages/movies/home/MoviesHome.tsx"
import MoviesHomev2 from "./pages/movies/home/MovieHomev2.tsx"
import MovieDetail from "./pages/movies/movieDetail/MovieDetail.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "movies",
        Component: Movies,
        children: [
          { index: true, Component: MoviesHomev2 },
          { path: "moviedetail", Component: MovieDetail },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
