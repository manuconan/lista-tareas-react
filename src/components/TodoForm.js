import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input); // ✅ Llama a la función de App.js
      setInput(''); // 🧹 Limpia el input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe una tarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TodoForm;