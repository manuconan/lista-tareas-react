import React, { useState, useEffect } from 'react';
import './App.css'; // Importamos el archivo de estilos CSS
import TodoForm from './components/TodoForm'; // Componente para agregar nuevas tareas
import TodoList from './components/TodoList'; // Componente para mostrar la lista de tareas

/**
 * Componente principal de la aplicación de lista de tareas.
 * Maneja la lógica del estado global, el almacenamiento local y el filtrado de tareas.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa la aplicación completa.
 */
function App() {
  /**
   * Carga las tareas almacenadas previamente en el localStorage del navegador.
   * Si no hay tareas almacenadas, devuelve un array vacío.
   * 
   * @returns {Array} Lista de tareas o un array vacío si no hay datos.
   */
  const loadTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  // Estado para almacenar todas las tareas
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());

  // Estado para almacenar el filtro actual: 'all' | 'completed' | 'pending'
  const [filter, setFilter] = useState('all');

  // Sincroniza las tareas en localStorage cada vez que cambia el estado 'todos'
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Agrega una nueva tarea a la lista.
   * Crea un nuevo objeto de tarea con un ID único basado en timestamp y lo agrega al inicio de la lista.
   * 
   * @param {string} text - El texto de la nueva tarea.
   */
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Identificador único basado en timestamp
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]); // Añade la nueva tarea al principio de la lista
  };

  /**
   * Alterna el estado de completado de una tarea.
   * Cambia el valor de 'completed' entre true/false según el ID de la tarea.
   * 
   * @param {number} id - El ID de la tarea a actualizar.
   */
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Elimina una tarea de la lista.
   * Filtra la lista de tareas, eliminando la tarea cuyo ID coincida con el ID pasado.
   * 
   * @param {number} id - El ID de la tarea a eliminar.
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * Filtra las tareas de acuerdo al filtro seleccionado.
   * Dependiendo del filtro activo ('all', 'completed', 'pending'), devuelve las tareas correspondientes.
   * 
   * @type {Array} filteredTodos - Lista de tareas filtradas según el estado de 'filter'.
   */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'pending') {
      return !todo.completed;
    }
    return true; // Mostrar todas las tareas
  });

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>

      {/* Formulario para ingresar nuevas tareas */}
      <TodoForm addTodo={addTodo} />

      {/* Botones para cambiar el filtro de tareas */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      {/* Lista de tareas filtradas */}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
