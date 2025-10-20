// src/api/breaks.js
import api from "./axios";

export const startBreak = (userId) => api.post("/breaks/start", null, { params: { userId } });
export const endBreak = (breakId) => api.post("/breaks/end", null, { params: { breakId } });
export const getBreaks = (userId) => api.get("/breaks", { params: { userId } });
