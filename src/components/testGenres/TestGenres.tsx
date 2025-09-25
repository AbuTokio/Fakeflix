// import { useMain } from "../../hooks/ContextHooks"
// import { useEffect, useState } from "react"

// export default function TestGenres() {
//   // Daten von mainProvider mit useMain holen
//   const {
//     movieGenres,
//     moviePopular,
//     movieTopRated,
//     movieUpcoming,
//     movieDetails,
//     movieSimilar,
//     movieVideos,
//     searchedMovies: movieSearch,
//     discoveredMovies: movieDiscover,
//     fetchMovieDetails,
//     fetchMovieSimilar,
//     fetchMovieVideos,
//     searchMovies,
//     discoverMovies,
//     loading,
//     error,
//   } = useMain()

//   const [searchQuery, setSearchQuery] = useState("")

//   // Beispieldaten für bestimmten Film / genre laden
//   useEffect(() => {
//     const exampleMovieId = 550 // Fight Club
//     const exampleGenreId = 28 // Action
//     fetchMovieDetails(exampleMovieId)
//     fetchMovieSimilar(exampleMovieId)
//     fetchMovieVideos(exampleMovieId)
//     discoverMovies(exampleGenreId)
//   }, [])

//   // Suche
//   useEffect(() => {
//     if (searchQuery.trim().length >= 2) {
//       searchMovies(searchQuery.trim())
//     }
//   }, [searchQuery])

//   return (
//     <div className="p-4 space-y-10 text-white">
//       {/* === Genres Section === */}
//       <Section title="🎬 Movie Genres" loading={loading.genres} error={error.genres}>
//         <ul className="list-disc pl-6">
//           {movieGenres.map((g) => (
//             <li key={g.id}>{g.name}</li>
//           ))}
//         </ul>
//       </Section>

//       {/* === Popular Movies Section === */}
//       <Section title="🌟 Popular Movies" loading={loading.popular} error={error.popular}>
//         <MovieList movies={moviePopular} />
//       </Section>

//       {/* === Top Rated Movies Section === */}
//       <Section title="🏆 Top Rated Movies" loading={loading.topRated} error={error.topRated}>
//         <MovieList movies={movieTopRated} />
//       </Section>

//       {/* === Upcoming Movies Section === */}
//       <Section title="📅 Upcoming Movies" loading={loading.upcoming} error={error.upcoming}>
//         <MovieList movies={movieUpcoming} />
//       </Section>

//       {/* === Details Example === */}
//       <Section title="🎞️ Details zu Beispiel-Film (ID: 550)" loading={loading.details} error={error.details}>
//         <p className="font-semibold">{movieDetails?.title}</p>
//         <p className="text-sm">{movieDetails?.overview}</p>
//         <p className="text-gray-400 text-sm">Genres: {movieDetails?.genres.map((g) => g.name).join(", ")}</p>
//       </Section>

//       {/* === Similar Movies Section === */}
//       <Section title="🧩 Ähnliche Filme (zu ID: 550)" loading={loading.similar} error={error.similar}>
//         <MovieList movies={movieSimilar} />
//       </Section>

//       {/* === Videos === */}
//       <Section title="🎥 Trailer & Videos (zu ID: 550)" loading={loading.videos} error={error.videos}>
//         <ul className="list-disc pl-6">
//           {movieVideos.map((v) => (
//             <li key={v.id}>
//               {/* {v.name} ({v.type}) */}
//               <a href={`https://www.youtube.com/watch?v=${v.key}`} target="_blank" rel="noopener noreferrer">
//                 {`https://www.youtube.com/watch?v=${v.key}`}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </Section>

//       {/* === Discover Example (Genre: Action ID 28) === */}
//       <Section title="🔍 Discover Movies (Genre: Action)" loading={loading.discover} error={error.discover}>
//         <MovieList movies={movieDiscover} />
//       </Section>

//       {/* === Search Function === */}
//       <section className="space-y-4">
//         <h2 className="font-bold text-lg">🔎 Movie Search</h2>
//         <input
//           type="text"
//           placeholder="Film suchen..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 rounded text-black w-full max-w-md bg-white"
//         />
//         {loading.search && <p>Suche läuft...</p>}
//         {error.search && <p className="text-red-500">{error.search}</p>}
//         {!loading.search && !error.search && movieSearch.length > 0 && <MovieList movies={movieSearch} />}
//         {!loading.search && searchQuery && movieSearch.length === 0 && <p className="text-gray-400">Keine Treffer</p>}
//       </section>
//     </div>
//   )
// }

// // --- Reusable Section Wrapper ---
// function Section({
//   title,
//   loading,
//   error,
//   children,
// }: {
//   title: string
//   loading: boolean
//   error: string | null
//   children: React.ReactNode
// }) {
//   return (
//     <section>
//       <h2 className="font-bold text-white text-lg mb-2">{title}</h2>
//       {loading && <p className="text-gray-400">Lade...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && children}
//     </section>
//   )
// }

// // --- Movie List Renderer ---
// function MovieList({ movies }: { movies: { id: number; title: string; vote_average: number }[] }) {
//   return (
//     <ul className="list-decimal pl-6">
//       {movies.map((m) => (
//         <li key={m.id}>
//           {m.title} <span className="text-gray-400">({m.vote_average?.toFixed(1) ?? "n/a"})</span>
//         </li>
//       ))}
//     </ul>
//   )
// }
