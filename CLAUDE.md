# CLAUDE.md

## Descripción del repositorio

Repositorio acumulativo de laboratorios:

- **Laboratorio 08 – Backend Django** (raíz del repo): API REST de cuestionarios con Django REST Framework
  (`config/`, `quiz/`), cliente de consola `quizctl.py`, contrato OpenAPI `schema.yml` y pasarela
  segura del agente de IA (`agent/`). Sus subagentes de OpenCode están en `.opencode/agent/`.
- **Laboratorio 09 – Frontend React** (`frontend/`): cartelera de cine construida con React + Vite.

No modificar el backend Django (`config/`, `quiz/`, `agent/`, `quizctl.py`, `manage.py`,
`schema.yml`, `requirements.txt`) ni la carpeta `.opencode/` salvo petición explícita.

## Frontend

- Todo el código React vive en `frontend/`.
- Los comandos npm se ejecutan dentro de `frontend/`:
  - `npm install`
  - `npm run dev` — servidor de desarrollo de Vite
  - `npm run build` — compilación de producción
  - `npm run lint` — ESLint

## Reglas

- Componentes **funcionales** con nombre en **PascalCase**.
- **Una carpeta por componente**: `src/components/Componente/Componente.jsx` + `Componente.css`.
- Los componentes reciben datos por **props, sin estado ni hooks** (componentes de presentación).
- **Código y comentarios en inglés**; **explicaciones al usuario en español**.
- **Un commit por tarea**, con el mensaje en español.
