// ProtectedRoute
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = true; // placeholder: flip to false to test the redirect
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}