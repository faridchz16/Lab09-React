// Static data for the movie billboard. All titles and details are fictitious.

// rating uses a 0-10 scale with one decimal.
export const movies = [
  {
    id: 1,
    title: 'El último faro',
    image: '/posters/el-ultimo-faro.svg',
    synopsis:
      'Un farero solitario descubre que su luz guía a algo más que barcos. Una noche de tormenta, alguien responde a sus señales.',
    classification: 'APT',
    rating: 7.8,
    showtimes: ['14:30', '17:00', '19:45'],
  },
  {
    id: 2,
    title: 'Ecos de Marte',
    image: '/posters/ecos-de-marte.svg',
    synopsis:
      'La primera colonia en Marte recibe un mensaje grabado con sus propias voces. Nadie recuerda haberlo enviado.',
    classification: '+14',
    rating: 8.4,
    showtimes: ['15:15', '18:30', '21:45'],
  },
  {
    id: 3,
    title: 'La ciudad sin sombras',
    image: '/posters/la-ciudad-sin-sombras.svg',
    synopsis:
      'En una metrópoli donde el sol nunca se pone, una detective investiga la desaparición de la última sombra.',
    classification: '+14',
    rating: 7.2,
    showtimes: ['16:00', '20:15'],
  },
  {
    id: 4,
    title: 'Noche de cristal',
    image: '/posters/noche-de-cristal.svg',
    synopsis:
      'Un robo perfecto en un museo de joyas se complica cuando los ladrones descubren que no están solos.',
    classification: '+18',
    rating: 6.9,
    showtimes: ['20:00', '22:30'],
  },
  {
    id: 5,
    title: 'El jardín de relojes',
    image: '/posters/el-jardin-de-relojes.svg',
    synopsis:
      'Una niña hereda un jardín donde cada flor marca una hora distinta. Al arrancar una, el tiempo empieza a fallar.',
    classification: 'APT',
    rating: 8.1,
    showtimes: ['13:00', '15:30', '18:00'],
  },
  {
    id: 6,
    title: 'Frontera helada',
    image: '/posters/frontera-helada.svg',
    synopsis:
      'Dos guardias rivales quedan atrapados en un paso de montaña y deben cooperar para sobrevivir al invierno.',
    classification: '+14',
    rating: 7.5,
    showtimes: ['17:45', '20:30'],
  },
  {
    id: 7,
    title: 'Susurros en el sótano',
    image: '/posters/susurros-en-el-sotano.svg',
    synopsis:
      'Una familia se muda a una casa antigua cuyo sótano parece cambiar de tamaño cada noche.',
    classification: '+18',
    rating: 6.4,
    showtimes: ['21:00', '23:15'],
  },
  {
    id: 8,
    title: 'Pequeños gigantes',
    image: '/posters/pequenos-gigantes.svg',
    synopsis:
      'Un equipo de fútbol infantil sin cancha propia se enfrenta al torneo más importante del barrio.',
    classification: 'APT',
    rating: 7.9,
    showtimes: ['12:30', '14:45', '17:15'],
  },
]

export const cinema = {
  name: 'Cine Aurora',
  navLinks: [
    { id: 'cartelera', label: 'Cartelera', href: '#cartelera' },
    { id: 'horarios', label: 'Horarios', href: '#horarios' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
  ],
  contact: {
    address: 'Av. de las Estrellas 123, Ciudad Ficticia',
    phone: '+00 000 000 000',
    email: 'contacto@example.com',
    schedule: 'Lunes a domingo, de 12:00 a 00:00',
  },
}
