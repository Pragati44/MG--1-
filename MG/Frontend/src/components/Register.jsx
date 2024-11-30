import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { username, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-[30rem] mx-auto p-8 bg-[#f9f9f9] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-6">Register Here</h2>
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

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#3B82F6] text-white rounded-md font-semibold text-lg uppercase tracking-widest hover:bg-[#3B82F6] focus:bg-gray-700 transition duration-200"
        >
          Register
        </button>
      </form>

      <p className="text-sm font-mono mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#3B82F6] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
