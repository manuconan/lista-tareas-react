// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { api } from './api';

const FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'completed', label: 'Completadas' },
];

/**
 * Componente principal de la aplicación (Bitácora de tareas).
 * Gestiona el estado remoto de las tareas a través de la API del backend
 * y coordina el formulario, el filtrado y la lista.
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (text, priority) => {
    try {
      const newTodo = await api.createTodo(text, priority);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;
    // Actualización optimista: refleja el cambio antes de que responda el servidor
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
    try {
      await api.updateTodo(id, { completed: !target.completed });
    } catch (err) {
      setError(err.message);
      loadTodos(); // revertir al estado real si falla
    }
  };

  const editTodo = async (id, text) => {
    try {
      const updated = await api.updateTodo(id, { text });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    const previous = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    try {
      await api.deleteTodo(id);
    } catch (err) {
      setError(err.message);
      setTodos(previous); // revertir si falla el borrado
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const pendingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="page">
      <header className="ledger-header">
        <span className="ledger-header__eyebrow">Registro de actividad</span>
        <h1 className="ledger-header__title">Bitácora</h1>
        <p className="ledger-header__meta">
          {pendingCount === 0 ? 'Todo despejado' : `${pendingCount} pendiente${pendingCount === 1 ? '' : 's'}`}
        </p>
      </header>

      <main className="ledger">
        <TodoForm addTodo={addTodo} />

        <nav className="tabs" aria-label="Filtrar tareas">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`tabs__button ${filter === key ? 'is-active' : ''}`}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
            >
              {label}
            </button>
          ))}
        </nav>

        {error && (
          <div className="alert" role="alert">
            <strong>No se pudo completar la acción.</strong> {error}
            <button type="button" className="alert__retry" onClick={loadTodos}>
              Reintentar
            </button>
          </div>
        )}

        {isLoading ? (
          <p className="status-text">Cargando entradas…</p>
        ) : (
          <TodoList
            todos={filteredTodos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
