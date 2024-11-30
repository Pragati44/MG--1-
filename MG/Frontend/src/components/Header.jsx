import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header>
      <nav className="px-20 py-6 gap-8 flex justify-end items-center bg-[#ffffff] shadow-md">
        {isAuthenticated ? (
          <>
            <Link
              to="/tasks"
              className="text-[#3B82F6] hover:text-[#2563EB] transition"
            >
              Tasks
            </Link>
            <Link
              to="/tasks/new"
              className="text-[#3B82F6] hover:text-[#2563EB] transition"
            >
              Create Task
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#3B82F6] hover:bg-[#abadaf] transition px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg shadow-xl text-[#3B82F6] hover:text-[#2563EB] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg shadow-xl text-[#3B82F6] hover:text-[#2563EB] transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
