import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ data, title }) => (
  <div className="bg-white shadow rounded p-4 mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="hours" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
