import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/authContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
};

/**
 * ProtectedRoute checks:
 * 1. If user is authenticated
 * 2. If user role is allowed
 * 3. Redirects to /login or /unauthorized as needed
 */
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not authenticated → redirect to login with original location
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role not allowed → redirect to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized → render children
  return <>{children}</>;
};

export default ProtectedRoute;

// --- Optional role-specific wrappers for cleaner routes ---
export const UserRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["user"]}>{children}</ProtectedRoute>
);

export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
);
