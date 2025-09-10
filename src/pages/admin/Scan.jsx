import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import FaceCapture from "../../components/FaceCapture";
import api from "../../lib/api";

export default function AdminScan() {
  const [descriptor, setDescriptor] = useState(null);
  const [filters, setFilters] = useState({ faculty:"", department:"", level:"", course:"" });
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const verify = async () => {
    setErr(""); setResult(null);
    if (!descriptor) return setErr("Capture a face first");
    try {
      const body = { descriptor, ...filters, threshold: 0.6 };
      const { data } = await api.post("/api/scan/verify", body);
      setResult(data);
    } catch (e) {
      setErr("Scan failed");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-[25%] flex-1 p-6 space-y-4">
        <h2 className="text-2xl font-bold">Scan Student</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {["faculty","department","level","course"].map(k=>(
            <input key={k} className="border p-2 rounded" placeholder={k[0].toUpperCase()+k.slice(1)}
              value={filters[k]} onChange={(e)=>setFilters(f=>({...f,[k]:e.target.value}))}/>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded p-4">
            <FaceCapture onDescriptor={setDescriptor} />
            <p className="text-xs mt-2">Descriptor: {descriptor ? "✅ ready" : "❌ not captured"}</p>
            <button onClick={verify} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Verify</button>
            {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Result</h3>
            {!result && <p className="text-gray-500 text-sm">No result yet</p>}
            {result && !result.match && <p className="text-red-600">No match (distance: {result.distance?.toFixed(3)})</p>}
            {result && result.match && (
              <div className="bg-green-50 border border-green-200 rounded p-3 text-green-800">
                <p><b>Name:</b> {result.student.name}</p>
                <p><b>Matric:</b> {result.student.matric}</p>
                <p><b>Faculty:</b> {result.student.faculty}</p>
                <p><b>Department:</b> {result.student.department}</p>
                <p><b>Level:</b> {result.student.level}</p>
                <p><b>Courses:</b> {result.student.courses.join(", ")}</p>
                <p><b>Distance:</b> {result.distance?.toFixed(4)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
