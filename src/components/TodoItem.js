// src/components/TodoItem.js
import React, { useState } from 'react';
import DateFormatter from './DateFormatter';

/**
 * Una entrada individual de la bitácora: texto, prioridad, fecha y acciones.
 * Permite editar el texto en línea con doble clic o el botón "Editar".
 */
function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const startEditing = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      editTodo(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') commitEdit();
    if (event.key === 'Escape') {
      setDraft(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`entry entry--${todo.priority || 'media'} ${todo.completed ? 'is-done' : ''}`}>
      <label className="entry__checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        />
        <span className="entry__checkmark" aria-hidden="true" />
      </label>

      <div className="entry__body">
        {isEditing ? (
          <input
            type="text"
            className="entry__edit-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="entry__text" onDoubleClick={startEditing}>
            {todo.text}
          </span>
        )}
        <DateFormatter date={todo.createdAt} />
      </div>

      <div className="entry__actions">
        {!isEditing && (
          <button type="button" className="entry__edit" onClick={startEditing} aria-label="Editar tarea">
            Editar
          </button>
        )}
        <button type="button" className="entry__delete" onClick={() => deleteTodo(todo.id)} aria-label="Eliminar tarea">
          Eliminar
        </button>
      </div>

      {todo.completed && (
        <span className="entry__stamp" aria-hidden="true">
          Completado
        </span>
      )}
    </li>
  );
}

export default TodoItem;
