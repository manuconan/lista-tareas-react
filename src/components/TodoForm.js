import React, { useState } from "react";

/**
 * Componente TodoForm
 * Renderiza un formulario que permite al usuario ingresar una nueva tarea.
 * Llama a la función `addTodo` proporcionada como prop al enviar una nueva tarea.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.addTodo - Función para agregar una nueva tarea
 */
function TodoForm({ addTodo }) {
  // Estado local para almacenar el texto ingresado en el input
  const [text, setText] = useState("");

  /**
   * Maneja el evento de cambio en el campo de texto.
   * Actualiza el estado local con el valor ingresado por el usuario.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio del input
   */
  const handleChange = (event) => {
    setText(event.target.value);
  };

  /**
   * Maneja el evento de envío del formulario.
   * Si el texto no está vacío, llama a `addTodo` y limpia el input.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Evento de envío del formulario
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (text.trim()) {
      addTodo(text);      // Agrega la tarea usando la función proporcionada
      setText("");        // Limpia el campo de texto
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Agregar tarea"
        aria-label="Campo para nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TodoForm;
