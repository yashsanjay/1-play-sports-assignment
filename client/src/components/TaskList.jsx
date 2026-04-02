import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, fetchTasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
}