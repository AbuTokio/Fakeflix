import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import StarRating from "../../../components/starRating/StarRating"
import Badge from "../../../components/badge/Badge"
import MovieSection from "../../../components/movieSection/MovieSection"
import MovieCard from "../../../components/movieCard/MovieCard"
import { SkeletonCard } from "../../../components/skeletonCard/SkeletonCard"
import MediaPlayer from "../../../components/mediaPlayer/MediaPlayer"
import Animation from "../../../components/animation/Animation"
import Button from "../../../components/button/Button"
import { TMDB_IMG_BASE, TmdbImageSize } from "../../../enum/TmdbImage"
import { useMain } from "../../../hooks/ContextHooks"
import NavIcon from "../../../components/navIcon/NavIcon"
import ShareDialog from "../../../components/shareDialog/ShareDialog"
import { Toaster } from "react-hot-toast"

function InfoItem({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={["flex gap-2 text-zinc-300", className].filter(Boolean).join(" ")}>
      <dt className="w-28 shrink-0 text-zinc-400">{label} :</dt>
      <dd className="flex-1">{value}</dd>
    </div>
  )
}

function formatRuntime(min?: number | null) {
  if (!min || Number.isNaN(min)) return "—"
  const h = Math.floor(min / 60)
  const m = min % 60
  return h > 0 ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m}m`
}

export default function MovieDetail() {
  const {
    movieDetails,
    movieSimilar,
    movieVideos,
    fetchMovieDetails,
    fetchMovieSimilar,
    fetchMovieVideos,
    loading,

    openMovieDialog,
  } = useMain()

  const { id } = useParams<{ id: string }>()
  const movieId = id ? Number(id) : null

  const [showShareDialog, setShowShareDialog] = useState(false)

  // Daten laden
  useEffect(() => {
    if (!movieId) return
    fetchMovieDetails(movieId)
    fetchMovieSimilar(movieId)
    fetchMovieVideos(movieId)
  }, [movieId])

  const trailerKey =
    movieVideos.find((v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))?.key ?? null

  const title = movieDetails?.title ?? movieDetails?.original_title ?? "—"
  const posterUrl = movieDetails?.poster_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${movieDetails.poster_path}`
    : null
  const backdropUrl = movieDetails?.backdrop_path
    ? `${TMDB_IMG_BASE}/${TmdbImageSize.BACKDROP_SIZE}${movieDetails.backdrop_path}`
    : null
  const genres = (movieDetails?.genres ?? []).map((g) => g.name)
  const year = String(movieDetails?.release_date ?? "").slice(0, 4)
  const rating = typeof movieDetails?.vote_average === "number" ? movieDetails!.vote_average : 0
  const overview = movieDetails?.overview ?? ""
  const country = (movieDetails?.production_countries ?? []).map((c) => c.name).join(", ")
  const releaseDate = movieDetails?.release_date ?? ""
  const production = (movieDetails?.production_companies ?? []).map((c) => c.name).join(", ")
  const runtimeMin = movieDetails?.runtime ?? 0

  return (
    <>
      <div className="absolute -top-10 bg-white w-10 h-10 z-999">
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      {/* Hero / Trailer */}
      <Animation delay={0.3} from={{ opacity: 0, scale: 0.9 }} to={{ opacity: 1, scale: 1, rotate: 0 }}>
        <section className="w-full overflow-hidden">
          <MediaPlayer youtubeKey={trailerKey} posterUrl={backdropUrl} className="w-full max-w-[1920px] mx-auto" />
        </section>
      </Animation>

      {/* Content */}
      <Animation delay={0.4}>
        <section className="bg-black text-zinc-100">
          <div className="w-full max-w-[1200px] xl:max-w-[1360px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] xl:grid-cols-[352px_1fr]">
              {/* Poster */}
              <div className="mx-auto hidden md:block md:mx-0 ">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`${title} Poster`}
                    loading="lazy"
                    className="rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] aspect-[2/3] object-cover w-full"
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
                    <Animation delay={0.5}>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                        {title ?? "—"}
                      </h1>
                    </Animation>

                    <Animation delay={0.6}>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex gap-2">
                          {genres.map((genre) => (
                            <Badge key={genre}>{genre}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="text-white w-6 cursor-pointer"
                            onClick={() => {
                              setShowShareDialog(true)
                            }}>
                            <NavIcon icon="share" />
                            {showShareDialog && (
                              <ShareDialog
                                onClose={() => {
                                  setShowShareDialog(false)
                                }}
                              />
                            )}
                          </div>
                          {/* TODO Add onclick */}
                          <Button
                            label="+ Watchlist"
                            filled
                            className="!py-1 !px-2 !text-xs shadow-[0_6px_0_rgba(220,38,38,0.35)] active:bg-red-600 active:text-white active:scale-90"
                          />
                        </div>
                      </div>
                    </Animation>

                    <Animation delay={0.7}>
                      <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                        <Badge muted hero>
                          <img src="/img/Calendar.svg" alt="" />
                          {year || "—"}
                        </Badge>
                        <Badge muted hero>
                          <img src="/img/clock.svg" alt="" />
                          {formatRuntime(runtimeMin)}
                        </Badge>
                        <StarRating value={rating} showNumber />
                      </div>
                    </Animation>
                  </div>
                </div>

                {/* Overview */}
                <Animation delay={0.8}>
                  {!!overview && (
                    <p className="max-w-prose text-sm sm:text-base leading-relaxed text-zinc-300">{overview}</p>
                  )}
                </Animation>

                {/* Meta */}
                <Animation delay={0.9}>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <InfoItem label="Country" value={country || "—"} />
                    <InfoItem label="Genre" value={genres.length ? genres.join(", ") : "—"} />

                    <InfoItem label="Date Release" value={String(releaseDate) || "—"} />
                    <InfoItem label="Production" value={production || "—"} />
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
            {loading.similar
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
              : movieSimilar.map((m) => <MovieCard key={m.id} movie={m} onOpen={() => openMovieDialog(m)} />)}
          </MovieSection>
        </div>
      </section>
    </>
  )
}
