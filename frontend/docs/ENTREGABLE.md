# Entregable – Laboratorio 09: Cartelera de cine con React + Vite

Este repositorio es acumulativo: en la raíz está la API Django del laboratorio 08 y en `frontend/`
el proyecto React del laboratorio 09. En ningún paso se modificó el backend Django (`config/`,
`quiz/`, `agent/`, `quizctl.py`, etc.) ni la carpeta `.opencode/`.

## Configuración 1 – Creación del proyecto React con Vite

- Se comprobó que `frontend/.gitignore` (generado por la plantilla de Vite) incluye la entrada
  `node_modules`, además de `dist`, `dist-ssr` y `*.local`. Al preparar el commit se verificó que
  ningún archivo de `node_modules/` quedaba en el área de preparación.
- Commit: `Creación del proyecto React con Vite en frontend/` (`f1a9673`) y push a `origin/main`.

## Configuración 2 – CLAUDE.md

- Se creó `CLAUDE.md` en la raíz con:
  - La descripción del repositorio (backend Django del lab 08 y frontend React del lab 09).
  - La indicación de que todo el código React va en `frontend/` y que los comandos npm
    (`install`, `dev`, `build`, `lint`) se ejecutan dentro de esa carpeta.
  - Las reglas del proyecto: componentes funcionales en PascalCase; una carpeta por componente
    (`Componente/Componente.jsx` + `Componente.css`); props sin estado ni hooks; código y
    comentarios en inglés; explicaciones en español; un commit por tarea con mensaje en español.
- Commit: `Creación de CLAUDE.md con la descripción del repositorio y las reglas del frontend` (`c7c3b61`).

## Configuración 3 – Subagentes de Claude Code

Se crearon dos subagentes en `.claude/agents/`, equivalentes a los de `.opencode/agent/` del lab 08
(`django-dev` y `cli-gateway`), pero orientados al frontend:

| Subagente | Archivo | Herramientas | Función |
|-----------|---------|--------------|---------|
| `react-dev` | `.claude/agents/react-dev.md` | Read, Write, Edit, Glob, Grep, Bash | Escribe componentes funcionales y sus estilos dentro de `frontend/`, siguiendo las reglas de `CLAUDE.md`. |
| `ui-reviewer` | `.claude/agents/ui-reviewer.md` | Read, Glob, Grep (solo lectura) | Revisa que cada componente tenga una sola responsabilidad, que las props lleven solo lo necesario y que no haya avisos de React (keys, atributos DOM inválidos, imports sin usar, estado/hooks en componentes de presentación). |

- Commit: `Creación de los subagentes react-dev y ui-reviewer en .claude/agents/` (`0cb7788`).

## Configuración 4 (paso 2 de la guía) – Limpieza del andamiaje de la plantilla

Se eliminó todo lo que traía la plantilla de Vite y que no forma parte de la cartelera:

- Logos e imágenes: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`,
  `public/favicon.svg` y `public/icons.svg`.
- Estilos de la plantilla: `src/App.css` y `src/index.css`.
- El contador (`useState`) y las secciones de enlaces de `App.jsx`.

Archivos que quedan con lo mínimo que funciona:

- `frontend/index.html`: `lang="es"`, título "Cartelera de cine", sin favicon, el `div#root` y el
  script de `src/main.jsx`.
- `frontend/src/main.jsx`: monta `<App />` dentro de `<StrictMode>` con `createRoot`.
- `frontend/src/App.jsx`: componente funcional que muestra el encabezado "Cartelera de cine".

Verificación: `npm run lint` sin errores ni avisos y `npm run build` compila correctamente.

- Commit: `Limpieza del andamiaje de la plantilla` (`74e6105`) y push a `origin/main`.

## Configuración 5 – Documentación del entregable

- Se creó este archivo, `frontend/docs/ENTREGABLE.md`, con el registro de cada paso.
- Commit: `Documentación del entregable del laboratorio 09` (`f7d9c0f`).

## Traslado al repositorio Lab09-React

El laboratorio 09 se trasladó a un repositorio propio para que Lab08-Django quede como se entregó:

