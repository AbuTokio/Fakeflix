import { useState } from "react"

type MediaPlayerProps = {
  youtubeKey?: string | null
  posterUrl?: string | null
  className?: string
  autoPlay?: boolean
}

export default function MediaPlayer({ youtubeKey, posterUrl, className = "", autoPlay = false }: MediaPlayerProps) {
  const [playing, setPlaying] = useState<boolean>(autoPlay && Boolean(youtubeKey))

  if (!youtubeKey) {
    return posterUrl ? (
      <div className={`relative aspect-video ${className}`}>
        <img src={posterUrl} alt="Backdrop" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/10 to-transparent" />
      </div>
    ) : null
  }
  const src = `https://www.youtube-nocookie.com/embed/${youtubeKey}?rel=0&modestbranding=1&autoplay=${
    playing ? 1 : 0
  }&controls=1`
  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className}`}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 shadow-sm">
        {playing ? (
          <iframe
            src={src}
            title="Trailer"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setPlaying(true)}
            className="group absolute inset-0">
            {/* Poster */}
            {posterUrl && (
              <img
                src={posterUrl}
                alt="Trailer poster"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover "
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                <img className="h-8 sm:h-10 md:h-12 lg:h-14" src="/src/assets/img/play.svg" alt="play icon" />

                <span className="text-white/90 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                  Play Trailer
                </span>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
