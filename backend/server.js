require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const DATA_FILE = path.join(__dirname, 'data.json');
const VALID_PRIORITIES = ['baja', 'media', 'alta'];

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// --- Helpers de acceso a datos -------------------------------------------

async function readTodos() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return []; // no existe aún el archivo: lista vacía
    throw err;
  }
}

async function writeTodos(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
}

function badRequest(res, message) {
  return res.status(400).json({ error: message });
}

// --- Rutas ----------------------------------------------------------------

// GET /todos - listar todas las tareas
app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudieron leer las tareas.' });
  }
});

// POST /todos - crear una nueva tarea
app.post('/todos', async (req, res) => {
  const { text, priority = 'media' } = req.body;

  if (!text || !text.trim()) {
    return badRequest(res, 'El texto de la tarea no puede estar vacío.');
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    return badRequest(res, `Prioridad inválida. Usa: ${VALID_PRIORITIES.join(', ')}.`);
  }

  try {
    const todos = await readTodos();
    const newTodo = {
      id: randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    todos.unshift(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo guardar la tarea.' });
  }
});

// PUT /todos/:id - editar texto, prioridad o estado de una tarea
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed, priority } = req.body;

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return badRequest(res, `Prioridad inválida. Usa: ${VALID_PRIORITIES.join(', ')}.`);
  }
  if (text !== undefined && !text.trim()) {
    return badRequest(res, 'El texto de la tarea no puede estar vacío.');
  }

  try {
    const todos = await readTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    const updated = {
      ...todos[index],
      ...(text !== undefined && { text: text.trim() }),
      ...(completed !== undefined && { completed }),
      ...(priority !== undefined && { priority }),
    };
    todos[index] = updated;

    await writeTodos(todos);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar la tarea.' });
  }
});

// DELETE /todos/:id - eliminar una tarea
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await readTodos();
    const exists = todos.some((todo) => todo.id === id);

    if (!exists) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    await writeTodos(todos.filter((todo) => todo.id !== id));
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo eliminar la tarea.' });
  }
});

// 404 para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
