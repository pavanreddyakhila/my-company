import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar bg-blue-600 text-white flex justify-between items-center px-6 py-3 shadow-lg">
      <div className="logo text-2xl font-bold">
        <Link to="/" className="hover:text-gray-200">Employee Monitor</Link>
      </div>

      <div className="menu flex items-center gap-4">
        <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
        <Link to="/profile" className="hover:text-gray-200">Profile</Link>
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-200">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
