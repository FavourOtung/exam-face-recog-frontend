import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-gray-700">Use the sidebar to scan, register students, or view history.</p>
      </div>
    </div>
  );
}
