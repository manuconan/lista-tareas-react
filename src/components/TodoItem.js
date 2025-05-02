// Importamos React para poder usar JSX
import React from 'react';

/**
 * Componente que representa una tarea individual en la lista
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.todo - Objeto que representa la tarea (contiene id, text, completed)
 * @param {number} props.index - Número de índice de la tarea (para la numeración)
 * @param {Function} props.toggleComplete - Función para marcar/desmarcar como completada
 * @param {Function} props.deleteTodo - Función para eliminar la tarea
 */
function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
    return (
        // Elemento <li> que representa cada tarea
        <li
            // Evento que se dispara al hacer clic en la tarea (marca/desmarca como completada)
            onClick={() => toggleComplete(todo.id)}
            // Estilos inline para el elemento de la tarea:
            style={{
                cursor: 'pointer', // Cambia el cursor a "mano" al pasar el mouse
                display: 'flex', // Usa flexbox para el layout
                alignItems: 'center', // Centra verticalmente los elementos
                padding: '10px', // Espaciado interno
                margin: '5px 0', // Margen superior e inferior
                backgroundColor: '#f5f5f5', // Color de fondo
                borderRadius: '4px' // Bordes redondeados
            }}
        >
            {/* Contenedor del número de índice de la tarea */}
            <span
                style={{
                    marginRight: '10px', // Espacio a la derecha del número
                    fontWeight: 'bold', // Texto en negrita
                    color: '#666', // Color gris oscuro
                    minWidth: '25px', // Ancho mínimo para alinear números de 1 y 2 dígitos
                    textDecoration: todo.completed ? 'line-through' : 'none', // Tacha el texto si está completada

                }}
            >
                {index}. {/* Muestra el número de índice seguido de un punto */}
            </span>

            {/* Texto de la tarea */}
            <span style={{ flexGrow: 1 }}>
                {todo.text} {/* Muestra el contenido de la tarea */}
            </span>

            {/* Botón para eliminar la tarea */}
            <button
                style={{
                    background: 'transparent', // Fondo transparente
                    border: 'none', // Sin bordes
                    cursor: 'pointer', // Cursor en forma de mano
                    fontSize: '20px', // Tamaño del icono
                    color: 'red', // Color rojo para el icono
                    marginLeft: '15px' // Margen a la izquierda
                }}
                // Evento al hacer clic en el botón
                onClick={(e) => {
                    e.stopPropagation(); // Evita que el evento se propague al <li>
                    deleteTodo(todo.id); // Llama a la función para eliminar la tarea
                }}
                aria-label="Eliminar tarea" // Mejora accesibilidad para lectores de pantalla
            >
                ❌ {/* Icono de cruz para representar "eliminar" */}
            </button>
        </li>
    );
}

// Exportamos el componente para que pueda ser usado en otros archivos
export default TodoItem;