import { useLocation, Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ redirectTo = "/auth/login" }) {
  const location = useLocation();

  const isAuth =
    sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  console.log("🚀 ~ ProtectedRoute ~ isAuth:", isAuth);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
