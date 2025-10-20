import React, { createContext, useState } from "react";

export const MonitorContext = createContext();

export const MonitorProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [activities, setActivities] = useState([]);

  const start = (session) => setCurrentSession(session);
  const end = () => setCurrentSession(null);
  const pushActivity = (a) => setActivities(prev => [...prev, a]);

  return (
    <MonitorContext.Provider value={{ currentSession, activities, start, end, pushActivity }}>
      {children}
    </MonitorContext.Provider>
  );
};
