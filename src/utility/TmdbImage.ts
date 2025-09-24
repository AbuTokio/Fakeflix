import type { TmdbImageSize } from "../enum/TmdbImage"

export default function TmdbImage(path: string, size: TmdbImageSize) {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
