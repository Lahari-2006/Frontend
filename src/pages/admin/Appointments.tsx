import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import API from "../api";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Appointment {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  service_type: string;
  date: string;
  time?: string;
  message?: string;
  status: AppointmentStatus;
  created_at?: string;
}

const PAGE_SIZE = 10;

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get<Appointment[]>("/admin/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Helpers
  const getStatusClasses = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: string) => {
    // if date is ISO, try formatting; else return as is
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      return d.toLocaleDateString();
    } catch {
      return date;
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return "—";
    // if in HH:MM we can just show it
    return time;
  };

  // Filter + search
  const filteredAppointments = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return appointments.filter((a) => {
      const matchesStatus =
        statusFilter === "all" ? true : a.status === statusFilter;

      const matchesSearch =
        term.length === 0
          ? true
          : (a.name ?? "").toLowerCase().includes(term) ||
            a.email.toLowerCase().includes(term) ||
            a.service_type.toLowerCase().includes(term) ||
            (a.phone ?? "").toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [appointments, searchTerm, statusFilter]);

  // Pagination
  const pageCount = Math.max(
    1,
    Math.ceil(filteredAppointments.length / PAGE_SIZE)
  );

  const currentPageAppointments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAppointments.slice(start, start + PAGE_SIZE);
  }, [filteredAppointments, currentPage]);

  const handleStatusChange = async (
    id: string,
    status: AppointmentStatus
  ) => {
    try {
      await API.put(`/admin/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this appointment? This action cannot be undone."
      )
    )
      return;
    try {
      await API.delete(`/admin/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // If filters change, go back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Appointments</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all client appointment requests.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name, email, service..."
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as AppointmentStatus | "all")
              }
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-md rounded-xl p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading appointments...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500">
              No appointments found with current filters.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-2 px-2">Name</th>
                      <th className="px-2">Email</th>
                      <th className="px-2">Phone</th>
                      <th className="px-2">Service</th>
                      <th className="px-2">Date</th>
                      <th className="px-2">Time</th>
                      <th className="px-2">Status</th>
                      <th className="px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageAppointments.map((a) => (
                      <tr key={a.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 align-top">
                          <div className="font-medium">
                            {a.name || "—"}
                          </div>
                          {a.message && (
                            <div className="text-xs text-gray-500 mt-1 max-w-xs line-clamp-2">
                              {a.message}
                            </div>
                          )}
                        </td>
                        <td className="px-2 align-top">{a.email}</td>
                        <td className="px-2 align-top">{a.phone || "—"}</td>
                        <td className="px-2 align-top">{a.service_type}</td>
                        <td className="px-2 align-top">
                          {formatDate(a.date)}
                        </td>
                        <td className="px-2 align-top">
                          {formatTime(a.time)}
                        </td>
                        <td className="px-2 align-top">
                          <span
                            className={
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border " +
                              getStatusClasses(a.status)
                            }
                          >
                            {a.status.charAt(0).toUpperCase() +
                              a.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-2 py-2 align-top text-right">
                          <div className="flex flex-col items-end gap-2">
                            <select
                              value={a.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  a.id,
                                  e.target.value as AppointmentStatus
                                )
                              }
                              className="border rounded px-2 py-1 text-xs capitalize bg-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 text-sm">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {currentPageAppointments.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAppointments.length}
                  </span>{" "}
                  appointments
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded border text-xs bg-white disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-xs text-gray-600">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    className="px-3 py-1 rounded border text-xs bg-white disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(pageCount, p + 1)
                      )
                    }
                    disabled={currentPage === pageCount}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
