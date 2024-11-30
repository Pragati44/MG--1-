import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate("/tasks");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-[30rem] mx-auto p-8 bg-[#f9f9f9] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-6">Login</h2>
      <hr className="h-px mb-6 bg-gray-300 border-0 dark:bg-gray-700" />
      {error && <p className="text-blue-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-[#4B5563]"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-md py-3 px-5 border-2 border-[#3B82F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-[#4B5563]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md py-3 px-5 border-2 border-[#3B82F6] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        <div className="block mt-4">
          <label htmlFor="remember_me" className="flex items-center">
            <input
              type="checkbox"
              id="remember_me"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            />
            <span className="ms-2 text-sm text-gray-600">Remember Me</span>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="ms-4 inline-flex items-center px-6 py-3 bg-[#3B82F6] text-white rounded-md font-semibold text-lg uppercase tracking-widest hover:bg-[#2563EB] transition"
          >
            Login
          </button>
        </div>
      </form>

      <p className="text-sm font-mono mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#3B82F6] hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
