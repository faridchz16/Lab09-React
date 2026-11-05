import { movies, cinema } from './data/movies.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'

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
      </main>
      <Footer name={cinema.name} contact={cinema.contact} />
    </>
  )
}

export default App
