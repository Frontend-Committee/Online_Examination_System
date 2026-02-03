import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function ProtectedRoute() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
