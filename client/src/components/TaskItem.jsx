import React, { useState } from "react";
import API from "../api/api";

export default function TaskItem({ task, fetchTasks }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const getShortText = (text) => {
    if (!text) return "";
    return text.length > 60 ? text.substring(0, 60) + "..." : text;
  };

  // ✅ Format DATE safely (no timezone conversion)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.slice(0, 10);
  };

  // ✅ Format DATETIME safely (no timezone conversion)
  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const [date, time] = dateString.split(" ");
    const cleanTime = time.split(".")[0];

    return `${date} ${cleanTime}`;
  };

  const updateStatus = async (e) => {
    const newStatus = e.target.value;

    try {
      await API.patch(`/tasks/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch {
      console.error("Update failed");
    }
  };

  const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${task.id}`);
      fetchTasks();
    } catch {
      console.error("Delete failed");
    }
  };

  return (
    <div className={`task ${task.status}`}>
      <div>
        <h3>{task.title}</h3>

        {/* Description */}
        {task.description && (
          <p className="desc">
            {expanded ? task.description : getShortText(task.description)}

            {task.description.length > 60 && (
              <span className="read-more" onClick={toggleDescription}>
                {expanded ? " Show less" : " Read more"}
              </span>
            )}
          </p>
        )}

        {/* Due Date */}
        {task.due_date && (
          <p className="due-date">
            Due: {formatDate(task.due_date)}
          </p>
        )}

        {/* Created & Updated */}
        <p className="time">
          Created: {formatDateTime(task.created_at)} GMT
        </p>

        <p className="time">
          Updated: {formatDateTime(task.updated_at)} GMT
        </p>
      </div>

      <div className="task-actions">
        <select value={task.status} onChange={updateStatus}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}