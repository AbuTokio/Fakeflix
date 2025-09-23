// components/mediaPlayer/MediaPlayer.tsx
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
        <img src={posterUrl} alt="Backdrop" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    ) : null
  }

  const src = `https://www.youtube-nocookie.com/embed/${youtubeKey}?rel=0&modestbranding=1&autoplay=${
    playing ? 1 : 0
  }&controls=1`

  return (
    <div className={`relative aspect-video rounded-md overflow-hidden ${className}`}>
      {playing ? (
        <iframe
          src={src}
          title="Trailer"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setPlaying(true)}
          className="">
          {/* Poster */}
          {posterUrl && <img src={posterUrl} alt="Trailer poster" className="" />}

          {/* Gradient & Play-Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="">
              <span className="text-white/90 font-semibold text-lg">Play Trailer</span>
            </div>
          </div>
        </button>
      )}
    </div>
  )
}
