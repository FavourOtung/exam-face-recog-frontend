import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn, getRole } from "../lib/auth";

export function RequireStudent() {
  if (!isLoggedIn()) return <Navigate to="/student/login" replace />;
  if (getRole() !== "student") return <Navigate to="/" replace />;
  return <Outlet />;
}

export function RequireAdmin() {
  if (!isLoggedIn()) return <Navigate to="/admin/login" replace />;
  if (getRole() !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
