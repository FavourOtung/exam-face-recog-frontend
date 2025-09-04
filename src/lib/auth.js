export function saveAuth({ token, role, profile }) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  if (profile) localStorage.setItem("profile", JSON.stringify(profile));
}
export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("profile");
}
export function getRole() {
  return localStorage.getItem("role");
}
export function getProfile() {
  try { return JSON.parse(localStorage.getItem("profile") || "null"); }
  catch { return null; }
}
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
