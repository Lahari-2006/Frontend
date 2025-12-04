import React, { useState } from "react";
import API from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userRole", response.data.role);
      navigate(response.data.role === "admin" ? "/admin/dashboard" : "/app");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌆 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=1170&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 bg-white/85 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-lg p-10 border border-white/40">

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Login to manage your accounts.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-blue-500 transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-blue-500 transition bg-white"
            />
          </div>

          {/* ⭐ Forgot Password Link */}
          <div className="text-right -mt-3">
            <Link
              to="/auth/forgot-password"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-100 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md disabled:opacity-50"
          >
            {loading ? "Signing in.." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
