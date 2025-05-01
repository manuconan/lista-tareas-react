/** Este componente recibe un array de tareas "todos"desde App.js
 * usa .map() para recorrer cada tarea y mostrarla usando un componente hijo:
 * todoItem
 * Cada "TodoItem" recibe el objeto de la tarea como prop y un key único(React lo 
 * necestia para identificar el elemento)
 */

import React from "react";
import TodoItem from "./TodoItem";

//Este componente recibe un array de tareas como prop
function TodoList({todos}){// esta entre llaves porque es una forma de desestructuración de props en React y js 
return(
    <ul>
        {todos.map((todo) => (
        // Por cada tarea, renderizamos un componente TodoItem
        // Le pasamos el objeto todo como prop y usamos su id como key
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
);
}
export default TodoList;