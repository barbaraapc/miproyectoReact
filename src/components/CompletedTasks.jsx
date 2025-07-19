function CompletedTasks({ tasks, toggleComplete, deleteTask }) {
  const completedTasks = tasks.filter(task => task.completed);

  if (completedTasks.length === 0) {
    return <p>No hay tareas completadas.</p>;
  }

  return (
    <>
      {completedTasks.map((task) => (
        <div
          key={task.id}
          className={`task ${
            task.priority === "Muy importante"
              ? "very-important"
              : task.priority === "Importante"
              ? "important"
              : ""
          }`}
        >
          <input
            type="checkbox"
            checked={true}
            onChange={() => toggleComplete(task.id)}
          />
          <span style={{ textDecoration: "line-through" }}>{task.text}</span>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </>
  );
}

export default CompletedTasks;
