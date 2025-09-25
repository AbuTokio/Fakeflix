import { useState } from "react"
import { TmdbImageSize } from "../../enum/TmdbImage"
import { useResponsive } from "../../hooks/ResponsiveHooks"
import GenreIdToString from "../../utility/GenreIdToString"
import TmdbImage from "../../utility/TmdbImage"
import Button from "../button/Button"
import CarouselInfo from "../carouselInfo/CarouselInfo"
import { Navigate } from "react-router"
import { useMain } from "../../hooks/ContextHooks"
import AddToWatchlist from "../../utility/AddToWatchlist"
import type { ResultMovieList } from "../../interface/MovieList"
import Animation from "../animation/Animation"

interface CarouselCardProps {
  movie: ResultMovieList
}

export default function CarouselCard({ movie }: CarouselCardProps) {
  const [navigate, setNavigate] = useState(false)
  const bp = useResponsive()
  const mainCtx = useMain()

  const backdropUrl = movie.backdrop_path
    ? TmdbImage(movie.backdrop_path, TmdbImageSize.BACKDROP_SIZE)
    : "/img/placeholder-backdrop.jpg"

  return (
    <>
      <div
        className="relative aspect-[16/9] overflow-hidden "
        onClick={() => {
          if (!bp.isMd) setNavigate(true)
        }}>
        <Animation variant="parallax" parallaxStrength={160} parallaxAnchor="top" className="absolute inset-0" markers>
          <img className="w-full h-full object-cover" src={backdropUrl} alt={`${movie.title}-backdrop`} />
        </Animation>

        {/* Gradient-Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Inhalt */}
        <div className="absolute inset-0 flex flex-col gap-6 justify-center items-center">
          {bp.isMd && (
            <div
              className={`absolute w-full ${
                bp.isMd ? "top-1/2" : "bottom-2/9"
              } left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex gap-6 justify-center items-center`}>
              <Button filled label="See Details" imgUrl="/img/play.svg" onClick={() => setNavigate(true)} />
              <Button
                label="+ Watchlist"
                imgUrl="/img/clock.svg"
                onClick={() => AddToWatchlist(mainCtx.user, mainCtx.watchlist, mainCtx.setWatchlist, movie)}
              />
            </div>
          )}

          <div
            className={`absolute h-fit ${
              bp.isMd ? "bottom-20" : "bottom-8"
            } md:left-1/2 md:-translate-x-1/2 w-full px-4 md:px-12`}>
            <Animation useParentAsTrigger>
              <CarouselInfo
                title={movie.title}
                tags={movie.genre_ids.map((genreId) => GenreIdToString("movie", genreId))}
                info={{ releaseDate: movie.release_date, rating: movie.vote_average }}
                description={movie.overview}
              />
            </Animation>
          </div>
        </div>
      </div>

      {navigate && <Navigate to={`/movies/detail/${movie.id}`} />}
    </>
  )
}
