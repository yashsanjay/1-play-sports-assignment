import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
        dueDate: dueDate || null
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setError("");
      fetchTasks();
    } catch {
      console.error("Create failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Title */}
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.trim()) setError("");
        }}
        placeholder="Enter task title..."
        className={error ? "input-error" : ""}
      />

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)..."
      />

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button>Add Task</button>
    </form>
  );
}