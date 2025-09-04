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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Student Login</h2>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <input className="w-full border p-2 rounded" placeholder="Matric" value={matric} onChange={(e)=>setMatric(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="text-sm text-center">
          No account? <Link to="/student/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
