import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../lib/auth";

export default function AdminSidebar() {
  const navigate = useNavigate();
  return (
  <div className="w-[25%] min-h-screen fixed bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink className="block px-3 py-2 rounded hover:bg-gray-800" to="/admin">Dashboard</NavLink>
        <NavLink className="block px-3 py-2 rounded hover:bg-gray-800" to="/admin/scan">Scan</NavLink>
        <NavLink className="block px-3 py-2 rounded hover:bg-gray-800" to="/admin/students">Student Registration</NavLink>
        <NavLink className="block px-3 py-2 rounded hover:bg-gray-800" to="/admin/history">History</NavLink>
        <button
          onClick={() => { clearAuth(); navigate("/"); }}
          className="block w-full text-left px-3 py-2 rounded bg-red-600 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
