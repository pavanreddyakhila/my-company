import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
    <ul className="space-y-2">
      <li><Link to="/dashboard/overview" className="hover:text-blue-400">Dashboard</Link></li>
      <li><Link to="/dashboard/reports" className="hover:text-blue-400">Reports</Link></li>
      <li><Link to="/dashboard/users" className="hover:text-blue-400">Users</Link></li>
      <li><Link to="/employee/start" className="hover:text-blue-400">Start Session</Link></li>
      <li><Link to="/employee/break" className="hover:text-blue-400">Break</Link></li>
      <li><Link to="/employee/activity" className="hover:text-blue-400">Activity Log</Link></li>
      <li><Link to="/employee/end" className="hover:text-blue-400">End Session</Link></li>
      <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
