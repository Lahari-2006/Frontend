import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    toast({
      title: data.message || "Check your email for reset link",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        <p className="text-sm text-center text-gray-600 mt-1">
          Enter your email to receive reset link
        </p>

        {/* FORM FIXED HERE */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="you@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* UPDATED BUTTON */}
          <Button className="w-full" type="submit">
            Send Reset Link
          </Button>
        </form>

      </div>
    </div>
  );
}
