const Task = ({ task, toggleComplete, deleteTask, editTask }) => {
  const handleEdit = () => {
    const newText = prompt("Editar tarea:", task.text);
    if (newText !== null && newText.trim() !== "") {
      editTask(task.id, newText.trim());
    }
  };

  return (
    <div
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
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </div>
  );
};

export default Task;
