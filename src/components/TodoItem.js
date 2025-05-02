import React from 'react';

/**
 * Componente `TodoItem`
 * Representa una tarea individual con opciones para marcarla como completada o eliminarla.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.todo - Objeto con los datos de la tarea.
 * @param {number} props.index - Índice de la tarea en la lista.
 * @param {Function} props.toggleComplete - Función que alterna el estado de completado.
 * @param {Function} props.deleteTodo - Función para eliminar la tarea.
 *
 * @returns {JSX.Element} Representación visual de una tarea individual.
 */
function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li
      className="todo-item"
      onClick={() => toggleComplete(todo.id)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
        backgroundColor: todo.completed ? '#f5f5f5' : 'white',
      }}
    >
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'inherit',
        }}
      >
        {index}. {todo.text}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
        aria-label="Eliminar tarea"
        style={{
          marginLeft: '10px',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          fontSize: '1rem',
        }}
        title="Eliminar tarea"
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
