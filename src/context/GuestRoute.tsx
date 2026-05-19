import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/authContext";
import { ReactNode } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const location = useLocation();

  // If coming from ProtectedRoute
  const from = location.state?.from?.pathname || "/";

  if (user) {
    // Redirect based on role
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "user":
        return <Navigate to="/resume" replace />;
      default:
        return <Navigate to={from} replace />;
    }
  }

  return children;
};

export default GuestRoute;
