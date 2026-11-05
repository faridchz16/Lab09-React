import MovieCard from '../MovieCard/MovieCard.jsx'
import './MovieList.css'

// Billboard section: a responsive grid with one card per movie.
function MovieList({ movies }) {
  return (
    <section id="cartelera" className="movie-list" aria-labelledby="movie-list-title">
      <div className="container">
        <h2 id="movie-list-title" className="movie-list__title">
          Cartelera
        </h2>
        {/* Cards show the showtimes, so the grid is the target of #horarios. */}
        <div id="horarios" className="movie-list__grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={movie.image}
              rating={movie.rating}
              showtimes={movie.showtimes}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MovieList
