// src/pages/Employee/StartSession.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MonitorContext } from "../../context/MonitorContext";
import { startSession } from "../../api/monitor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function StartSession() {
  const { user } = useContext(AuthContext);
  const { start } = useContext(MonitorContext);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!user) return alert("Login required to start a session");
    setLoading(true);
    try {
      const res = await startSession(user.id);
      start(res.data);
      alert("Session started successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Start Work Session</h2>
          <p className="mb-4">Click the button below to begin monitoring your work session.</p>
          <button
            onClick={handleStart}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Starting..." : "Start Work Session"}
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}
