import { useState } from "react";
import api from "../../lib/api";
import { saveAuth } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/api/auth/admin/login", { username, password });
      saveAuth({ token: data.token, role: "admin" });
      navigate("/admin");
    } catch (e) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Admin Login</h2>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <input className="w-full border p-2 rounded" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-gray-900 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
