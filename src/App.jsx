import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";

import StudentLogin from "./pages/student/Login";
import StudentRegister from "./pages/student/Register";
import StudentDashboard from "./pages/student/Dashboard";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminScan from "./pages/admin/Scan";
import AdminStudents from "./pages/admin/Students";
import AdminHistory from "./pages/admin/History";

import { RequireStudent, RequireAdmin } from "./components/Guards";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      {/* Student */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route element={<RequireStudent />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/scan" element={<AdminScan />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/history" element={<AdminHistory />} />
      </Route>
    </Routes>
  );
}
