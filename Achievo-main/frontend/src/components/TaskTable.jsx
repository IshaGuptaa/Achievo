import React, { useState, useEffect } from "react";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        // Remove the deleted task from the state
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Task Table</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Serial No</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Task Type</th>
              <th className="px-4 py-2">Created Date</th>
              {/* <th className="px-4 py-2">Created Time</th> */}
              <th className="px-4 py-2">Updated Date</th>
              {/* <th className="px-4 py-2">Updated Time</th> */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task._id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{task._id.substr(0, 8)}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.taskType}</td>
                <td className="border px-4 py-2">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="border px-4 py-2">
                  {new Date(task.createdAt).toLocaleTimeString()}
                </td> */}
                <td className="border px-4 py-2">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </td>
                {/* <td className="border px-4 py-2">
                  {new Date(task.updatedAt).toLocaleTimeString()}
                </td> */}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
