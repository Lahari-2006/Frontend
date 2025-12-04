// src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Mail, Users, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

 
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={18} /> },
  { name: "Appointments", path: "/admin/appointments", icon: <Calendar size={18} /> },
  { name: "Messages", path: "/admin/messages", icon: <Mail size={18} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/admin/login";
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col shadow-lg">
      <div className="text-2xl font-semibold text-center py-6 border-b border-gray-700">
        Admin Panel
      </div>
      <div className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors ${
              location.pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-4 bg-gray-800 hover:bg-red-600 transition-colors"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
