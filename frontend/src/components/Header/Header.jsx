import './Header.css'

// Top bar with the cinema name and the main navigation links.
function Header({ name, navLinks }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="header__title">
          <a className="header__brand" href="#">
            {name}
          </a>
        </h1>
        <nav aria-label="Navegación principal">
          <ul className="header__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a className="header__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
