import { useState } from "react"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import Carousel from "../../components/carousel/Carousel"
import MovieSection from "../../components/movieSection/MovieSection"
import MovieCard from "../../components/movieCard/MovieCard"
import CarouselCard from "../../components/carouselCard/CarouselCard"
import Animation from "../../components/animation/Animation"
import CardCarousel from "../../components/cardCarousel/CardCarousel"
import { useMain } from "../../hooks/ContextHooks"

export default function Home() {
  const { moviePopular, movieTopRated, movieUpcoming, openMovieDialog } = useMain()
  const [loading] = useState()

  return (
    <>
      <Animation className="w-full h-full">
        <Carousel
          cards={moviePopular.slice(0, 5).map((movie) => (
            <CarouselCard movie={movie} />
          ))}
        />
      </Animation>

      <section className="p-6">
        <MovieSection title="Top Rated" viewAllHref="/genres/toprated">
          <CardCarousel
            cards={
              loading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : movieTopRated
                    .slice(0, 10)
                    .map((m) => <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />)
            }
          />
        </MovieSection>
      </section>
      <section className="p-6">
        <MovieSection title="Popular" viewAllHref="/genres/popular">
          <CardCarousel
            cards={
              loading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : moviePopular
                    .slice(0, 10)
                    .map((m) => <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />)
            }
          />
        </MovieSection>
      </section>
      <section className="p-6">
        <MovieSection title="Upcoming" viewAllHref="/genres/upcoming">
          <CardCarousel
            cards={
              loading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : movieUpcoming
                    .slice(0, 10)
                    .map((m) => <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />)
            }
          />
        </MovieSection>
      </section>
    </>
  )
}
