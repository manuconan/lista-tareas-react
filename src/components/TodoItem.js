
/**Recibe como prop un objeto "todo"(una tarea)que viene desde TodoList
 * muestra solo el texto de la tarea (todo.text) dentro de un <li>
 */
import React from "react";

// Componente que representa una tarea individual
function TodoItem({todo}){
    return(
        <li>
            {todo.text}
        </li>
    );
}
export default TodoItem;