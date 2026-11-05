import './Header.css'

// Top bar with the cinema name and the main navigation links.
function Header({ name, navLinks }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#">
          {name}
        </a>
        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__list">
            {navLinks.map((link) => (
              <li key={link.id} className="header__item">
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
