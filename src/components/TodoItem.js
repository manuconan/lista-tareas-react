// src/components/TodoItem.js
import React from 'react';
import DateFormatter from './DateFormatter';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(todo.id)}>
        {todo.text}
      </span>
      <DateFormatter date={todo.createdAt} format="DD/MM/YYYY HH:mm" />
      <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
    </div>
  );
}

export default TodoItem;

