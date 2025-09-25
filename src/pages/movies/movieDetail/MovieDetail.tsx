import React, { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router"
import StarRating from "../../../components/starRating/StarRating"
import Badge from "../../../components/badge/Badge"
import CarouselTag from "../../../components/carouselTag/CarouselTag"
import { dummyMovieDetails, dummyMoviePopular } from "../../../dummy/data"
import { TMDB_IMG_BASE, TmdbImageSize } from "../../../enum/TmdbImage"
import MovieSection from "../../../components/movieSection/MovieSection"
import MovieCard from "../../../components/movieCard/MovieCard"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import MovieDialog from "../../../components/movieDialog/MovieDialog"
import MediaPlayer from "../../../components/mediaPlayer/MediaPlayer"
import Animation from "../../../components/animation/Animation"
import Button from "../../../components/button/Button"
import { useMain } from "../../../hooks/ContextHooks"

function InfoItem({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={["flex gap-2 text-zinc-300", className].filter(Boolean).join(" ")}>
      <dt className="w-28 shrink-0 text-zinc-400">{label} :</dt>
      <dd className="flex-1">{value}</dd>
    </div>
  )
}

function formatRuntime(min: number) {
  if (!min || Number.isNaN(min)) return "—"
  const h = Math.floor(min / 60)
  const m = min % 60
  return h > 0 ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m}m`
}

export default function MovieDetail() {
  const mainCtx = useMain()
  const { id } = useParams<{ id: string }>()
  const movieId = id ? Number(id) : null
  const [openId, setOpenId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // dummy

  const movies = dummyMoviePopular.results

  const handleOpen = useCallback((id: number) => {
    setOpenId(id)
  }, [])

  const handleClose = useCallback(() => setOpenId(null), [])

  const selected = movies.find((m) => m.id === openId)!

  // dummy
  const details = useMemo(() => {
    if (!movieId) return dummyMovieDetails
    const fromList = dummyMoviePopular.results.find((m) => m.id === movieId)
    if (!fromList) return { ...dummyMovieDetails, id: movieId }

    return {
      ...dummyMovieDetails,
      id: movieId,
      title: fromList.title ?? dummyMovieDetails.title,
      original_title: fromList.original_title ?? dummyMovieDetails.original_title,
      poster_path: fromList.poster_path ?? dummyMovieDetails.poster_path,
      backdrop_path: fromList.backdrop_path ?? dummyMovieDetails.backdrop_path,
      release_date: fromList.release_date ?? dummyMovieDetails.release_date,
      vote_average: fromList.vote_average ?? dummyMovieDetails.vote_average,
      overview: fromList.overview ?? dummyMovieDetails.overview,
    }
  }, [movieId])

  // dummy Image Builder behalten
  const data = useMemo(() => {
    const backdrop_path = details.backdrop_path
    const poster_path = details.poster_path

    const posterUrl = poster_path ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${poster_path}` : null
    const backdropUrl = backdrop_path ? `${TMDB_IMG_BASE}/${TmdbImageSize.BACKDROP_SIZE}${backdrop_path}` : null

    return {
      id: details.id,
      title: details.title || details.original_title,
      genres: (details.genres ?? []).map((g) => g.name),
      posterUrl,
      backdropUrl,
      year: (details.release_date ?? "").slice(0, 4),
      runtimeMin: details.runtime ?? 0,
      rating: details.vote_average ?? 0,
      overview: details.overview ?? "",
      country: (details.production_countries ?? []).map((c) => c.name).join(", "),
      releaseDate: details.release_date ?? "",
      production: (details.production_companies ?? []).map((c) => c.name).join(", "),
      cast: [] as string[],
    }
  }, [details])

  return (
    <>
      {/* Hero / Trailer */}
      <Animation delay={0.1}>
        <section className="w-full overflow-hidden ">
          <MediaPlayer
            youtubeKey={"3SgL3ygGm1s"}
            // TODO: dynamisch
            posterUrl={data.backdropUrl}
            className="w-full max-w-[1920px] mx-auto"
          />
        </section>
      </Animation>

      {/* Content */}
      <Animation delay={0.4}>
        <section className="bg-black text-zinc-100">
          <div className="w-full max-w-[1200px] xl:max-w-[1360px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            {/* Grid: stack auf mobil*/}
            <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] xl:grid-cols-[352px_1fr]">
              {/* Poster */}
              <div className="mx-auto hidden md:block md:mx-0 ">
                {data.posterUrl ? (
                  <img
                    src={data.posterUrl}
                    alt={`${data.title} Poster`}
                    loading="lazy"
                    className=" rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] aspect-[2/3] object-cover w-full "
                  />
                ) : (
                  <div className="aspect-[2/3] object-cover w-full rounded-xl bg-neutral-800 grid place-items-center text-neutral-400">
                    No poster
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 py-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Animation>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                        {data.title}
                      </h1>
                    </Animation>
                    <Animation>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex gap-2">
                          {data.genres.map((genre) => (
                            <Badge key={genre}>{genre}</Badge>
                          ))}
                        </div>
                        <div>
                          {/* TODO Add onclick */}
                          <Button
                            label="+ Watchlist"
                            filled
                            className="!py-1 !px-2 !text-xs shadow-[0_6px_0_rgba(220,38,38,0.35)] active:bg-red-600 active:text-white active:scale-90"
                          />
                        </div>
                      </div>
                    </Animation>
                    <Animation>
                      <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                        <Badge muted hero>
                          <img src="/img/Calendar.svg" alt="" />
                          {data.year || "—"}
                        </Badge>
                        <Badge muted hero>
                          <img src="/img/clock.svg" alt="" />
                          {formatRuntime(data.runtimeMin)}
                        </Badge>
                        <StarRating value={data.rating} showNumber />
                      </div>
                    </Animation>
                  </div>
                </div>

                {/* Overview */}
                <Animation>
                  {data.overview && (
                    <p className="max-w-prose text-sm sm:text-base leading-relaxed text-zinc-300">{data.overview}</p>
                  )}
                </Animation>

                {/* Meta */}
                <Animation>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <InfoItem label="Country" value={data.country || "—"} />
                    <InfoItem label="Genre" value={data.genres.length ? data.genres.join(", ") : "—"} />
                    <InfoItem label="Date Release" value={data.releaseDate || "—"} />
                    <InfoItem label="Production" value={data.production || "—"} />
                    <InfoItem
                      label="Cast"
                      value={data.cast.length ? data.cast.join(", ") : "—"}
                      className="flex flex-wrap"
                    />
                  </div>
                </Animation>
              </div>
            </div>
          </div>
        </section>
      </Animation>

      {/* Recommendations */}
      <section className="w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <MovieSection grid title="You may also like">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
              : movies.map((m) => <MovieCard key={m.id} movie={m} onOpen={handleOpen} />)}
          </MovieSection>
        </div>
      </section>

      {openId !== null && (
        <MovieDialog open ctaHref={`/movies/detail/${openId}`} onClose={handleClose} data={selected} />
      )}
    </>
  )
}
