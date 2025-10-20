// src/api/monitor.js
import api from "./axios";

export const startSession = (userId) => api.post("/monitor/start-session", null, { params: { userId } });
export const endSession = (sessionId) => api.post("/monitor/end-session", null, { params: { sessionId } });
export const uploadScreenshot = (userId, sessionId, file) => {
  const form = new FormData();
  form.append("file", file);
  form.append("userId", userId);
  form.append("sessionId", sessionId);
  return api.post("/monitor/screenshot", form, { headers: { "Content-Type": "multipart/form-data" } });
};
export const logActivity = (payload) => api.post("/monitor/activity", payload);
