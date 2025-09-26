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
        onClick={() => {
          if (!bp.isMd) setNavigate(true)
        }}>
        <img
          className="w-full h-full object-cover"
          src={TmdbImage(movie.backdrop_path, TmdbImageSize.BACKDROP_SIZE)}
          alt={`${movie.title}-backdrop`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div className="absolute h-full w-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
          {bp.isMd && (
            <div
              className={`absolute w-full ${
                bp.isMd ? "top-1/2" : "bottom-2/9"
              } left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex gap-6 justify-center items-center`}>
              <Button filled label="See Details" imgUrl="/img/play.svg" onClick={() => setNavigate(true)} />
              <Button
                label={`${mainCtx.watchlist.some((m) => m.id === movie.id) ? "✓" : "+"} Watchlist`}
                imgUrl="/src/assets/img/clock.svg"
                onClick={() => ToggleWatchlist(mainCtx.user, mainCtx.watchlist, mainCtx.setWatchlist, movie)}
              />
            </div>
          )}
          <div
            className={`absolute h-fit ${
              bp.isMd ? "bottom-20" : "bottom-8"
            } md:left-1/2 md:-translate-x-1/2 w-full px-4 md:px-12`}>
            {/* FIXME GenreIDtoString */}
            <CarouselInfo
              title={movie.title}
              tags={movie.genre_ids.map((genreId: number) => GenreIdToString(genreId))}
              info={{ releaseDate: movie.release_date, rating: movie.vote_average }}
              description={movie.overview}
            />
          </div>
        </div>
      </div>
      {navigate && <Navigate to={`/movies/detail/${movie.id}`} />}
    </>
  )
}
