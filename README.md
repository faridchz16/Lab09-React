# Lab08: API Headless — Contrato, Cliente de Consola y Frontera del Agente

Este repositorio contiene el desarrollo del proyecto Lab 08 de Desarrollo de Aplicaciones Empresariales (DAE), enfocado en la construcción y exposición de una API de cuestionarios (*Headless API*) mediante Django REST Framework, la implementación de un contrato OpenAPI, un cliente de consola robusto (`quizctl.py`), control de permisos granulares en el servidor (separando identidades de humanos y agentes de IA), y una pasarela de ejecución segura con auditoría de intenciones.

## 🚀 Descripción General del Proyecto

El sistema es una API backend de cuestionarios construida en Django que gestiona exámenes, preguntas y opciones de respuesta. El proyecto aborda cuatro ejes principales:

1. **El Contrato (OpenAPI):** Generación automática y validación del contrato de la máquina mediante `django-spectacular` (`schema.yml`) e interfaz interactiva Swagger UI / ReDoc.
2. **Cliente de Consola (`quizctl.py`):** Un cliente sin interfaz gráfica para listar, crear, ver detalles y eliminar recursos, con códigos de salida normalizados según el estado HTTP y gestión de cuerpos de peticiones JSON.
3. **Identidades y Permisos en el Servidor (`quiz/permissions.py`):** Reglas de seguridad estrictas donde la persona (*profe*) tiene acceso total, el grupo `agente` puede leer, crear y modificar pero **nunca borrar** (recibiendo `403 Forbidden` ante cualquier intento destructivo), y los demás tienen acceso de solo lectura.
4. **Frontera del Agente de IA (`agent/gateway.py`):** Pasarela cerrada de intenciones con validación de contratos, cálculo de huellas criptográficas SHA-256, aprobación obligatoria con token humano para operaciones destructivas, y registro de auditoría en `agent_audit.jsonl`.

## 🔗 Enlaces de Acceso Local (Desarrollo)

Una vez ejecutado el servidor (`python manage.py runserver`), puedes acceder a:
- **Centro de Control e Inicio:** http://127.0.0.1:8000/
- **Documentación Interactiva (Swagger UI):** http://127.0.0.1:8000/api/docs/
- **Referencia ReDoc:** http://127.0.0.1:8000/api/redoc/
- **API Navegable (DRF):** http://127.0.0.1:8000/api/
- **Panel de Administración (Django Admin):** http://127.0.0.1:8000/admin/
  - *Credenciales:* `profe` / `profe123`

## 📋 Resumen de Implementación y Puesta en Marcha

1. **Entorno y Dependencias:**
   ```powershell
   python -m venv .venv
   .venv\Scripts\activate          # en Windows
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py seed_quiz      # Carga datos y genera los tokens de profe y agente
   python manage.py runserver      # Deja corriendo en una terminal
   ```

2. **Ejecución del Cliente de Consola (`quizctl.py`):**
   ```powershell
   $env:QUIZ_URL = "http://127.0.0.1:8000"
   $env:QUIZ_TOKEN_HUMANO = "..."  # Token impreso por seed_quiz
   $env:QUIZ_TOKEN_AGENTE = "..."
   $env:QUIZ_TOKEN = $env:QUIZ_TOKEN_HUMANO

   python quizctl.py exams list
   python quizctl.py questions create --exam 3 --text "¿Qué es REST?" --choice "Un estilo:ok" --choice "Un lenguaje"
   ```

3. **Pruebas de la Pasarela del Agente (`agent`):**
   ```powershell
   python -m agent --intent '{"op": "exams_list"}'
   python -m agent --intent '{"op": "exams_destroy", "path": {"id": 1}}' --approve <hash>
   ```

4. **Ejecución de Pruebas Unitarias:**
   ```powershell
   python manage.py test
   ```

## 📐 Modelos del Sistema (`quiz/models.py`)

- **Exam (Examen):** `title` (título), `description` (descripción) y `created_at` (fecha de creación).
- **Question (Pregunta):** Relación ForeignKey con Exam, y `text` (enunciado). Incluye validación estricta en el serializador para aceptar únicamente preguntas con **exactamente una opción correcta**.
- **Choice (Opción):** Relación ForeignKey con Question, `text` (texto de la opción) y `is_correct` (booleano indicador de respuesta correcta).

## 🤖 Agentes Utilizados en opencode

