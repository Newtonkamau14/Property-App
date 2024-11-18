import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ReactNode } from "react";

interface PublicRoute {
  children: ReactNode;
}

function PublicRoute({ children }: PublicRoute) {
  const {
    state: { user },
  } = useAuthContext();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default PublicRoute;