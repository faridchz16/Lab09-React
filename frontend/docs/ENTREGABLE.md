# Entregable – Laboratorio 09: Cartelera de cine con React + Vite

Este repositorio es acumulativo: en la raíz está la API Django del laboratorio 08 y en `frontend/`
el proyecto React del laboratorio 09. En ningún paso se modificó el backend Django (`config/`,
`quiz/`, `agent/`, `quizctl.py`, etc.) ni la carpeta `.opencode/`.

## Paso 1 – Creación del proyecto React con Vite

- Se comprobó que `frontend/.gitignore` (generado por la plantilla de Vite) incluye la entrada
  `node_modules`, además de `dist`, `dist-ssr` y `*.local`. Al preparar el commit se verificó que
  ningún archivo de `node_modules/` quedaba en el área de preparación.
- Commit: `Creación del proyecto React con Vite en frontend/` (`f1a9673`) y push a `origin/main`.

## Paso 2 – CLAUDE.md

- Se creó `CLAUDE.md` en la raíz con:
  - La descripción del repositorio (backend Django del lab 08 y frontend React del lab 09).
  - La indicación de que todo el código React va en `frontend/` y que los comandos npm
    (`install`, `dev`, `build`, `lint`) se ejecutan dentro de esa carpeta.
  - Las reglas del proyecto: componentes funcionales en PascalCase; una carpeta por componente
    (`Componente/Componente.jsx` + `Componente.css`); props sin estado ni hooks; código y
    comentarios en inglés; explicaciones en español; un commit por tarea con mensaje en español.
- Commit: `Creación de CLAUDE.md con la descripción del repositorio y las reglas del frontend` (`c7c3b61`).

## Paso 3 – Subagentes de Claude Code

Se crearon dos subagentes en `.claude/agents/`, equivalentes a los de `.opencode/agent/` del lab 08
(`django-dev` y `cli-gateway`), pero orientados al frontend:

| Subagente | Archivo | Herramientas | Función |
|-----------|---------|--------------|---------|
| `react-dev` | `.claude/agents/react-dev.md` | Read, Write, Edit, Glob, Grep, Bash | Escribe componentes funcionales y sus estilos dentro de `frontend/`, siguiendo las reglas de `CLAUDE.md`. |
| `ui-reviewer` | `.claude/agents/ui-reviewer.md` | Read, Glob, Grep (solo lectura) | Revisa que cada componente tenga una sola responsabilidad, que las props lleven solo lo necesario y que no haya avisos de React (keys, atributos DOM inválidos, imports sin usar, estado/hooks en componentes de presentación). |

- Commit: `Creación de los subagentes react-dev y ui-reviewer en .claude/agents/` (`0cb7788`).

## Paso 4 – Limpieza del andamiaje de la plantilla

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

## Paso 5 – Documentación del entregable

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
- El póster en `<img>` con `alt={`Póster de ${title}`}`, dimensiones intrínsecas, proporción 2:3
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
