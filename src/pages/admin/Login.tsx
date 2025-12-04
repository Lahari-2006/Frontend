import React, {useState} from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){
  const [email,setEmail] = useState(""); 
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const nav = useNavigate();

  const submit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setError("");
    try{
      const res = await API.post("/auth/login", { email, password });
      if(res.data.role !== "admin"){
        setError("Administrator access required.");
        return;
      }
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("userRole", res.data.role);
      nav("/admin/dashboard");
    }catch(err:any){
      const detail = err?.response?.data?.detail ?? "Login failed";
      setError(detail);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <form onSubmit={submit} className="space-y-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="Email" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="Password" required type="password"/>
          <button className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  )
}
