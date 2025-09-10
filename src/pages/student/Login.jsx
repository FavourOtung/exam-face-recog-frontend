import { useState } from "react";
import api from "../../lib/api";
import { saveAuth } from "../../lib/auth";
import { Link, useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/api/auth/student/login", { matric, password });
      saveAuth({ token: data.token, role: "student", profile: data.profile });
      navigate("/student/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-white flex">
      <img src="/student3.jpg" className="lg:w-[50%] sm:w-0 w-0 fixed h-[100vh] object-cover"/>
      <form onSubmit={submit} className="max-w-3xl mx-auto bg-slate-800 text-white p-16 lg:ml-[50%] lg:w-1/2 w-full shadow space-y-6 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-orange-500">Student Login .</h2>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <label className="block text-sm mb-1">Enter Matric Number:</label>
        <input className="w-full border-b p-2 outline-none" value={matric} onChange={(e)=>setMatric(e.target.value)} />
        <label className="block text-sm mb-1">Enter Password:</label>
        <input className="w-full border-b p-2 outline-none" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-orange-500 text-white py-2 rounded">Login</button>
        <p className="text-sm text-center">
          No account? <Link to="/student/register" className="text-gray-400">Register</Link>
        </p>
      </form>
    </div>
  );
}
