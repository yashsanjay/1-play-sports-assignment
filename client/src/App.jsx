import React, { useEffect, useState } from "react";
import API from "./api/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Loading from "./components/Loading";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/tasks?status=${status}&page=${page}&limit=${limit}`
      );
      setTasks(res.data);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, page]);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm fetchTasks={fetchTasks} />

      {/* Filter */}
      <div className="filter">
        <select
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1); // reset page on filter change
          }}
        >
          <option value="">All Tasks</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* States */}
      {loading && <Loading />}
      {error && <p>{error}</p>}

      {/* Task List */}
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={tasks.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}