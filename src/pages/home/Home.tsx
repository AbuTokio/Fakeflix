import { useCallback, useState } from "react"
import { SkeletonCard } from "../../components/skeletonCard/SkeletonCard"
import Carousel from "../../components/carousel/Carousel"
import MovieSection from "../../components/movieSection/MovieSection"
import MovieCard from "../../components/movieCard/MovieCard"
import MovieDialog from "../../components/movieDialog/MovieDialog"
import { dummyMoviePopular } from "../../dummy/data"
import CarouselCard from "../../components/carouselCard/CarouselCard"
import Animation from "../../components/animation/Animation"
import CardCarousel from "../../components/cardCarousel/CardCarousel"

export default function Home() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [loading] = useState(false)

  const movies = dummyMoviePopular.results

  const handleOpen = useCallback((id: number) => {
    setOpenId(id)
  }, [])

  const handleClose = useCallback(() => setOpenId(null), [])

  const selected = movies.find((m) => m.id === openId)!
  return (
    <>
      <Animation className="w-full h-full">
        <Carousel
          cards={movies.slice(0, 5).map((movie) => (
            <CarouselCard movie={movie} />
          ))}
        />
      </Animation>
      <section className="p-6">
        <MovieSection title="Top Rated" viewAllHref="/movies/top">
          <CardCarousel
            cards={
              loading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : movies.map((m) => <MovieCard key={m.id} movie={m} onOpen={handleOpen} />)
            }
          />
        </MovieSection>
      </section>
      {openId !== null && (
        <MovieDialog open ctaHref={`/movies/detail/${openId}`} onClose={handleClose} data={selected} />
      )}
    </>
  )
}