Durante el desarrollo de este laboratorio, se configuraron y utilizaron subagentes especializados bajo `.opencode/agent/`:
- **django-dev:** Especializado en modelos, serializadores derivados (`ModelSerializer`), validadores personalizados de DRF, viewsets y reglas de permisos en el servidor.
- **cli-gateway:** Especializado en el desarrollo del cliente de consola `quizctl.py`, esquemas OpenAPI y pasarelas seguras de agentes con auditoría de intenciones.

## 📦 Estructura de Commits del Repositorio

El historial de versiones se encuentra organizado en 8 commits atómicos documentados en español:
- `696e588` - Adición de la documentación README.md del laboratorio 08
- `0f969fa` - Implementación de la pasarela y frontera segura del agente de IA (agent/) con auditoría
- `5936e59` - Desarrollo del cliente de consola (quizctl.py), contrato OpenAPI (schema.yml) y pruebas unitarias
- `2a0f760` - Configuración de permisos estrictos en el servidor para prohibir borrados al agente
- `0d76dca` - Implementación de ViewSets, filtrado, búsqueda, paginación, panel de administración y rutas de la API
- `93a8c04` - Implementación de serializadores con validación de opción correcta única y relaciones anidadas
- `1769fc7` - Creación del comando de inicialización de datos y tokens (seed_quiz)
- `656b564` - Implementación de modelos en singular (Exam, Question, Choice) y migraciones iniciales
- `a013b9a` - Configuración inicial del proyecto Django, dependencias y estructura base

## 📸 Capturas y Evidencias del Proyecto

A continuación se muestran las principales evidencias del funcionamiento, verificación y pruebas del proyecto almacenadas en la carpeta `Evidencias_lab08/`:

1. **Centro de Control e Inicio:**
   ![Centro de Control](Evidencias_lab08/01_inicio_centro_control.png)

2. **Documentación Interactiva (Swagger UI):**
   ![Swagger UI](Evidencias_lab08/02_documentacion_swagger_ui.png)

3. **API Navegable de Django REST Framework:**
   ![API Navegable](Evidencias_lab08/03_api_navegable_drf.png)

4. **Panel de Administración de Django:**
   ![Panel de Administración](Evidencias_lab08/04_panel_administracion_django.png)

5. **Ejecución del Cliente de Consola (`quizctl.py`):**
   ![Cliente de Consola](Evidencias_lab08/05_cliente_consola_quizctl.png)

6. **Pasarela de Seguridad del Agente de IA:**
   ![Pasarela de IA](Evidencias_lab08/06_pasarela_seguridad_agente_ia.png)

---

# Laboratorio 09: Cartelera con React

## 🎬 Descripción

Este repositorio (**Lab09-React**) continúa el laboratorio 08: conserva todo el backend Django
anterior y añade en `frontend/` una **cartelera de cine** hecha con **React + Vite**. La página
muestra el cine ficticio "Cine Aurora" con:
- una cabecera con navegación;
- un banner con la película mejor valorada;
- una rejilla con las 8 películas en cartelera (póster, valoración y horarios);
- un pie de página con los datos de contacto.

Los datos son estáticos (`src/data/movies.js`) y todos los componentes son funcionales y de
presentación: reciben la información por props, sin estado ni hooks.

## ▶️ Cómo ejecutarlo

Requisitos: Node.js y npm.

```bash
cd frontend
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
```

Otros comandos (siempre dentro de `frontend/`):

```bash
npm run build      # compilación de producción en frontend/dist/ (excluida de Git)
npm run preview    # sirve la compilación de producción
npm run lint       # ESLint
```

## 🧩 Estructura de componentes

```
frontend/
├── public/posters/          # 8 pósters SVG, servidos tal cual por Vite (/posters/...)
├── docs/ENTREGABLE.md       # registro detallado de cada paso
└── src/
    ├── main.jsx             # punto de entrada: importa global.css y monta <App />
    ├── App.jsx              # compone la página y reparte los datos por props
    ├── data/movies.js       # exporta `movies` (8 películas) y `cinema` (nombre, navegación, contacto)
    ├── styles/
    │   ├── variables.css    # tokens: colores, tipografía, espaciado, radios, sombras
    │   └── global.css       # estilos base, .container y .visually-hidden
    └── components/          # una carpeta por componente: Componente.jsx + Componente.css
        ├── Header/          # <header> con el nombre del cine (h1) y <nav>
        ├── Hero/            # <section> con la película destacada
        ├── MovieList/       # <section id="cartelera"> que recorre las películas con map
        ├── MovieCard/       # <article> de una película
        └── Footer/          # <footer id="contacto"> con la dirección y el contacto
```

