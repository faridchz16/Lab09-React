import { movies, cinema } from './data/movies.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieCard from './components/MovieCard/MovieCard.jsx'

// The featured movie is the highest-rated one.
const featured = movies.reduce((best, movie) =>
  movie.rating > best.rating ? movie : best,
)

// Root component of the movie billboard app.
function App() {
  return (
    <>
      <Header name={cinema.name} navLinks={cinema.navLinks} />
      <main>
        <Hero
          title={featured.title}
          image={featured.image}
          synopsis={featured.synopsis}
          classification={featured.classification}
          rating={featured.rating}
        />
        {/* Temporary: a single card until MovieList renders the full billboard. */}
        <div
          className="container"
          style={{ maxWidth: 'calc(var(--space-8) * 5)' }}
        >
          <MovieCard
            title={movies[0].title}
            image={movies[0].image}
            rating={movies[0].rating}
            showtimes={movies[0].showtimes}
          />
        </div>
      </main>
      <Footer name={cinema.name} contact={cinema.contact} />
    </>
  )
}

export default App
