// src/pages/Dashboard/Overview.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Chart from "../../components/Chart";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import api from "../../api/axios";

export default function Overview() {
  const [summary, setSummary] = useState({
    employees: 0,
    sessions: 0,
    active: 0,
    chartData: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/reports/summary");
        const data = res.data;
        setSummary({
          employees: data.totalEmployees,
          sessions: data.totalSessions,
          active: data.activeSessions,
          chartData: data.chartData || [],
        });
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <Card title="Total Employees" value={summary.employees} />
            <Card title="Active Sessions" value={summary.active} />
            <Card title="Completed Sessions" value={summary.sessions} />
          </div>

          {summary.chartData.length > 0 && (
            <Chart data={summary.chartData} title="Employee Activity Over Last 7 Days" />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
