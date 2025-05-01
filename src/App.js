import './App.css';
// Importamos React y el hook useState para manejar el estado del componente
import React, { useState } from 'react';

// Importamos los componentes que crearemos: el formulario para agregar tareas y la lista que las muestra
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// Componente principal de la aplicación.
function App() {
  const [todos, setTodos] = useState([]);  // Esto debe estar aquí

  // Estado que almacena el array de tareas (cada una será un objeto con id, texto y estado de completado)
  const addTodo = (text) => {
    // Creamos una nueva tarea como objeto
    const newTodo = {
      id: Date.now(),    // Generamos un ID Único usando marca de tiempo actual
      text,             // Texto de la tarea (lo recibe como parámetro).
      completed: false, // Estado inicial de la tarea (no completada)
    };

    // Actualizamos el estado, agregando la nueva tarea al inicio del array
    setTodos([newTodo, ...todos]);
  };

  // JSX que se renderiza en pantalla
  return (
    <div className="App">
      {/* Título principal */}
      <h1>Lista de Tareas</h1>

      {/* Componente del formulario para añadir nuevas tareas.
          Le pasamos la función addTodo como prop */}
      <TodoForm addTodo={addTodo} />

      {/* Componente para mostrar la lista de tareas */}
      <TodoList todos={todos} />
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en index.js
export default App;