1. Con `git log --oneline -15` se confirmó que `dbd0cd2` ("Add files via upload") era el último
   commit del lab 08 y que los cinco posteriores eran del lab 09.
2. Se agregó el remoto `lab09` (https://github.com/faridchz16/Lab09-React.git) y se ejecutó
   `git push lab09 main`, que copió todo el historial (lab 08 + lab 09, hasta `f7d9c0f`).
3. Se restauró Lab08-Django con `git push --force-with-lease origin dbd0cd2:main` y se verificó
   con `git ls-remote origin main` que apunta a `dbd0cd2`.
4. Se eliminó el remoto `lab09` y `origin` pasó a ser https://github.com/faridchz16/Lab09-React.git.
5. Se actualizó `CLAUDE.md` para indicar que el repositorio es Lab09-React, continuación del lab 08.
   Commit: `Actualización de CLAUDE.md: el repositorio pasa a ser Lab09-React` (`1bbda23`).

## Nota sobre el subagente react-dev

Los pasos 3 y 4 se encargaron al subagente `react-dev`. Como `.claude/agents/react-dev.md` se creó
en mitad de la sesión y Claude Code solo carga los subagentes al iniciar, no se pudo invocar por su
nombre. Se usó un agente general al que se le indicó leer `react-dev.md` y adoptar su rol y sus
restricciones (solo tocar `frontend/`, componentes funcionales, código en inglés, lint sin avisos).

## Paso 3 – Organización de `src/` y arquitectura de CSS

Estructura resultante:

```
frontend/
├── public/
│   └── posters/            # 8 pósters SVG (uno por película)
└── src/
    ├── main.jsx            # punto de entrada: importa global.css y monta <App />
    ├── App.jsx             # componente raíz
    ├── components/         # un componente por carpeta: Componente/Componente.jsx + .css
    ├── data/
    │   └── movies.js       # datos de películas y del cine
    └── styles/
        ├── variables.css   # tokens de diseño (colores, tipografía, espaciado…)
        └── global.css      # estilos base globales
```

Por qué cada cosa va en su carpeta:

- **`components/`**: aquí vivirán los componentes de presentación. Cada uno tiene su propia carpeta
  con su `.jsx` y su `.css`, de modo que todo lo de un componente está junto: se encuentra rápido,
  se puede mover o borrar sin dejar restos y sus estilos no se mezclan con los de otros. Por ahora
  solo tiene un `.gitkeep` para que Git guarde la carpeta vacía.
- **`data/`**: separa los datos de la presentación. Los componentes no saben de dónde salen las
  películas; las reciben por props desde `App`. Si más adelante los datos vienen de una API
  (por ejemplo, el backend Django del lab 08), solo cambia esta capa.
- **`styles/`**: estilos que no pertenecen a ningún componente concreto.
  - `variables.css` define en `:root` los tokens de diseño: colores (fondo, superficies, texto,
    color primario `#e50914`, estrella de rating `#f5c518`, insignias de clasificación APT/+14/+18),
    tipografía (familias, escala de tamaños, pesos, interlineado), espaciado (`--space-1` a
    `--space-8`), ancho máximo del contenedor, radios y sombras. Cambiar el aspecto de toda la
    aplicación es cuestión de editar este archivo.
  - `global.css` importa las variables y aplica los estilos base: reset de `box-sizing` y márgenes,
    fuente y colores del `body`, imágenes responsivas, enlaces, encabezados, la utilidad
    `.container` y el contorno de `:focus-visible` para accesibilidad.
  - Se importa una sola vez en `main.jsx`, así queda claro cuál es la única hoja global.
- **CSS por componente**: cada `Componente.css` se importa desde su `Componente.jsx` y solo usa las
  variables de `variables.css`, nunca colores o tamaños escritos a mano.

`App.jsx` se mantiene mínimo (`<main className="container">` con el título).
`npm run lint` y `npm run build` pasan sin avisos.

- Commit: `Organización de src/ en carpetas y arquitectura de CSS` (`5e669c3`) y push.

## Paso 4 – Datos de películas, del cine y pósters

`frontend/src/data/movies.js` tiene dos exportaciones con nombre:

- **`movies`**: 8 películas inventadas con `id`, `title`, `image`, `synopsis`, `classification`,
  `rating` (escala de 0 a 10 con un decimal) y `showtimes`:

  | id | Título | Clasificación | Rating | Horarios |
  |----|--------|---------------|--------|----------|
  | 1 | El último faro | APT | 7.8 | 14:30, 17:00, 19:45 |
  | 2 | Ecos de Marte | +14 | 8.4 | 15:15, 18:30, 21:45 |
  | 3 | La ciudad sin sombras | +14 | 7.2 | 16:00, 20:15 |
  | 4 | Noche de cristal | +18 | 6.9 | 20:00, 22:30 |
  | 5 | El jardín de relojes | APT | 8.1 | 13:00, 15:30, 18:00 |
  | 6 | Frontera helada | +14 | 7.5 | 17:45, 20:30 |
  | 7 | Susurros en el sótano | +18 | 6.4 | 21:00, 23:15 |
  | 8 | Pequeños gigantes | APT | 7.9 | 12:30, 14:45, 17:15 |

- **`cinema`**: datos del cine "Cine Aurora": `name`, `navLinks` (Cartelera `#cartelera`,
  Horarios `#horarios`, Contacto `#contacto`) y `contact` (dirección, teléfono, correo
  `contacto@example.com` y horario), todos ficticios.

Pósters: `frontend/public/posters/<slug>.svg`, uno por película. Son SVG de 300×450, de menos de
1 KB cada uno, con un fondo en degradado, una figura geométrica sencilla y el título.

Por qué están en `public/` y no en `src/assets/`: Vite sirve `public/` tal cual en la raíz del
sitio, así que una ruta como `/posters/el-ultimo-faro.svg` puede guardarse como texto en los
datos. Con eso `movies.js` no tiene que importar cada imagen. Además se parece a lo que devolvería
una API real, donde la imagen es una URL.

Los datos todavía no se usan en ningún componente; eso corresponde a los pasos siguientes.
`npm run lint` y `npm run build` pasan sin avisos.

- Commit: `Creación de los datos de películas y del cine con pósters SVG` (`13da241`) y push.

## Paso 5 – Componente Header

Archivos: `src/components/Header/Header.jsx` y `Header.css`. Se borró
`src/components/.gitkeep`, que ya no hace falta porque la carpeta tiene contenido.

Props:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | `string` | Nombre del cine que se muestra como marca. |
| `navLinks` | `Array<{ id: string, label: string, href: string }>` | Enlaces del menú de navegación. |

Qué renderiza:

- Un `<header className="header">` fijo arriba (`position: sticky`) con el contenedor `.container`.
- El nombre del cine como enlace a la parte superior de la página (`.header__brand`).
- Un `<nav aria-label="Navegación principal">` con una `<ul>` de `<li>`/`<a>`, uno por enlace.
  Cada `<li>` usa `key={link.id}`, un identificador estable y único.
- Los estilos solo usan variables de `variables.css` (el borde inferior usa la palabra clave
  `thin` en lugar de un tamaño en píxeles).

Uso en `App`: `App` importa `cinema` desde `./data/movies.js` y pasa solo lo que el componente
necesita:

```jsx
<Header name={cinema.name} navLinks={cinema.navLinks} />
```

El `Header` queda fuera de `<main>`, como corresponde a un encabezado de página.

Resultado: `npm run build` compila sin errores (19 módulos) y `npm run lint` no muestra avisos.

## Paso 6 – Componente Footer

Archivos: `src/components/Footer/Footer.jsx` y `Footer.css`.

Props:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | `string` | Nombre del cine, usado en la línea de copyright. |
| `contact` | `{ address: string, phone: string, email: string, schedule: string }` | Datos de contacto del cine. |

Qué renderiza:

- Un `<footer id="contacto" className="footer">`: el `id` es el destino del enlace "Contacto"
  (`#contacto`) del `Header`.
- Un `<h2>Contacto</h2>` y un `<address>` (el elemento semántico para datos de contacto) con la
  dirección, el teléfono como enlace `tel:` (se quitan los espacios del número para que el URI sea
  válido) y el correo como enlace `mailto:`.
- Un párrafo con el horario de atención.
- La línea `© <año> Cine Aurora. Todos los derechos reservados.`; el año se calcula con
  `new Date().getFullYear()` directamente en el cuerpo de la función, sin estado ni hooks.

Uso en `App`:

```jsx
<Footer name={cinema.name} contact={cinema.contact} />
```

Va fuera de `<main>`, después del contenido principal.

Resultado: `npm run build` compila sin errores y `npm run lint` no muestra avisos.

## Paso 7 – Componente Hero

Archivos: `src/components/Hero/Hero.jsx` y `Hero.css`.

Props (campos sueltos, no el objeto película completo, para que el componente reciba solo lo que
usa):

| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Título de la película destacada. |
| `image` | `string` | Ruta del póster (por ejemplo, `/posters/ecos-de-marte.svg`). |
| `synopsis` | `string` | Sinopsis breve. |
| `classification` | `string` | Clasificación por edad: `APT`, `+14` o `+18`. |
| `rating` | `number` | Valoración de 0 a 10 con un decimal. |

Qué renderiza:

- Un `<section className="hero">` con fondo en degradado a todo el ancho y el contenido dentro de
  `.container`. La sección se etiqueta con su título mediante `aria-labelledby`.
- El póster como `<img>` con texto alternativo descriptivo (`Póster de Ecos de Marte`) y
  `width`/`height` intrínsecos (300×450) para reservar el espacio mientras carga.
- Un antetítulo "Película destacada", el título en `<h2>`, la insignia de clasificación y la
  valoración (`★ 8.4/10`) y la sinopsis.
- La insignia toma su color de un modificador (`hero__badge--apt`, `--14`, `--18`) que usa las
  variables `--color-badge-*`. El ancho del póster se expresa como múltiplo de un token de
  espaciado (`calc(var(--space-8) * 4)`), sin tamaños escritos a mano.

Uso en `App`: la película destacada es la de mayor valoración. Se calcula con un `reduce` de
código normal, fuera del componente y sin hooks (los datos son estáticos):

```jsx
const featured = movies.reduce((best, movie) =>
  movie.rating > best.rating ? movie : best,
)

<Hero
  title={featured.title}
  image={featured.image}
  synopsis={featured.synopsis}
  classification={featured.classification}
  rating={featured.rating}
/>
```

Con los datos actuales es "Ecos de Marte" (8.4).

Cambios relacionados en este paso:

- `<main>` deja de llevar `className="container"`: cada sección pone su propio `.container`, así
  el fondo del Hero ocupa todo el ancho.
- Se quitó el `<h1>Cartelera de cine</h1>` provisional de `<main>`. Para que la página siga teniendo
  un `<h1>`, el nombre del cine en el `Header` pasa a estar dentro de un `<h1 className="header__title">`.

Resultado: `npm run build` compila sin errores y `npm run lint` no muestra avisos.

## Paso 8 – Componente MovieCard

Archivos: `src/components/MovieCard/MovieCard.jsx` y `MovieCard.css`.

Props (los cuatro campos pedidos, por separado):

| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Título de la película. |
| `image` | `string` | Ruta del póster. |
| `rating` | `number` | Valoración de 0 a 10. |
| `showtimes` | `string[]` | Horarios de función, en formato `HH:MM`. |

Pasar los campos individuales en lugar del objeto `movie` completo mantiene las props al mínimo:
la tarjeta no recibe `synopsis`, `classification` ni `id`, que no usa, y su firma deja claro qué
datos necesita. Si el objeto de datos crece, la tarjeta no se entera.

Qué renderiza:

- Un `<article className="movie-card">`, porque cada tarjeta es un contenido independiente.
- El póster en `<img>` con ``alt={`Póster de ${title}`}``, dimensiones intrínsecas, proporción 2:3
  y `loading="lazy"` (las tarjetas suelen quedar por debajo del primer pantallazo).
- El título en `<h3>` (por debajo del `<h2>` de la sección que las contendrá) y la valoración
  (`★ 7.8/10`) en color `--color-rating`.
- Los horarios como `<ul>` de `<li>` con un elemento `<time>`. La `key` de cada `<li>` es la propia
  cadena del horario, que es única dentro de una película. La lista lleva
  `aria-label="Horarios de <título>"` para lectores de pantalla.

Uso en `App` en este paso: se muestra una sola tarjeta, con la primera película, para poder verla.
Es provisional: el siguiente paso la reemplaza por `MovieList`.

```jsx
<div className="container" style={{ maxWidth: 'calc(var(--space-8) * 5)' }}>
  <MovieCard
    title={movies[0].title}
    image={movies[0].image}
    rating={movies[0].rating}
    showtimes={movies[0].showtimes}
  />
</div>
```

El `style` en línea solo limita el ancho de esta tarjeta suelta para que el póster no ocupe toda la
pantalla, y desaparece en el paso 9.

Resultado: `npm run build` compila sin errores y `npm run lint` no muestra avisos.

## Paso 9 – Componente MovieList

Archivos: `src/components/MovieList/MovieList.jsx` y `MovieList.css`.

Props:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `movies` | `Array<{ id, title, image, rating, showtimes, … }>` | Películas en cartelera. |

Qué renderiza:

- Un `<section id="cartelera" className="movie-list">` etiquetado por su título con
  `aria-labelledby`; `id="cartelera"` es el destino del enlace "Cartelera" del `Header`.
- Un `<h2>Cartelera</h2>` y una rejilla CSS responsiva (`.movie-list__grid`) con
  `repeat(auto-fill, minmax(min(100%, calc(var(--space-8) * 3.5)), 1fr))`: tantas columnas como
  quepan, de un mínimo de 14rem, y una sola columna en pantallas estrechas sin desbordar.
- Un `MovieCard` por película. `MovieList` recorre el arreglo y pasa a cada tarjeta solo sus cuatro
  campos, con `key={movie.id}`, el identificador estable de los datos:

  ```jsx
  <MovieCard
    key={movie.id}
    title={movie.title}
    image={movie.image}
    rating={movie.rating}
    showtimes={movie.showtimes}
  />
  ```

- `scroll-margin-block-start` en la sección y en la rejilla para que, al saltar desde el menú, el
  contenido no quede tapado por el `Header` fijo.

Uso en `App`: `<MovieList movies={movies} />` sustituye a la tarjeta suelta (y a su `div` con
`style` en línea) del paso 8.

### Anclas del menú

| Enlace | Destino |
|--------|---------|
| `#cartelera` | `<section id="cartelera">` de `MovieList`. |
| `#horarios` | `<div id="horarios">`, la rejilla de tarjetas de `MovieList`. |
| `#contacto` | `<footer id="contacto">` de `Footer`. |

No hay una sección propia de horarios, así que en lugar de inventar un componente nuevo se puso
`id="horarios"` en la rejilla de `MovieList`: es el lugar de la página donde se ven los horarios,
porque cada tarjeta muestra los de su película.

### `App.jsx` final

```jsx
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
    <MovieList movies={movies} />
  </main>
  <Footer name={cinema.name} contact={cinema.contact} />
</>
```

`Header` y `Footer` quedan fuera de `<main>`; cada componente usa `.container` por dentro para
limitar el ancho.

Además se corrigió en el paso 8 de este documento un fragmento de código en línea con comillas
invertidas anidadas que no se veía bien.

Resultado: `npm run build` compila sin errores (27 módulos) y `npm run lint` no muestra avisos.

## Paso 10 – Composición de la cartelera en App y revisión

### Composición en `App.jsx`

`App` es el único componente que conoce los datos: importa `movies` y `cinema` de
`data/movies.js`, elige la película destacada (la de mayor `rating`) y reparte por props solo lo
que necesita cada componente. El orden es `Header`, `<main>` con `Hero` y `MovieList`, y `Footer`.

Enlaces del Header comprobados contra la página:

| Enlace | `href` | Destino real |
|--------|--------|--------------|
| Cartelera | `#cartelera` | `<section id="cartelera">` de `MovieList` |
| Horarios | `#horarios` | `<div id="horarios">`, la rejilla de tarjetas de `MovieList`, donde se ven los horarios |
| Contacto | `#contacto` | `<footer id="contacto">` |

### Recorte en componentes

```
┌──────────────────────────────────────────────────────────────────┐
│ <Header>                  props: name, navLinks                  │
│  Cine Aurora (h1)           [Cartelera] [Horarios] [Contacto]    │ ← <header> + <nav>
├──────────────────────────────────────────────────────────────────┤
│ <main>                                                           │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ <Hero>   props: title, image, synopsis, classification,      │ │
│ │                 rating   (película destacada)                │ │ ← <section>
│ │  ┌────────┐  Película destacada                              │ │
│ │  │ póster │  Ecos de Marte (h2)                              │ │
│ │  │        │  [+14]  ★ 8.4/10                                 │ │
│ │  └────────┘  Sinopsis…                                       │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ <MovieList>   props: movies        id="cartelera"            │ │ ← <section>
│ │  Cartelera (h2)                                              │ │
│ │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   id=       │ │
│ │  │ <MovieCard> │ │ <MovieCard> │ │ <MovieCard> │ "horarios"  │ │
│ │  │  póster     │ │  póster     │ │  póster     │   …         │ │ ← <article>
│ │  │  título(h3) │ │  título(h3) │ │  título(h3) │   (8 en     │ │   × 8, con
│ │  │  ★ 7.8/10   │ │  ★ 8.4/10   │ │  ★ 7.2/10   │   total)    │ │   key={movie.id}
│ │  │  14:30 17:00│ │  15:15 …    │ │  16:00 …    │             │ │
│ │  └─────────────┘ └─────────────┘ └─────────────┘             │ │
│ │  MovieCard props: title, image, rating, showtimes            │ │
│ └──────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ <Footer>   props: name, contact          id="contacto"           │ ← <footer>
│  Contacto (h2) · dirección · teléfono · correo (<address>)       │
│  Horario · © 2026 Cine Aurora                                    │
└──────────────────────────────────────────────────────────────────┘
```

Flujo de datos: `movies.js` → `App` → props → componentes. Ningún componente importa los datos
ni tiene estado; todos son de presentación.

### Revisión del ui-reviewer

Igual que en los pasos anteriores, el subagente no se pudo invocar por su nombre en esta sesión.
Se usó un agente general con el rol de `.claude/agents/ui-reviewer.md` en modo solo lectura.

**Resultado:** 0 errores, 5 avisos y 4 sugerencias. `npm run lint` sin errores ni avisos.

Comprobado como correcto:
- Una responsabilidad por componente.
- Keys estables y únicas: `link.id`, `movie.id` y la hora, sin índices.
- Ni estado ni hooks.
- Sin `class`/`for` y sin imports sin usar.
- Anidación del DOM válida e ids únicos.
- `alt` descriptivo en todas las imágenes.
- HTML semántico y jerarquía h1 → h2 → h3.
- Las rutas de los pósters existen.
- Reglas del proyecto cumplidas.
- `Footer` recibe el objeto `contact` entero, pero usa sus cuatro campos, así que es correcto.

Hallazgos y cómo se corrigieron:

| Archivo | Tipo | Hallazgo | Corrección |
|---------|------|----------|------------|
| `Header.jsx` | aviso | Clases `header__nav` y `header__item` sin regla CSS | Clases eliminadas |
| `MovieCard.jsx` | aviso | Clase `movie-card__title` sin regla CSS | Clase eliminada |
| `Footer.jsx` | aviso | Clases `footer__item` (×3) y `footer__schedule` sin regla CSS | Clases eliminadas |
| `Footer.css` | sugerencia | Al saltar a `#contacto`, la cabecera fija puede tapar el título | `scroll-margin-block-start` añadido a `.footer` |
| `Hero.jsx` | sugerencia | Una clasificación desconocida se pintaba en verde, como si fuera "APT" | Si no hay color definido, se usa la insignia base con fondo neutro (`--color-surface-alt`) |
| `Hero.jsx`, `MovieCard.jsx` | sugerencia | El lector de pantalla lee la "★" en voz alta | `★` con `aria-hidden="true"` y el texto "Valoración:" oculto visualmente con la nueva utilidad `.visually-hidden` de `global.css` |
| `App.jsx` | sugerencia | `reduce` sin valor inicial falla si `movies` está vacío | No se cambia: los datos son estáticos y nunca están vacíos. Habrá que tenerlo en cuenta si los datos vienen de la API |

Tras las correcciones se comprobó que todas las clases usadas en el JSX tienen su regla CSS.
`npm run lint` no da errores ni avisos y `npm run build` compila correctamente.

- Commit: `Composición de la cartelera en App y revisión` y push.

## Paso 11 – Tres errores típicos de JSX

Se provocó cada error a propósito, de uno en uno y sin hacer commit. Se hizo la captura y se
revirtió con `git checkout -- <archivo>` antes de pasar al siguiente. Al terminar, `git status` no
mostraba cambios, `npm run lint` no daba errores ni avisos y `npm run build` compilaba correctamente.

| # | Archivo | Tipo | Dónde aparece |
|---|---------|------|---------------|
| 1 | `MovieCard.jsx` | Aviso en tiempo de ejecución | Consola del navegador (la app sigue funcionando) |
| 2 | `Footer.jsx` | Error de compilación | Terminal de Vite y overlay en el navegador (la app no compila) |
| 3 | `MovieList.jsx` | Aviso de listas | Consola del navegador (la app sigue funcionando) |

### Error 1 – `class` en lugar de `className`

**Cambio:** en `MovieCard.jsx:6`, `<article className="movie-card">` pasó a `<article class="movie-card">`.

**Mensaje (consola del navegador):**

```
Invalid DOM property `class`. Did you mean `className`?
```

**Por qué:** JSX no es HTML; se transforma en llamadas de JavaScript donde los atributos son
propiedades de un objeto. React usa los nombres de las propiedades del DOM, y en el DOM esa
propiedad se llama `className`, porque `class` es una palabra reservada de JavaScript. El código
es JavaScript válido y por eso compila. En modo desarrollo, React detecta el nombre incorrecto y
avisa en la consola. Es solo un **aviso**: React 19 todavía aplica el atributo, pero el código
no es correcto y el aviso indica cómo arreglarlo.

### Error 2 – Dos nodos raíz sin fragmento

**Cambio:** en `Footer.jsx` el párrafo del copyright se sacó fuera de `</footer>`, de modo que el
`return` devolvía dos elementos hermanos (`<footer>` y `<p>`) sin nada que los envolviera.

**Mensaje (`npm run build`, igual que en el overlay del servidor de desarrollo):**

```
[builtin:vite-transform] Adjacent JSX elements must be wrapped in an enclosing tag.
    ╭─[ src/components/Footer/Footer.jsx:31:5 ]
 31 │     <p className="footer__copyright">
    │ Help: Did you want a JSX fragment `<>...</>`?
```

**Por qué:** cada elemento JSX se convierte en una sola expresión (una llamada a `jsx(...)`), y
un `return` solo puede devolver un valor. Dos elementos seguidos son dos expresiones sin operador
entre ellas, así que el código **no es sintácticamente válido** y el transformador de Vite falla
antes de ejecutar nada: es un **error de compilación** y la aplicación no llega a cargarse.
Solución: envolverlos en un fragmento `<>...</>`, que agrupa sin añadir nodos al DOM, o en un
elemento contenedor.

### Error 3 – `map` sin `key`

**Cambio:** en `MovieList.jsx` se quitó `key={movie.id}` del `<MovieCard>` generado dentro de
`movies.map(...)`.

**Mensaje (consola del navegador, `MovieList.jsx:15`):**

```
Each child in a list should have a unique "key" prop. Check the render method of `MovieList`.
```

**Por qué:** al volver a renderizar una lista, React compara los hijos nuevos con los anteriores
para decidir qué crear, mover o eliminar (reconciliación), y la `key` es lo que identifica a cada
elemento entre renders. Sin ella, React solo puede usar la posición, y si la lista se reordena,
filtra o cambia, puede reutilizar mal los nodos o su estado. La página se ve bien, así que no es
un error. Es un **aviso de listas** que React muestra en desarrollo. La solución es una `key`
estable y única tomada de los datos (`movie.id`); el índice del `map` no sirve si la lista puede
cambiar de orden.

## Paso 12 – Documentación final

- `README.md` de la raíz: se conservó íntegra la parte del laboratorio 08 y se añadió al final la
  sección "Laboratorio 09: Cartelera con React". Incluye descripción, ejecución, estructura de
  componentes, dependencias, subagentes y su relación con los de opencode, y la lista de commits.
- `frontend/README.md`: sustituye el README genérico de la plantilla de Vite por un resumen de lo
  anterior.

## Uso de IA

Todo el laboratorio se hizo con **Claude Code**. Los pasos 3 a 10 se delegaron a los
subagentes definidos en `.claude/agents/`.

| Qué se le pidió | Qué hizo | Resultado |
|-----------------|----------|-----------|
| Verificar `.gitignore`, commit y push del proyecto Vite | Comprobó que `node_modules` y `dist` estaban excluidos y que no se preparaba ningún archivo de `node_modules` | Aceptado |
| Crear `CLAUDE.md` y los subagentes `react-dev` y `ui-reviewer` | Los redactó a partir de los agentes de `.opencode/agent/`; `ui-reviewer` quedó limitado a `Read`, `Glob` y `Grep` | Aceptado |
| Limpiar el andamiaje de la plantilla | Borró logos, `App.css` y el contador, y además `index.css` y el favicon (decisiones propias, informadas al usuario) | Aceptado |
| Subir el lab 09 al repo de Lab08-Django | Lo hizo, pero mezclaba dos laboratorios en un repo | **Rechazado por el usuario**: se trasladó a Lab09-React y se restauró Lab08-Django a `dbd0cd2` con `--force-with-lease` |
| Usar el subagente `react-dev` / `ui-reviewer` por su nombre | Falló: los subagentes creados a mitad de sesión no se cargan hasta reiniciar | Alternativa aceptada: un agente general con el rol de cada archivo |
| Carpetas, arquitectura de CSS, datos y pósters (pasos 3 y 4) | Creó `styles/` con tokens, `movies.js` con 8 películas inventadas y 8 pósters SVG | Aceptado |
| Los cinco componentes (pasos 5 a 9) | Un commit por componente con build y lint. Por su cuenta movió el `<h1>` al Header y llevó `#horarios` a la rejilla | Aceptado |
| Revisión con `ui-reviewer` (paso 10) | 0 errores, 5 avisos y 4 sugerencias | 5 avisos y 3 sugerencias **aplicados**. La sugerencia de proteger el `reduce` ante una lista vacía se **rechazó** porque los datos son estáticos |
| Numeración del entregable | El agente dejó "Paso 3/4/5" repetidos | Corregido: las tareas iniciales pasaron a "Configuración 1–5" |
| Provocar los tres errores de JSX sin commit (paso 11) | Los introdujo y revirtió de uno en uno. El mensaje del error 2 no estaba disponible, así que lo reprodujo con `npm run build` en lugar de inventarlo | Aceptado |

## Conclusiones

- **Separar datos y presentación** simplifica los componentes: `App` es el único que conoce
  `movies.js`, y el resto son funciones puras de sus props. Si los datos llegan más adelante
  desde la API Django del lab 08, solo cambian `data/` y `App`.
- **Una carpeta por componente** con su `.jsx` y su `.css`, más los tokens de `variables.css`,
  permite cambiar el aspecto de toda la app desde un solo archivo sin que los estilos se pisen.
- **Props mínimas**: pasar campos sueltos (`title`, `image`…) en vez del objeto completo deja
  claro qué necesita cada componente y facilita la revisión.
- **Los tres errores típicos de JSX** muestran tres niveles de gravedad:
  - `class` en vez de `className` compila, pero React avisa en la consola.
  - Dos nodos raíz sin fragmento no compilan.
  - Un `map` sin `key` funciona, pero arriesga la reconciliación de la lista.
- **Subagentes con roles separados** (uno escribe, otro solo revisa) reproducen el esquema del
  lab 08 con opencode. El revisor de solo lectura encontró problemas reales que el lint no
  detecta: clases CSS sin regla, accesibilidad de la "★" y el `scroll-margin` del footer.
- **Supervisión humana**: la IA aceleró el trabajo, pero el usuario revisó cada paso. Corrigió la
  decisión de usar el mismo repositorio, y las propuestas del revisor se valoraron una a una.
