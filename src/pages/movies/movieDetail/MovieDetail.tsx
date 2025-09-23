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
  const { id } = useParams<{ id: string }>()
  const movieId = id ? Number(id) : null
  const [openId, setOpenId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

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

  // dummy
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
      {/* TODO Youtube Link richtig einbinden nicht hardcoden */}
      <section className="border border-red-500">
        <MediaPlayer youtubeKey={"3SgL3ygGm1s"} posterUrl={data.backdropUrl} />
      </section>
      <section className="bg-black text-zinc-100 border border-green-500">
        {/* FIXME Layout anpassen */}
        <div className="grid grid-cols-[352px_1fr] gap-10 w-[80%] m-auto py-12 border border-pink-600">
          {/* Poster */}
          <div className="mx-auto -mt-24">
            {data.posterUrl ? (
              <img
                src={data.posterUrl}
                alt={`${data.title} Poster`}
                className="rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-[352px] aspect-[2/3] object-cover"
              />
            ) : (
              <div className="w-[352px] aspect-[2/3] rounded-xl bg-neutral-800 grid place-items-center text-neutral-400">
                No poster
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4 py-4 px-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold">{data.title}</h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {data.genres.map((genre) => (
                    <Badge key={genre}>{genre}</Badge>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <CarouselTag label={data.year || "—"} imgUrl="/src/assets/img/calendar.svg" />
                  <CarouselTag label={formatRuntime(data.runtimeMin)} imgUrl="/src/assets/img/duration.svg" />
                  <StarRating value={data.rating} showNumber />
                </div>
              </div>
            </div>

            {/* Overview */}
            {data.overview && <p className="max-w-[70ch] text-sm leading-relaxed text-zinc-300">{data.overview}</p>}

            <dl className="flex flex-col gap-2">
              <InfoItem label="Country" value={data.country || "—"} />
              <InfoItem label="Genre" value={data.genres.length ? data.genres.join(", ") : "—"} />
              <InfoItem label="Date Release" value={data.releaseDate || "—"} />
              <InfoItem label="Production" value={data.production || "—"} />
              <InfoItem label="Cast" value={data.cast.length ? data.cast.join(", ") : "—"} className="flex flex-wrap" />
            </dl>
          </div>
        </div>
      </section>
      <section className="border border-yellow-500">
        {/* FIXME BUG Dialogfenster bleibt offen */}
        <MovieSection title="You max also like">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((m) => <MovieCard key={m.id} movie={m} onOpen={handleOpen} />)}
        </MovieSection>
      </section>
      {openId !== null && (
        <MovieDialog open ctaHref={`/movies/detail/${openId}`} onClose={handleClose} data={selected} />
      )}
    </>
  )
}
