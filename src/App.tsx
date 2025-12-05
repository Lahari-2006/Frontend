// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 🌐 Website pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";

// 🧱 Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Messages from "./pages/admin/Messages";
import Appointments from "./pages/admin/Appointments";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ✅ React Query client
const queryClient = new QueryClient();

/* ────────────────────────────────
   🧩 LAYOUT COMPONENTS
──────────────────────────────── */
function WebsiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}

/* ────────────────────────────────
   🔐 PRIVATE ROUTE for Admin Pages
──────────────────────────────── */
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  if (token && role === "admin") {
    return <>{children}</>;
  }
  return <Navigate to="/admin/login" replace />;
}

function UserPrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  if (token && role !== "admin") {
    return <>{children}</>;
  }
  return <Navigate to="/auth/login" replace />;
}

/* ────────────────────────────────
   🌍 MAIN APP
──────────────────────────────── */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />

          <Routes>
            {/* 🌐 PUBLIC LANDING PAGES - Accessible to everyone */}
            <Route path="/" element={<WebsiteLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* 🔐 AUTH PAGES */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />

            {/* 👤 AUTHENTICATED USER AREA */}
            <Route
  path="/app"
  element={
    <UserPrivateRoute>
      <WebsiteLayout />
    </UserPrivateRoute>
  }
>
  <Route index element={<Home />} />
  <Route path="profile" element={<Profile />} />
</Route>

            {/* 🧱 ADMIN ROUTES */}
            <Route
              path="/admin/login"
              element={
                <AdminLayout>
                  <AdminLogin />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/messages"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Messages />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/appointments"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Appointments />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* ❌ Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}