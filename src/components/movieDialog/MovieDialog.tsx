import { useEffect } from "react"
import { Link } from "react-router"
import StarRating from "../starRating/StarRating"
import type { MovieDetails, ResultMovieSimilar } from "../../interface/Movie"
import { TMDB_IMG_BASE, TmdbImageSize } from "../../enum/TmdbImage"

type MovieDialogData = MovieDetails | ResultMovieSimilar

type MovieDialogProps = {
  open: boolean
  onClose: () => void
  data: MovieDialogData
  genreById?: Record<number, string>
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
}: MovieDialogProps) {
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

  // ----- Titel -----
  const title = (data as any).title ?? (data as any).original_title ?? "Untitled"

  // ----- Bildquelle -----
  const backdrop_path = data.backdrop_path
  const poster_path = data.poster_path
  const heroSrc =
    (backdrop_path ? `${TMDB_IMG_BASE}/${TmdbImageSize.BACKDROP_SIZE}${backdrop_path}` : null) ??
    (poster_path ? `${TMDB_IMG_BASE}/${TmdbImageSize.POSTER_SIZE}${poster_path}` : null)

  // ----- Rating -----
  const rating = typeof data.vote_average === "number" ? data.vote_average : undefined

  // ----- Overview -----
  const overview = (data as any).overview as string | undefined

  return (
    <div
      className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div
        className={[
          "relative mx-auto w-full max-w-[900px] rounded-2xl shadow-2xl overflow-hidden",
          "max-h-[96svh] bg-neutral-900",
          className || "",
        ].join(" ")}>
        {/* Media / Hero */}
        <div className="relative h-[clamp(360px,65svh,820px)] bg-neutral-900">
          {heroSrc ? (
            <img
              src={heroSrc}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover object-center md:object-[50%_35%]"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-neutral-500 text-xs">No image</div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/5" />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
            ✕
          </button>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="px-4 pb-4 pt-6 sm:px-8 sm:pb-8 sm:pt-10">
              <h2
                id="movie-hero-title"
                className="font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-3xl sm:text-4xl md:text-6xl">
                {title}
              </h2>

              {/* Rating */}
              {typeof rating === "number" && !Number.isNaN(rating) && (
                <div className="mt-3 sm:mt-4">
                  <StarRating value={rating} max={10} size={18} showNumber />
                </div>
              )}

              {/* Scroll-Container */}
              <div className="mt-3 sm:mt-4 max-h-[28svh] sm:max-h-[32svh] overflow-y-auto pr-1">
                {overview && (
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-neutral-200">{overview}</p>
                )}

                {/* CTA */}
                <div className="mt-4 sm:mt-6">
                  {ctaHref ? (
                    <Link
                      to={ctaHref}
                      className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 sm:px-6 sm:py-3 text-base font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                      {ctaLabel}
                    </Link>
                  ) : (
                    <button
                      onClick={onCtaClick}
                      className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 sm:px-6 sm:py-3 text-base font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                      {ctaLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
