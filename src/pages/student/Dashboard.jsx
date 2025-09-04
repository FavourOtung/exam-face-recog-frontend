import { useEffect, useState } from "react";
import api from "../../lib/api";
import { getProfile } from "../../lib/auth";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(getProfile());
  const [form, setForm] = useState({
    faculty: profile?.faculty || "",
    department: profile?.department || "",
    level: profile?.level || "",
    courses: (profile?.courses || []).join(", "),
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // refresh from backend (optional)
    (async () => {
      try {
        const { data } = await api.get("/api/student/me");
        setProfile(data.profile);
        setForm({
          faculty: data.profile.faculty || "",
          department: data.profile.department || "",
          level: data.profile.level || "",
          courses: (data.profile.courses || []).join(", "),
        });
      } catch {}
    })();
  }, []);

  const update = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = {
        faculty: form.faculty,
        department: form.department,
        level: form.level,
        courses: form.courses.split(",").map(s=>s.trim()).filter(Boolean),
      };
      await api.put("/api/student/me/academics", payload);
      setMsg("Updated successfully");
    } catch {
      setMsg("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      {profile && <p className="mb-4 text-gray-700">Welcome, {profile.firstName} {profile.lastName} ({profile.matric})</p>}
      <form onSubmit={update} className="bg-white p-6 rounded-xl shadow space-y-3">
        <div>
          <label className="block text-sm">Faculty</label>
          <input className="w-full border p-2 rounded" value={form.faculty} onChange={(e)=>setForm(f=>({...f, faculty:e.target.value}))}/>
        </div>
        <div>
          <label className="block text-sm">Department</label>
          <input className="w-full border p-2 rounded" value={form.department} onChange={(e)=>setForm(f=>({...f, department:e.target.value}))}/>
        </div>
        <div>
          <label className="block text-sm">Level</label>
          <input className="w-full border p-2 rounded" value={form.level} onChange={(e)=>setForm(f=>({...f, level:e.target.value}))}/>
        </div>
        <div>
          <label className="block text-sm">Courses (comma separated)</label>
          <input className="w-full border p-2 rounded" value={form.courses} onChange={(e)=>setForm(f=>({...f, courses:e.target.value}))}/>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
}
