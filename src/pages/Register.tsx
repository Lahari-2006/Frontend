import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    jobTitle: "",
    dob: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      setStep(2);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/verify-otp", { email: formData.email, otp });
      navigate("/auth/login");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/30">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1679923906285-386991e8d862?q=80&w=2070&auto=format&fit=crop')",
        }}
      ></div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1b33]/40 via-black/20 to-[#0c2d4a]/40"></div>

     

      {/* Card Container */}
      <div
        className="
          relative z-10 w-full max-w-xl p-12 mx-4
          bg-white/80 backdrop-blur-2xl
          rounded-3xl border border-gray-200/60
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          hover:shadow-[0_6px_26px_rgba(0,0,0,0.12)]
          transition-all duration-300
        "
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#1446A0]">
            {step === 1 ? "Create an Account" : "Verify Your Email"}
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            {step === 1
              ? "Join RB Financial Consultancy to empower your financial decisions with expert, trusted guidance."
              : "Enter the OTP sent to your email to complete registration."}
          </p>
        </div>

        {/* Registration Form */}
        {step === 1 ? (
          <form
            onSubmit={handleRegister}
            className="space-y-6 animate-[slideUp_0.45s_ease]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Financial Analyst"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  placeholder="your@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 **********"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                  focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center bg-red-100 py-2 rounded-lg shadow-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1446A0] hover:bg-[#0e3578] text-white font-semibold py-3 rounded-xl 
              transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleOtpVerify}
            className="space-y-6 animate-[slideUp_0.45s_ease]"
          >
            <label className="block text-sm font-medium text-gray-700 text-center">
              Enter OTP
            </label>
            <input
              type="text"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center tracking-widest 
              focus:border-[#1446A0] focus:ring-2 focus:ring-[#1446A0]/30 transition"
            />

            {error && (
              <p className="text-red-600 text-sm text-center bg-red-100 py-2 rounded-lg shadow-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl 
              transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-gray-700">
          Already have an account?
          <Link to="/auth/login" className="text-[#1446A0] font-semibold ml-1">
            Login
          </Link>
        </div>

        {/* 🏠 Bottom Home Link */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center justify-center gap-1"
          >
            <Home size={16} />
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}