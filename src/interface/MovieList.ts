export interface ResultMovieList {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: OriginalLanguage
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

//# Popular
export interface ResponseMovieList {
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Ko = "ko",
  Nl = "nl",
}

//# Top Rated
export interface MovieListTopRated {
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}

//# Upcoming
export interface MovieListUpcoming {
  dates: Dates
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}

export interface Dates {
  maximum: Date
  minimum: Date
}

//# Similar
export interface MovieSimilar {
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}
