const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000; // Puerto donde el servidor escuchará

app.use(express.json()); // Esto es necesario para leer los datos en formato JSON

const dataFilePath = path.join(__dirname, 'data.json'); // Ruta donde guardaremos nuestras tareas

// Obtener todas las tareas
app.get('/todos', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }
        const todos = JSON.parse(data);
        res.json(todos); // Devolvemos las tareas al frontend
    });
});

// Agregar una nueva tarea
app.post('/todos', (req, res) => {
    const newTodo = req.body; // Obtenemos la tarea que viene en el cuerpo de la solicitud (el frontend envía la nueva tarea)

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }
        const todos = JSON.parse(data); // Convertimos el contenido del archivo a JSON
        todos.push(newTodo); // Agregamos la nueva tarea a la lista de tareas

        // Guardamos las tareas de nuevo en el archivo
        fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo.');
            }
            res.status(201).json(newTodo); // Devolvemos la tarea agregada al frontend
        });
    });
});

// Eliminar una tarea
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id; // Obtenemos el ID de la tarea que queremos eliminar

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }
        let todos = JSON.parse(data); // Leemos las tareas desde el archivo
        todos = todos.filter(todo => todo.id !== id); // Filtramos la tarea con el ID que queremos eliminar

        // Guardamos las tareas actualizadas en el archivo
        fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo.');
            }
            res.status(200).send('Tarea eliminada.');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
