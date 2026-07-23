// src/components/TodoList.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';

/**
 * Lista animada de entradas de la bitácora. Pide confirmación antes de borrar.
 */
function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta tarea? Esta acción no se puede deshacer.')) {
      deleteTodo(id);
    }
  };

  if (todos.length === 0) {
    return <p className="empty-state">No hay tareas en esta vista. Añade una arriba para empezar.</p>;
  }

  return (
    <ol className="entry-list">
      <TransitionGroup component={null}>
        {todos.map((todo) => {
          const nodeRef = React.createRef();

          return (
            <CSSTransition key={todo.id} nodeRef={nodeRef} timeout={250} classNames="entry-fade" unmountOnExit>
              <div ref={nodeRef}>
                <TodoItem
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={handleDelete}
                  editTodo={editTodo}
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
