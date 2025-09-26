export interface SearchKeywords {
  page: number
  results: ResultKeywords[]
  total_pages: number
  total_results: number
}

export interface ResultKeywords {
  id: number
  name: string
}

export interface SearchMovie {
  page: number
  results: ResultMovie[]
  total_pages: number
  total_results: number
}

export interface ResultMovie {
  adult: boolean
  backdrop_path: null | string
  genre_ids?: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: null | string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchMulti {
  page: number
  results: ResultMulti[]
  total_pages: number
  total_results: number
}

export interface ResultMulti {
  adult: boolean
  backdrop_path: null | string
  id: number
  title?: string
  original_language: OriginalLanguage
  original_title?: string
  overview: string
  poster_path: string
  media_type: MediaType
  genre_ids: number[]
  popularity: number
  release_date?: Date
  video?: boolean
  vote_average: number
  vote_count: number
  name?: string
  original_name?: string
  first_air_date?: Date
  origin_country?: string[]
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  Ja = "ja",
}

export interface SearchTV {
  page: number
  results: ResultTV[]
  total_pages: number
  total_results: number
}

export interface ResultTV {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: Date
  name: string
  vote_average: number
  vote_count: number
}
