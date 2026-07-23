# Bitácora — Gestor de tareas

Aplicación de gestión de tareas con **frontend en React** y una **API REST propia en Express**, pensada como pieza de portafolio para roles de desarrollo backend/full-stack.

## Características

- CRUD completo de tareas (crear, listar, editar, marcar como completada, eliminar)
- Prioridades (baja / media / alta) con codificación visual por color
- Edición de texto en línea (doble clic sobre la tarea o botón "Editar")
- Filtros por estado: todas / pendientes / completadas
- Actualizaciones optimistas en la UI con reversión automática si falla la petición
- Manejo de estados de carga y error, con opción de reintentar
- API desacoplada del frontend mediante variable de entorno (`REACT_APP_API_URL`)

## Arquitectura

```
├── src/                  # Frontend (React)
│   ├── api.js             # Cliente HTTP hacia la API (fetch)
│   ├── App.js              # Estado global y orquestación
│   └── components/         # TodoForm, TodoList, TodoItem, DateFormatter
└── backend/               # API REST (Express)
    └── server.js            # Rutas /todos (GET, POST, PUT, DELETE)
```

El frontend no conoce detalles de persistencia: solo habla con la API a través de `src/api.js`. El backend guarda los datos en `backend/data.json` (pensado para desarrollo/demo; en producción se sustituiría por una base de datos real).

## API

| Método | Ruta          | Descripción                                  |
|--------|---------------|-----------------------------------------------|
| GET    | `/todos`      | Lista todas las tareas                        |
| POST   | `/todos`      | Crea una tarea (`{ text, priority }`)         |
| PUT    | `/todos/:id`  | Actualiza texto, prioridad o estado           |
| DELETE | `/todos/:id`  | Elimina una tarea                             |

Todas las respuestas de error devuelven `{ "error": "mensaje" }` con el código HTTP correspondiente (400, 404, 500).

## Puesta en marcha

Requisitos: Node.js >= 18.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # ajusta PORT o CORS_ORIGIN si hace falta
npm start
```

Levanta la API en `http://localhost:5000` (o el puerto que definas en `.env`).

### 2. Frontend

En otra terminal, desde la raíz del proyecto:

```bash
npm install
cp .env.example .env   # ajusta REACT_APP_API_URL si hace falta
npm start
```

Abre `http://localhost:3000`.

### 3. Arrancar ambos a la vez

Desde la raíz:

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

## Próximas mejoras posibles

- Persistencia en una base de datos real (PostgreSQL / SQLite) en lugar de un archivo JSON
- Autenticación de usuarios y tareas por usuario
- Paginación/orden en el backend para listas grandes
- Despliegue del backend (Render/Railway) y del frontend (Vercel/Netlify)
