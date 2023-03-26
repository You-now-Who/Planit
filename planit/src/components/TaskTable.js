import React from "react";

function TaskTable({ tasks, toggleCompleted, deleteTask }) {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th className="text-lg font-medium">Title</th>
          <th className="text-lg font-medium">Description</th>
          <th className="text-lg font-medium">Due Date</th>
          <th className="text-lg font-medium">Completed</th>
          <th className="text-lg font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
            </td>
            <td>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
