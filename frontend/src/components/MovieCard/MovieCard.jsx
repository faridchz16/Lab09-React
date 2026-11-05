import './MovieCard.css'

// Card for a single movie: poster, title, rating and showtimes.
function MovieCard({ title, image, rating, showtimes }) {
  return (
    <article className="movie-card">
      <img
        className="movie-card__poster"
        src={image}
        alt={`Póster de ${title}`}
        width="300"
        height="450"
        loading="lazy"
      />
      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__rating">★ {rating}/10</p>
        <ul className="movie-card__showtimes" aria-label={`Horarios de ${title}`}>
          {showtimes.map((time) => (
            <li key={time} className="movie-card__showtime">
              <time>{time}</time>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default MovieCard
