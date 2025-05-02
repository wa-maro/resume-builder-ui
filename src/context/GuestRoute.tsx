import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/authContext";
import { ReactNode } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user && user.role === "user") return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;
