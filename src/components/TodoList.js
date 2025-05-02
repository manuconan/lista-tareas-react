// Importamos React para poder usar JSX y crear componentes
import React from 'react';

// Importamos el componente TodoItem que representa cada tarea individual
import TodoItem from './TodoItem';

/**
 * Componente TodoList
 * 
 * Este componente se encarga de mostrar la lista de tareas y permitir 
 * que el usuario realice acciones sobre ellas, como marcar como completadas
 * o eliminar tareas. Si no hay tareas, se muestra un mensaje indicando que 
 * la lista está vacía.
 * 
 * @param {Array} todos - Lista de tareas a mostrar.
 * @param {Function} toggleComplete - Función para marcar/desmarcar las tareas como completadas.
 * @param {Function} deleteTodo - Función para eliminar una tarea.
 * 
 * @returns {JSX} Renderiza la lista de tareas o un mensaje si no hay tareas.
 */
function TodoList({ todos, toggleComplete, deleteTodo }) {

  // Si no hay tareas, mostramos un mensaje indicando que no hay tareas aún
  if (todos.length === 0) {
    return <p style={{
      textAlign: 'center', // Centra el mensaje en la página
      color: 'gray',       // Color gris para el texto
      fontSize: 'italic'   // Estilo en cursiva
    }}>
      No hay tareas aún
    </p>
  }

  /**
   * Función handleDelete
   * 
   * Esta función maneja la eliminación de tareas. Muestra un cuadro de confirmación
   * antes de proceder con la eliminación.
   * 
   * @param {number} id - ID de la tarea a eliminar.
   */
  const handleDelete = (id) => {

    // Mostrar un cuadro de confirmación con un mensaje
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta tarea?");

    // Si el usuario confirma la eliminación, se ejecuta la función deleteTodo
    if (confirmDelete) {
      deleteTodo(id); // Llamamos a la función deleteTodo que elimina la tarea por su id
    }
    // Si el usuario no confirma, no hacemos nada y la tarea no se elimina
  };

  return (
    // Renderizamos la lista de tareas
    <ol style={{ listStyleType: 'decimal', padding: 0 }}> {/* Numeración decimal y sin padding */}
      {
        // Usamos map() para recorrer todas las tareas en el array 'todos'
        todos.map((todo, index) => (
          // Por cada tarea, renderizamos el componente TodoItem
          <TodoItem
            key={todo.id}            // ID único para cada tarea
            todo={todo}               // Pasamos el objeto 'todo' como prop al componente TodoItem
            index={index + 1}         // Pasamos el índice de la tarea, +1 para que empiece desde 1
            toggleComplete={toggleComplete}  // Función para marcar/desmarcar tarea como completada
            deleteTodo={() => handleDelete(todo.id)} // Función para eliminar la tarea con confirmación
          />
        ))
      }
    </ol>
  );
}

// Exportamos el componente TodoList para que pueda ser utilizado en otras partes del proyecto
export default TodoList;
