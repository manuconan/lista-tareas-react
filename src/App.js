// Importamos los módulos necesarios de React
import './App.css'; // Importamos los estilos CSS
import React, { useState } from 'react'; // useState nos permite manejar estado en componentes funcionales

// Importamos nuestros componentes personalizados
import TodoForm from "./components/TodoForm"; // Componente con el formulario para añadir tareas
import TodoList from "./components/TodoList"; // Componente que muestra la lista de tareas

// Componente principal de la aplicación
function App() {
  /*
   * Estado para almacenar nuestras tareas
   * - todos: Array que contiene todas las tareas
   * - setTodos: Función para actualizar el estado
   * Cada tarea será un objeto con { id, text, completed }
   */
  const [todos, setTodos] = useState([]);

  /**
   * Función para agregar una nueva tarea
   * @param {string} text - Texto de la tarea que viene del formulario
   */
  const addTodo = (text) => {
    // Creamos un nuevo objeto tarea
    const newTodo = {
      id: Date.now(),    // ID único basado en la marca de tiempo actual
      text,              // Texto de la tarea (usamos shorthand property)
      completed: false   // Estado inicial (no completada)
    };

    // Actualizamos el estado:
    // 1. newTodo: la nueva tarea
    // 2. ...todos: todas las tareas existentes (usamos spread operator)
    setTodos([newTodo, ...todos]);
  };

  /**
   * Función para cambiar el estado de completado de una tarea
   * @param {number} id - ID de la tarea a modificar
   */
  const toggleComplete = (id) => {
    setTodos(
      // Mapeamos todas las tareas
      todos.map(todo =>
        // Si encontramos la tarea con el ID, cambiamos su estado 'completed'
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        // ...todo copia todas las propiedades de la tarea existente
        // !todo.completed invierte el valor actual de 'completed'
      )
    );
  };

  /**
   * Función para eliminar una tarea
   * @param {number} id - ID de la tarea a eliminar
   */
  const deleteTodo = (id) => {
    // Filtramos el array para mantener solo las tareas cuyo ID no coincida
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Renderizado del componente
  return (
    <div className="App">
      {/* Título principal de la aplicación */}
      <h1>Lista de Tareas</h1>

      {/*
       * Componente TodoForm
       * - Le pasamos la función addTodo como prop
       * - Será llamada cuando el usuario envíe una nueva tarea
       */}
      <TodoForm addTodo={addTodo} />

      {/*
       * Componente TodoList
       * - todos: Lista completa de tareas
       * - toggleComplete: Función para marcar/desmarcar tareas
       * - deleteTodo: Función para eliminar tareas
       */}
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otros archivos
export default App;