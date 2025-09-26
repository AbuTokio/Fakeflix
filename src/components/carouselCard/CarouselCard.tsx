import { useState } from "react"
import { TmdbImageSize } from "../../enum/TmdbImage"
import { useResponsive } from "../../hooks/ResponsiveHooks"
import GenreIdToString from "../../utility/GenreIdToString"
import TmdbImage from "../../utility/TmdbImage"
import Button from "../button/Button"
import CarouselInfo from "../carouselInfo/CarouselInfo"
import { Navigate } from "react-router"
import { useMain } from "../../hooks/ContextHooks"
import ToggleWatchlist from "../../utility/ToggleWatchlist"
import type { ResultMovieList } from "../../interface/MovieList"
import Animation from "../animation/Animation"

interface CarouselCardProps {
  movie: ResultMovieList
}

export default function CarouselCard({ movie }: CarouselCardProps) {
  const [navigate, setNavigate] = useState(false)
  const bp = useResponsive()
  const mainCtx = useMain()

  return (
    <>
      <div
        className="relative w-full h-full"
        onClick={() => {
          if (!bp.isMd) setNavigate(true)
        }}>
        <Animation
          variant="parallax"
          parallaxStrength={160}
          parallaxAnchor="top"
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          freeze={!bp.isMd}
          markers={false}>
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={TmdbImage(movie.backdrop_path, TmdbImageSize.BACKDROP_SIZE)}
            alt={`${movie.title}-backdrop`}
          />
        </Animation>

        {/* Gradient-Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Inhalt */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
          {bp.isMd && (
            <div
              className={`absolute w-full ${
                bp.isMd ? "top-1/2" : "bottom-2/9"
              } left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex gap-6 justify-center items-center`}>
              <Button filled label="See Details" imgUrl="/src/assets/img/play.svg" onClick={() => setNavigate(true)} />
              <Button
                label={`${mainCtx.watchlist.includes(movie) ? "✓" : "+"} Watchlist`}
                imgUrl="/src/assets/img/clock.svg"
                onClick={() => ToggleWatchlist(mainCtx.user, mainCtx.watchlist, mainCtx.setWatchlist, movie)}
              />
            </div>
          )}
          {/* TODO GENREIDTOSTRING anpassen */}
          <div className={`absolute ${bp.isMd ? "bottom-20" : "bottom-8"} w-full px-4 md:px-12`}>
            <Animation useParentAsTrigger freeze={!bp.isMd} className="pointer-events-none">
              {/* <CarouselInfo
                title={movie.title}
                // tags={movie.genre_ids.map((g) => GenreIdToString("movie", g))}
                info={{ releaseDate: movie.release_date, rating: movie.vote_average }}
                description={movie.overview}
              /> */}
              <div></div>
            </Animation>
          </div>
        </div>
      </div>

      {navigate && <Navigate to={`/movies/detail/${movie.id}`} />}
    </>
  )
}
