import { cinema } from './data/movies.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

// Root component of the movie billboard app.
function App() {
  return (
    <>
      <Header name={cinema.name} navLinks={cinema.navLinks} />
      <main className="container">
        <h1>Cartelera de cine</h1>
      </main>
      <Footer name={cinema.name} contact={cinema.contact} />
    </>
  )
}

export default App
