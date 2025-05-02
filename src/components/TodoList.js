import TodoItem from './TodoItem';

/**
 * Componente que muestra la lista completa de tareas
 * @param {Object} props - Recibe tres props:
 * - todos: Array de tareas 
 * - toggleComplete: Función para marcar/completar tareas
 * - deleteTodo: Función para eliminar tareas
 */
function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ol style={{ 
      listStyleType: 'none',  // Elimina la numeración por defecto
      padding: 0,
      counterReset: 'item-counter'  // Inicializa el contador CSS
    }}>
      {todos.map((todo, index) => (  // index viene del map
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index + 1}  // Pasamos el número de posición (1-based)
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}  // Aseguramos que deleteTodo se pasa correctamente
        />
      ))}
    </ol>
  );
}

export default TodoList;