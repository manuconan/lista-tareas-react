import './App.css';
import React, { useState } from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  // Estado que almacena todas las tareas
  const [todos, setTodos] = useState([]);

  /**
   * Función para agregar una nueva tarea
   * @param {string} text - El texto de la nueva tarea a agregar
   */
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),  // Usamos la marca de tiempo para que cada tarea tenga un ID único
      text,            // El texto de la tarea es el que pasa el usuario
      completed: false // La tarea comienza sin estar completada
    };

    // Actualizamos el estado 'todos' agregando la nueva tarea al principio de la lista
    setTodos([newTodo, ...todos]);
  };

  /**
   * Función para cambiar el estado de completado de una tarea
   * @param {number} id - El ID de la tarea que queremos marcar/desmarcar como completada
   */
  const toggleComplete = (id) => {
    // Mapeamos la lista de tareas y actualizamos la tarea con el ID correspondiente
    setTodos(
      todos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed } // Si la tarea es la correcta, invertimos su estado 'completed'
          : todo // Si no es la tarea, la dejamos tal cual está
      )
    );
  };

  /**
   * Función para eliminar una tarea de la lista
   * @param {number} id - El ID de la tarea que queremos eliminar
   */
  const deleteTodo = (id) => {
    // Filtramos las tareas para eliminar la que tenga el ID igual al pasado
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>

      {/* Componente para agregar nuevas tareas */}
      <TodoForm addTodo={addTodo} />

      {/* Componente para mostrar todas las tareas */}
      <TodoList 
        todos={todos}         // Lista de tareas
        toggleComplete={toggleComplete} // Función para marcar/desmarcar tareas
        deleteTodo={deleteTodo} // Función para eliminar tareas
      />
    </div>
  );
}

export default App;
