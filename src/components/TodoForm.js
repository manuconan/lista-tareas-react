/**Este componente muestra un input y un botón,
 * guarda la que el usuario escribe en un estado local (input),
 * cuando se envía el formulario(handleSubmit),llama a la función
 * del componente padre(App) para agregar esa nueva tarea. 
 */

import React, { useState } from "react";

//Componente para el formulario de entrada de tareas
function TodoForm({ addTodo }) {
    //Estado Local para guardar el texto que el usuario escribe
    const [input, setInput] = useState("");

    //Maneja el cambio del input (cada vez que se escribe algo)
    const handleChange = (e) => {
        setInput(e.target.value);//actualiza el estado con lo que se escribe
    };

    //Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();//Evita que se recargue la página
        if (input.trim()) {
            addTodo(input); //Llama a la función que viene desde App para agregar la tarea
            setInput("")//  //Limpia el input después de agregar
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe una tarea"
                value={input}
                onChange={handleChange}
            />
            <button type="submit">Agregar</button>
        </form>
    );
}
export default TodoForm;
