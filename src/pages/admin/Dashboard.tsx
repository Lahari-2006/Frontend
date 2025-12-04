// src/pages/Admin/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Sidebar from "./Sidebar";

interface Stats {
  users: number;
  inquiries: number;
  appointments: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    inquiries: 0,
    appointments: 0,
  });

  useEffect(() => {
    API.get("/admin/dashboard")
      .then((r) => setStats(r.data))
      .catch((err) => console.error("Failed to load dashboard stats", err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="rounded-2xl bg-white shadow p-5 flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Total Users
            </span>
            <span className="text-3xl font-semibold text-gray-900">
              {stats.users}
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow p-5 flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Inquiries
            </span>
            <span className="text-3xl font-semibold text-gray-900">
              {stats.inquiries}
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow p-5 flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Appointments
            </span>
            <span className="text-3xl font-semibold text-gray-900">
              {stats.appointments}
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/admin/users"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            View Inquiries
          </Link>
          <Link
            to="/admin/appointments"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            Manage Appointments
          </Link>
        </div>
      </main>
    </div>
  );
}
