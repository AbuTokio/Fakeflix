import { useMain } from "../../hooks/ContextHooks"

export default function TestGenres() {
  const { movieGenres, moviePopular, movieTopRated, loading, error } = useMain()

  return (
    <div className="p-4 space-y-6 text-white">
      {/* === Genres Section === */}
      <section>
        <h2 className="font-bold text-white text-lg">🎬 Movie Genres</h2>

        {loading.genres && <p>Genres werden geladen...</p>}
        {error.genres && <p className="text-red-500">{error.genres}</p>}

        {!loading.genres && !error.genres && (
          <ul className="list-disc pl-6">
            {movieGenres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* === Popular Movies Section === */}
      <section>
        <h2 className="font-bold text-white text-lg">🌟 Popular Movies</h2>

        {loading.popular && <p>Beliebte Filme werden geladen...</p>}
        {error.popular && <p className="text-red-500">{error.popular}</p>}

        {!loading.popular && !error.popular && (
          <ul className="list-decimal pl-6">
            {moviePopular.map((m) => (
              <li key={m.id}>
                {m.title} <span className="text-gray-400">({m.vote_average.toFixed(1)})</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* === Top Rated Movies Section === */}
      <section>
        <h2 className="font-bold text-white text-lg">🌟 TopRated Movies</h2>

        {loading.topRated && <p>Top Rated Filme werden geladen...</p>}
        {error.topRated && <p className="text-red-500">{error.popular}</p>}

        {!loading.topRated && !error.topRated && (
          <ul className="list-decimal pl-6">
            {movieTopRated.map((m) => (
              <li key={m.id}>
                {m.title} <span className="text-gray-400">({m.vote_average.toFixed(1)})</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
