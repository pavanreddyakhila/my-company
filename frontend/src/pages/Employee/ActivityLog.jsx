// src/pages/Employee/ActivityLog.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MonitorContext } from "../../context/MonitorContext";
import { logActivity, uploadScreenshot } from "../../api/monitor";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function ActivityLog() {
  const { user } = useContext(AuthContext);
  const { currentSession, pushActivity } = useContext(MonitorContext);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogActivity = async () => {
    if (!currentSession) return alert("Start a session first.");
    const payload = {
      userId: user.id,
      sessionId: currentSession.sessionId,
      activityType: notes || "manual-note",
      timestamp: new Date().toISOString(),
    };
    setLoading(true);
    try {
      await logActivity(payload);
      pushActivity(payload);
      setNotes("");
      alert("Activity logged successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to log activity.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadScreenshot = async () => {
    if (!file || !currentSession) return alert("Select a file and start session first.");
    setLoading(true);
    try {
      await uploadScreenshot(user.id, currentSession.sessionId, file);
      alert("Screenshot uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload screenshot.");
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
          <h2 className="text-2xl font-bold mb-4">Activity Log</h2>

          <div className="mb-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg"
              placeholder="What are you working on?"
            />
            <button
              onClick={handleLogActivity}
              disabled={loading}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Log Activity
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Upload Screenshot</h3>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            <button
              onClick={handleUploadScreenshot}
              disabled={!file || loading}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Upload
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
