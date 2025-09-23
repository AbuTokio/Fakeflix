import type { dummyMoviePopular } from "../../dummy/data"
import { TmdbImageSize } from "../../enum/TmdbImage"
import GenreIdToString from "../../utility/GenreIdToString"
import TmdbImage from "../../utility/TmdbImage"
import Button from "../button/Button"
import CarouselInfo from "../carouselInfo/CarouselInfo"

interface CarouselCardProps {
  movie: (typeof dummyMoviePopular.results)[0]
}

export default function CarouselCard({ movie }: CarouselCardProps) {
  return (
    <>
      <img
        className="w-full h-full object-cover"
        src={TmdbImage(movie.backdrop_path, TmdbImageSize.BACKDROP_SIZE)}
        alt={`${movie.title}-backdrop`}
      />
      <div className="absolute h-full w-full top-0 left-0 flex flex-col gap-6 justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 justify-center items-center">
          <Button filled label="Watch Now" imgUrl="/src/assets/img/play.svg" />
          <Button label="Watch Later" imgUrl="/src/assets/img/clock.svg" />
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-12">
          <CarouselInfo
            title={movie.title}
            tags={movie.genre_ids.map((genreId) => GenreIdToString("movie", genreId))}
            description={movie.overview}
          />
        </div>
      </div>
    </>
  )
}
