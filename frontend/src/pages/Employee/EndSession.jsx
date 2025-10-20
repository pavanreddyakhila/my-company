// src/pages/Employee/EndSession.jsx
import React, { useContext, useState } from "react";
import { MonitorContext } from "../../context/MonitorContext";
import { endSession } from "../../api/monitor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function EndSession() {
  const { currentSession, end } = useContext(MonitorContext);
  const [loading, setLoading] = useState(false);

  const handleEnd = async () => {
    if (!currentSession) return alert("No active session to end");
    setLoading(true);
    try {
      await endSession(currentSession.sessionId);
      end();
      alert("Session ended successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to end session");
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
          <h2 className="text-2xl font-bold mb-4">End Work Session</h2>
          <p className="mb-4">Session ID: {currentSession?.sessionId ?? "No active session"}</p>
          <button
            onClick={handleEnd}
            disabled={!currentSession || loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold ${
              loading || !currentSession ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Ending..." : "End Session"}
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}