| Componente | Props | Qué muestra |
|------------|-------|-------------|
| `Header` | `name`, `navLinks` | Nombre del cine y enlaces a `#cartelera`, `#horarios` y `#contacto` |
| `Hero` | `title`, `image`, `synopsis`, `classification`, `rating` | Banner de la película mejor valorada, con insignia de clasificación |
| `MovieList` | `movies` | Sección "Cartelera" con una rejilla responsiva; cada `MovieCard` lleva `key={movie.id}` |
| `MovieCard` | `title`, `image`, `rating`, `showtimes` | Póster con `alt`, título, valoración `★ x/10` y lista de horarios |
| `Footer` | `name`, `contact` | Dirección, teléfono (`tel:`), correo (`mailto:`), horario y copyright |

`App` es el único componente que importa los datos. Cada componente recibe solo los campos que
usa; por ejemplo, `MovieCard` recibe cuatro campos sueltos y no el objeto `movie` entero.

## 📚 Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react`, `react-dom` | 19.3.1 | Biblioteca de interfaz y renderizado en el DOM |
| `vite` | 8.3.6 | Servidor de desarrollo y empaquetador |
| `@vitejs/plugin-react` | 6.2.1 | Soporte de JSX y recarga en caliente para React |
| `eslint`, `@eslint/js`, `globals` | 10.14.0 / 10.0.1 / 17.14.0 | Análisis estático |
| `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | 7.1.1 / 0.5.7 | Reglas de React para ESLint |

No se añadieron dependencias a la plantilla de Vite.

## 🤖 Subagentes de Claude Code

Se definieron en `.claude/agents/` dos subagentes, equivalentes a los de `.opencode/agent/` del
laboratorio 08. Las reglas del proyecto están en `CLAUDE.md`.

| Lab 09 (Claude Code) | Función | Equivalente en el lab 08 (opencode) |
|----------------------|---------|--------------------------------------|
| `react-dev` | Escribe componentes y estilos en `frontend/`; puede editar y ejecutar comandos | `django-dev`, que construía el backend (modelos, serializadores, vistas) con permisos de edición |
| `ui-reviewer` | Solo lectura: revisa responsabilidad única, props mínimas, avisos de React y `alt` | `cli-gateway`, también especializado y con un ámbito acotado. En el lab 08 no había un agente revisor separado; en el lab 09 se separan quien escribe y quien revisa |

Las dos herramientas siguen el mismo formato: un archivo Markdown por agente con un *front matter*
(descripción, herramientas o permisos) y un *prompt* de sistema. La diferencia está en los
permisos. opencode los declara con `permission:`, mientras que Claude Code limita las
herramientas con `tools:`. Por eso `ui-reviewer` solo tiene `Read`, `Glob` y `Grep`.

Nota: los subagentes se crearon a mitad de la sesión y Claude Code los carga al iniciar. Por eso
se ejecutaron mediante un agente general que adoptó el rol definido en cada archivo.

## 📦 Commits del laboratorio 09

Historial posterior a `dbd0cd2` (último commit del laboratorio 08), del más reciente al más antiguo:
- `3a05a81` - Registro de los tres errores típicos de JSX
- `5352a4b` - Composición de la cartelera en App y revisión
- `11a70b3` - Corrección de la numeración repetida de pasos en el entregable
- `b643b61` - Componente MovieList: rejilla de la cartelera con una tarjeta por película
- `f3c828b` - Componente MovieCard: tarjeta de película con póster, valoración y horarios
- `cc581d5` - Componente Hero: banner de la película mejor valorada
- `cf923a4` - Componente Footer: pie de página con los datos de contacto del cine
- `be1505e` - Componente Header: encabezado con el nombre del cine y la navegación
- `d6946bd` - Documentación de la estructura de carpetas y los datos en el entregable
- `13da241` - Creación de los datos de películas y del cine con pósters SVG
- `5e669c3` - Organización de src/ en carpetas y arquitectura de CSS
- `95de66d` - Registro del traslado a Lab09-React en el entregable
- `1bbda23` - Actualización de CLAUDE.md: el repositorio pasa a ser Lab09-React
- `f7d9c0f` - Documentación del entregable del laboratorio 09
- `74e6105` - Limpieza del andamiaje de la plantilla
- `0cb7788` - Creación de los subagentes react-dev y ui-reviewer en .claude/agents/
- `c7c3b61` - Creación de CLAUDE.md con la descripción del repositorio y las reglas del frontend
- `f1a9673` - Creación del proyecto React con Vite en frontend/

El detalle de cada paso está en [`frontend/docs/ENTREGABLE.md`](frontend/docs/ENTREGABLE.md).
