import React from "react";
import { FaBox, FaUsers, FaCreditCard, FaChartLine } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { title: "Total Products", value: 5672, percentage: "+72%", color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Total Customers", value: 3045, percentage: "-40%", color: "text-yellow-600", bg: "bg-yellow-100" },
  { title: "Pending Payments", value: 1055, percentage: "+46%", color: "text-red-600", bg: "bg-red-100" },
];

const barData = [
  { name: "Mon", applications: 90, shortlisted: 70, registered: 80 },
  { name: "Tue", applications: 85, shortlisted: 65, registered: 75 },
  { name: "Wed", applications: 95, shortlisted: 80, registered: 90 },
  { name: "Thu", applications: 88, shortlisted: 75, registered: 85 },
  { name: "Fri", applications: 80, shortlisted: 60, registered: 70 },
  { name: "Sat", applications: 92, shortlisted: 85, registered: 90 },
  { name: "Sun", applications: 98, shortlisted: 90, registered: 95 },
];

const genderData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 40 },
];
const COLORS = ["#8884d8", "#ff6b6b"];

const DashboardOverview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-[Prompt]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard Overview</h1>
        <input
          type="text"
          placeholder="🔍 Search"
          className="p-2 bg-white border rounded-lg shadow-sm focus:outline-none"
        />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${stat.bg}`}>
            <h2 className="text-gray-700 text-lg font-semibold">{stat.title}</h2>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-sm ${stat.color}`}>{stat.percentage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h2 className="text-lg font-bold text-gray-700 mb-3">📊 Weekly Applications</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#8884d8" />
              <Bar dataKey="shortlisted" fill="#ff6b6b" />
              <Bar dataKey="registered" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart (Gender Distribution) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-700 mb-3">📊 Candidates by Gender</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genderData} dataKey="value" outerRadius={80} fill="#8884d8">
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;