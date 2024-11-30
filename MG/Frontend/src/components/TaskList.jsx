import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?page=${currentPage}&limit=10`);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="w-[35rem] mx-auto p-8 bg-[#f9f9f9] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">Tasks</h2>
      <Link
        to="/tasks/new"
        className="inline-block mb-6 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#1E3A8A] transition"
      >
        Create New Task
      </Link>
      <ul className="space-y-6">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`border-2 rounded-lg p-6 ${
              task.priority === "high"
                ? "border-red-500"
                : task.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            } bg-white shadow-sm hover:shadow-md transition`}
          >
            <Link
              to={`/tasks/${task._id}`}
              className="text-xl font-semibold text-[#1E3A8A] hover:text-[#3B82F6] transition"
            >
              {task.title}
            </Link>
            <p className="text-sm my-3 text-[#4B5563]">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-4 text-[#4B5563] capitalize">
              Status:
              <span
                className={`m-2 px-3 py-[0.2rem] rounded-md text-white ${
                  task.status === "pending"
                    ? "bg-red-600 text-red-100"
                    : task.status === "completed"
                    ? "bg-green-600 text-green-100"
                    : "bg-gray-400 text-gray-100"
                }`}
              >
                {task.status}
              </span>
            </p>
            <div className="flex justify-between items-center mt-5">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="px-4 py-2 border-2 border-[#3B82F6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-lg text-white ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#f84525] hover:bg-[#D93B1A]"
          }`}
        >
          Previous
        </button>
        <span className="text-lg text-[#4B5563]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 rounded-lg text-white ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#f84525] hover:bg-[#D93B1A]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
