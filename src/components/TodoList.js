import React from 'react';
import TodoItem from './TodoItem'; // Importamos el componente para cada tarea individual

function TodoList({ todos, toggleComplete, deleteTodo }) {

  //Si no hay tareas, mostramos un mensaje
  if (todos.length === 0) {
    return <p style={{
      textAlign: 'center',
      color: 'gray',
      fontSize: 'italic'
    }}>No hay tareas aún</p>
  }
  return (
    <ol style={{ listStyleType: 'decimal', padding: 0 }}> {/* Ahora usamos 'decimal' para la numeración */}
      {todos.map((todo, index) => (  // 'index' nos da la posición de la tarea en el array
        <TodoItem
          key={todo.id}       // Cada tarea tiene un ID único
          todo={todo}          // Pasamos cada tarea como prop
          index={index + 1}    // Pasamos el índice + 1 para que la numeración empiece en 1
          toggleComplete={toggleComplete} // Función para marcar/desmarcar la tarea
          deleteTodo={deleteTodo} // Función para eliminar la tarea
        />
      ))}
    </ol>
  );
}

export default TodoList;
