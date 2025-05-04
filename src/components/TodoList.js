// src/components/TodoList.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import '../App.css'; // Asegúrate de que esta ruta sea correcta

function TodoList({ todos, toggleComplete, deleteTodo }) {
  /**
   * Confirma con el usuario antes de eliminar una tarea
   *
   * @param {string|number} id - ID de la tarea a eliminar
   */
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      deleteTodo(id);
    }
  };

  if (todos.length === 0) {
    return <p className="no-tasks-message">No hay tareas aún</p>;
  }

  return (
    <ol className="todo-list">
      <TransitionGroup component={null}>
        {todos.map((todo, index) => {
          const nodeRef = React.createRef(); // ← useRef dentro del map no funciona bien

          return (
            <CSSTransition
              key={todo.id}
              nodeRef={nodeRef}
              timeout={300}
              classNames="todo-item" // ← Debe coincidir con el CSS
              unmountOnExit
            >
              <div ref={nodeRef}>
                <TodoItem
                  todo={todo}
                  index={index + 1}
                  toggleComplete={toggleComplete}
                  deleteTodo={() => handleDelete(todo.id)}
                />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ol>
  );
}

export default TodoList;
