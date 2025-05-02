import React from 'react';

/**
 * Componente `TodoItem` que representa una tarea individual en la lista de tareas.
 * Permite al usuario marcarla como completada o eliminarla.
 *
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Object} props.todo - El objeto de la tarea que contiene la información como texto, ID y estado de completado.
 * @param {number} props.index - El índice de la tarea en la lista, utilizado para mostrar la numeración antes del texto de la tarea.
 * @param {function} props.toggleComplete - Función para marcar/desmarcar una tarea como completada.
 * @param {function} props.deleteTodo - Función para eliminar la tarea de la lista.
 *
 * @returns {JSX.Element} El JSX que representa un elemento de tarea en la lista.
 */
function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li
      style={{
        display: 'flex', // Utilizamos Flexbox para distribuir el contenido en línea
        justifyContent: 'space-between', // Espaciamos el texto de la tarea y el botón de eliminar
        alignItems: 'center', // Centramos verticalmente el contenido dentro de cada elemento de lista
      }}
    >
      {/* Texto de la tarea, que es clickeable para marcarla como completada */}
      <span
        onClick={() => toggleComplete(todo.id)} // Llamamos a toggleComplete con el ID de la tarea
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none', // Si la tarea está completada, tachamos el texto
          cursor: 'pointer', // Indicamos que el texto es clickeable cambiando el cursor a mano
        }}
      >
        {index}. {todo.text} {/* Mostramos el índice de la tarea y su texto */}
      </span>

      {/* Botón para eliminar la tarea, con un icono de cruz */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic en el botón también marque/desmarque la tarea al evitar que el evento llegue al li
          deleteTodo(todo.id); // Llamamos a deleteTodo pasando el ID de la tarea para eliminarla
        }}
        style={{
          marginLeft: '10px', // Separación entre el texto de la tarea y el botón de eliminar
          cursor: 'pointer', // Indicamos que el botón es clickeable cambiando el cursor a mano
        }}
      >
        ❌ {/* Icono de cruz que representa la acción de eliminar la tarea */}
      </button>
    </li>
  );
}

export default TodoItem;
