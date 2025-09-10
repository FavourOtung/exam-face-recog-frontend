import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../lib/api";

export default function AdminHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/admin/scan-history");
        setRows(data.logs || []);
      } catch {
        // If you haven't added the backend logs route yet, show hint
        setRows([]);
      }
    })();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-[25%] flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Scan History</h2>
        {!rows.length && <p className="text-sm text-gray-600">No logs yet (or enable logging on backend).</p>}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Time</th>
                <th className="text-left p-3">Matched</th>
                <th className="text-left p-3">Matric</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Dept</th>
                <th className="text-left p-3">Level</th>
                <th className="text-left p-3">Course</th>
                <th className="text-left p-3">Distance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id} className="border-t">
                  <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-3">{r.match ? "Yes" : "No"}</td>
                  <td className="p-3">{r.matric || "-"}</td>
                  <td className="p-3">{r.name || "-"}</td>
                  <td className="p-3">{r.department || "-"}</td>
                  <td className="p-3">{r.level || "-"}</td>
                  <td className="p-3">{r.course || "-"}</td>
                  <td className="p-3">{r.distance?.toFixed?.(4) ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
