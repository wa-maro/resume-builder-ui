import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { ReactNode } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
