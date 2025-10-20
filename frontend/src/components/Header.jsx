import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-bold">Employee Monitoring System</h1>
      {user && (
        <div className="flex items-center gap-3">
          <span>{user.username}</span>
          <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
