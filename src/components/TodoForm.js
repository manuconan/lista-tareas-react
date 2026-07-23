// src/components/TodoForm.js
import React, { useState } from 'react';

const PRIORITIES = [
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
];

/**
 * Formulario para registrar una nueva entrada en la bitácora.
 *
 * @param {Object} props
 * @param {Function} props.addTodo - (text, priority) => void
 */
function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('media');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addTodo(text, priority);
    setText('');
    setPriority('media');
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Registrar nueva tarea…"
        aria-label="Texto de la nueva tarea"
        className="entry-form__input"
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        aria-label="Prioridad de la tarea"
        className="entry-form__priority"
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <button type="submit" className="entry-form__submit">
        Añadir
      </button>
    </form>
  );
}

export default TodoForm;
