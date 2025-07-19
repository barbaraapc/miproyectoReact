import { useState } from "react";

const Form = ({ addTask }) => {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Importante");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTask(input.trim(), priority);

    setInput("");
    setPriority("Importante");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Muy importante">Muy importante</option>
        <option value="Importante">Importante</option>
      </select>

      <button type="submit" className="add-button">
        Agregar
      </button>
    </form>
  );
};

export default Form;
