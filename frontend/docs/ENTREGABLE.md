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
