// src/api.js
// Cliente ligero para la API REST del backend (backend/server.js).

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error ${res.status} al comunicar con el servidor.`);
  }

  if (res.status === 204) return null; // sin contenido (delete)
  return res.json();
}

export const api = {
  getTodos: () => request('/todos'),
  createTodo: (text, priority) =>
    request('/todos', { method: 'POST', body: JSON.stringify({ text, priority }) }),
  updateTodo: (id, changes) =>
    request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(changes) }),
  deleteTodo: (id) => request(`/todos/${id}`, { method: 'DELETE' }),
};
