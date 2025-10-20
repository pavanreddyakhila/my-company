// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

// Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Overview from "./pages/Dashboard/Overview";
import Reports from "./pages/Dashboard/Reports";
import Users from "./pages/Dashboard/Users";
import StartSession from "./pages/Employee/StartSession";
import EndSession from "./pages/Employee/EndSession";
import BreakPage from "./pages/Employee/Break";
import ActivityLog from "./pages/Employee/ActivityLog";
import Profile from "./pages/Misc/Profile";
import NotFound from "./pages/Misc/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        }
      />
      <Route path="/dashboard/overview" element={<PrivateRoute><Overview /></PrivateRoute>} />
      <Route path="/dashboard/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      <Route path="/dashboard/users" element={<PrivateRoute><Users /></PrivateRoute>} />

      <Route path="/employee/start" element={<PrivateRoute><StartSession /></PrivateRoute>} />
      <Route path="/employee/end" element={<PrivateRoute><EndSession /></PrivateRoute>} />
      <Route path="/employee/break" element={<PrivateRoute><BreakPage /></PrivateRoute>} />
      <Route path="/employee/activity" element={<PrivateRoute><ActivityLog /></PrivateRoute>} />

      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
