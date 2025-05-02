import React from 'react';

function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li
      onClick={() => toggleComplete(todo.id)} // Al hacer clic, se marca/desmarca como completada
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none', // Si la tarea está completada, tachamos el texto
        cursor: 'pointer', // El cursor es una mano para indicar que es clickeable
      }}
    >
      {/* Mostramos el número de la tarea con el índice */}
      <span>{index}. </span>  {/* Este es el número de la tarea, empieza desde 1 */}

      {todo.text} {/* Muestra el texto de la tarea */}

      {/* Botón para eliminar la tarea */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic en el botón también marque/desmarque la tarea
          deleteTodo(todo.id); // Llama la función para eliminar la tarea
        }}
        style={{ marginLeft: '10px' }} // Separación entre el texto y el botón
      >
        ❌ {/* Icono de cruz para eliminar */}
      </button>
    </li>
  );
}

export default TodoItem;
