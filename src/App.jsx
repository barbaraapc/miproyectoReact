import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";  // npm install uuid
import Form from "./components/Form";
import Task from "./components/Task";
import CompletedTasks from "./components/completedTasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("Pendientes");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Crear nueva tarea con id único
  const addTask = (text, priority) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "Pendientes" ? !task.completed : task.completed
  );

  return (
    <div className="container">
      <div className="panels">
        <div className="panel">
          <h2>Lista de Tareas</h2>

          <Form addTask={addTask} />

          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Pendientes">Pendientes</option>
              <option value="Completadas">Completadas</option>
            </select>
          </div>

          {filteredTasks.length === 0 ? (
            <p>No hay tareas para mostrar.</p>
          ) : (
            filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))
          )}
        </div>

        <div className="panel">
          <h2>Tareas Completadas</h2>
          <CompletedTasks
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
