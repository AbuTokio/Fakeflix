import React from "react"
import StarRating from "../../../components/starRating/StarRating"
import Badge from "../../../components/badge/Badge"
import CarouselTag from "../../../components/carouselTag/CarouselTag"
import MovieOpenController, { type Movie } from "../../../components/movieOpenController/MovieOpenController"
import type { DialogMovieData } from "../../../components/movieDialog/MovieDialog"

export type MovieDetailData = {
  id: number
  title: string
  year: string
  runtimeMin: number
  rating: number
  overview: string
  posterUrl: string
  genres: string[]
  country?: string
  releaseDate?: string
  production?: string
  cast?: string[]
}

function toDialogData(m: Movie): DialogMovieData {
  return {
    id: m.id,
    title: m.title,
    backdropUrl: m.posterUrl,
    rating: m.rating,
    year: "2023",
    certification: "PG-13",
    kindLabel: "Film",
    genres: ["Animation", "Fantasy"],
    overview: "Kurzbeschreibung / Overview zum Film. Ersetze das mit echten Daten aus deiner Quelle.",
  }
}

const DUMMY: MovieDetailData = {
  id: 1,
  title: "Mein Nachbar Totoro",
  year: "2023",
  runtimeMin: 50,
  rating: 8.5,
  overview:
    "In einer zerstörten Zukunft lebt eine Gemeinschaft in einem gigantischen unterirdischen Silo. Regeln halten die Ordnung, doch wer sie infrage stellt, riskiert alles.",
  posterUrl: "/246907730f03f9d29d217e7943f72688.png",
  genres: ["Drama", "Science Fiction"],
  country: "United States",
  releaseDate: "May 05, 2023",
  production: "AMC Studios",
  cast: ["Tim Robbins", "Rebecca Ferguson", "Avi Nash", "Rashida Jones", "David Oyelowo"],
}

const MOVIES_DUMMY: Movie[] = [
  { id: 101, title: "Totoro", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.5 },
  { id: 102, title: "Spirited Away", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.6 },
  { id: 103, title: "Princess Mononoke", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.7 },
  { id: 104, title: "Howl's Moving Castle", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.2 },
  { id: 105, title: "Kiki's Delivery Service", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.9 },
  { id: 106, title: "Princess Mononoke", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.7 },
  { id: 107, title: "Howl's Moving Castle", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 8.2 },
  { id: 108, title: "Kiki's Delivery Service", posterUrl: "/246907730f03f9d29d217e7943f72688.png", rating: 7.9 },
]

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

export default function MovieDetail({ data = DUMMY }: { data?: MovieDetailData }) {
  return (
    <section className="min-h-screen bg-black text-zinc-100">
      <div className=" grid grid-cols-[352px_1fr] w-[80%] m-auto py-20">
        <div className="mx-auto">
          <img
            src={data.posterUrl}
            alt={`${data.title} Poster`}
            className="rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="space-y-4 py-10 px-10 ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {data.genres.map((genre) => (
                  <Badge key={genre}>{genre}</Badge>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center -ml-3">
                <CarouselTag
                  label={data.year}
                  imgUrl="/src/assets/img/calendar.svg"
                  className="inline-flex items-center gap-2 text-sm text-zinc-300 h-4 w-4 "
                />
                <CarouselTag
                  label={formatRuntime(data.runtimeMin)}
                  imgUrl="/src/assets/img/duration.svg"
                  className="inline-flex items-center gap-2 text-sm text-zinc-300"
                />
                <StarRating value={data.rating} showNumber />
              </div>
            </div>
          </div>

          {/* Overview */}
          <p className="max-w-[70ch] text-sm leading-relaxed text-zinc-300">{data.overview}</p>

          <dl className="flex flex-col">
            <InfoItem label="Country" value={data.country ?? "—"} />
            <InfoItem label="Genre" value={data.genres.join(", ")} />
            <InfoItem label="Date Release" value={data.releaseDate ?? "—"} />
            <InfoItem label="Production" value={data.production ?? "—"} />
            <InfoItem label="Cast" value={(data.cast ?? []).join(", ")} className="flex flex-wrap" />
          </dl>
        </div>
      </div>
      <div>
        <MovieOpenController title="You may also Like" items={MOVIES_DUMMY} limit={8} toDialogData={toDialogData} />
      </div>
    </section>
  )
}
