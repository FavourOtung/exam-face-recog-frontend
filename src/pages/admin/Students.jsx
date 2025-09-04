import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import FaceCapture from "../../components/FaceCapture";
import api from "../../lib/api";

const fields = [
  { id:"firstName", label:"First Name", required:true },
  { id:"lastName",  label:"Last Name", required:true },
  { id:"matric",    label:"Matric Number", required:true },
  { id:"email",     label:"Email" },
  { id:"phone",     label:"Phone" },
  { id:"faculty",   label:"Faculty" },
  { id:"department",label:"Department" },
  { id:"level",     label:"Level" },
  { id:"courses",   label:"Courses (comma separated)" },
  { id:"password",  label:"Password", required:true, type:"password" },
];

export default function AdminStudents() {
  const [form, setForm] = useState({});
  const [descriptor, setDescriptor] = useState(null);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = {
        ...form,
        courses: (form.courses || "").split(",").map(s=>s.trim()).filter(Boolean),
        faceDescriptor: descriptor || null,
      };
      await api.post("/api/admin/students", payload);
      setMsg("Student created");
      setForm({}); setDescriptor(null);
    } catch (e) {
      setMsg(e?.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Register a Student</h2>
        <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map(f=>(
              <div key={f.id}>
                <label className="block text-sm mb-1">{f.label}</label>
                <input
                  required={!!f.required}
                  type={f.type || "text"}
                  className="w-full border p-2 rounded"
                  value={form[f.id] || ""}
                  onChange={(e)=>setForm(prev=>({...prev, [f.id]: e.target.value}))}
                />
              </div>
            ))}
          </div>
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Optional Face Capture</h3>
            <FaceCapture onDescriptor={setDescriptor} />
            <p className="text-xs mt-2">Descriptor: {descriptor ? "✅ ready" : "—"}</p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded">Create Student</button>
          {msg && <p className="text-sm mt-2">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
