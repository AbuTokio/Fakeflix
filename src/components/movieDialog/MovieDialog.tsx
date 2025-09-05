import React, { useEffect } from "react"
import StarRating from "../starRating/StarRating"
import { Link } from "react-router"

export type DialogMovieData = {
  id: number
  title: string
  year?: number | string
  certification?: string
  kindLabel?: string
  genres?: string[]
  overview?: string
  backdropUrl?: string
  rating?: number
}

type Props = {
  open: boolean
  onClose: () => void
  data: DialogMovieData
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  className?: string
}

export default function MovieDialog({
  open,
  onClose,
  data,
  ctaLabel = "Details",
  ctaHref,
  onCtaClick,
  className,
}: Props) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const { title, year, certification, kindLabel = "Film", genres = [], overview, backdropUrl, rating } = data

  return (
    // DialogWindow
    <div
      className="fixed inset-0 z-50 focus:outline-none focus:ring-0"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={[
          "absolute left-1/2 top-1/2 w-[min(95vw,900px)] -translate-x-1/2 -translate-y-1/2",
          "overflow-hidden rounded-xl shadow-2xl focus:outline-none focus:ring-0",
          className || "",
        ].join(" ")}>
        <div className="relative aspect-video bg-neutral-900">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover focus:outline-none focus:ring-0"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-black/20" />

          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2 text-white hover:bg-red-600 focus:outline-none focus:ring-0">
            ✕
          </button>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <h2
              id="movie-hero-title"
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              {title}
            </h2>

            {/* Badges Genre */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {year && <Badge>{year}</Badge>}
              {certification && <Badge>{certification}</Badge>}
              {kindLabel && <Badge>{kindLabel}</Badge>}
              {genres.slice(0, 4).map((g) => (
                <Badge key={g} muted>
                  {g}
                </Badge>
              ))}
            </div>

            {/* Rating */}

            {typeof rating === "number" && (
              <div className="mt-4">
                <StarRating value={rating} max={10} size={18} showNumber />
              </div>
            )}

            {overview && <p className="mt-4 max-w-3xl text-base md:text-lg text-neutral-200">{overview}</p>}

            {/* Link button */}

            <div className="mt-6">
              {ctaHref ? (
                <Link
                  to={ctaHref}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                  {ctaLabel}
                </Link>
              ) : (
                <button
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                  {ctaLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Badge({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={
        "rounded-md px-2 py-1 text-xs font-semibold " + (muted ? "bg-white/15 text-white/90" : "bg-white/20 text-white")
      }>
      {children}
    </span>
  )
}
