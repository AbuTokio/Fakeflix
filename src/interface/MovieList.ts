//todo: Interface vereinheitlichen

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
export interface ResultMovieList {
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}

// export interface ResultPopular {
//   adult: boolean
//   backdrop_path: string
//   genre_ids: number[]
//   id: number
//   original_language: OriginalLanguage
//   original_title: string
//   overview: string
//   popularity: number
//   poster_path: string
//   release_date: Date
//   title: string
//   video: boolean
//   vote_average: number
//   vote_count: number
// }

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

// export interface ResultTopRated {
//   adult: boolean
//   backdrop_path: string
//   genre_ids: number[]
//   id: number
//   original_language: string
//   original_title: string
//   overview: string
//   popularity: number
//   poster_path: string
//   release_date: Date
//   title: string
//   video: boolean
//   vote_average: number
//   vote_count: number
// }

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

// export interface ResultUpcoming {
//   adult: boolean
//   backdrop_path: string
//   genre_ids: number[]
//   id: number
//   original_language: string
//   original_title: string
//   overview: string
//   popularity: number
//   poster_path: string
//   release_date: Date
//   title: string
//   video: boolean
//   vote_average: number
//   vote_count: number
// }

//# Similar
export interface MovieSimilar {
  page: number
  results: ResultMovieList[]
  total_pages: number
  total_results: number
}
