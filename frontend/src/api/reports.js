// src/api/reports.js
import api from "./axios";

export const getSummary = () => api.get("/reports/summary");
export const getAllReports = () => api.get("/reports/all");
export const getUserReports = (userId) => api.get("/reports/user", { params: { userId } });
