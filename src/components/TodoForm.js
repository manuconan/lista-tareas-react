import React, { useState } from "react";

function TodoForm({ addTodo }) {
  // Estado que guarda el texto ingresado por el usuario
  const [text, setText] = useState("");

  /**
   * Maneja el cambio en el campo de texto
   * @param {object} event - El evento del cambio en el input
   */
  const handleChange = (event) => {
    setText(event.target.value); // Actualiza el estado 'text' con el valor del input
  };

  /**
   * Maneja el envío del formulario
   * @param {object} event - El evento al enviar el formulario
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    if (text.trim()) { // Si el texto no está vacío
      addTodo(text); // Llama la función addTodo pasada como prop para agregar la nueva tarea
      setText(""); // Limpia el campo de texto después de agregar la tarea
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text} // El valor del input es el estado 'text'
        onChange={handleChange} // Cada vez que el usuario escribe, se actualiza el estado
        placeholder="Agregar tarea" // Texto en el campo de input cuando está vacío
      />
      <button type="submit">Agregar</button> {/* Botón para agregar la tarea */}
    </form>
  );
}

export default TodoForm;
