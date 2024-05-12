import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { admin, isLogged } = useAuth();

  if (!admin || !isLogged) {
    return <Navigate to="/auth/admin-login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
