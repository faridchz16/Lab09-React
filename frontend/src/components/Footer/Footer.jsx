import './Footer.css'

// Page footer with the cinema contact details and the copyright line.
function Footer({ name, contact }) {
  const year = new Date().getFullYear()
  // tel: URIs must not contain spaces.
  const phoneHref = `tel:${contact.phone.replace(/\s/g, '')}`

  return (
    <footer id="contacto" className="footer">
      <div className="container footer__inner">
        <h2 className="footer__title">Contacto</h2>
        <address className="footer__address">
          <p>{contact.address}</p>
          <p>
            Teléfono:{' '}
            <a className="footer__link" href={phoneHref}>
              {contact.phone}
            </a>
          </p>
          <p>
            Correo:{' '}
            <a className="footer__link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </address>
        <p>Horario: {contact.schedule}</p>
        <p className="footer__copyright">
          © {year} {name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
