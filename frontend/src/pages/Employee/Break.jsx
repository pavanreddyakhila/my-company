// src/pages/Employee/Break.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { startBreak, endBreak } from "../../api/breaks";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function BreakPage() {
  const { user } = useContext(AuthContext);
  const [currentBreakId, setCurrentBreakId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await startBreak(user.id);
      setCurrentBreakId(res.data.id || res.data.breakId || res.data);
      alert("Break started");
    } catch (err) {
      console.error(err);
      alert("Failed to start break");
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = async () => {
    if (!currentBreakId) return alert("No active break");
    setLoading(true);
    try {
      await endBreak(currentBreakId);
      setCurrentBreakId(null);
      alert("Break ended");
    } catch (err) {
      console.error(err);
      alert("Failed to end break");
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
          <h2 className="text-2xl font-bold mb-4">Breaks</h2>
          <p className="mb-4">{currentBreakId ? "Break in progress" : "No active break"}</p>
          {!currentBreakId ? (
            <button
              onClick={handleStart}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Start Break
            </button>
          ) : (
            <button
              onClick={handleEnd}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              End Break
            </button>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
