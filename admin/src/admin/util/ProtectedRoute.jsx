import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { admin, isLogged } = useAuth();

  const navigate = useNavigate()
  if (admin === null || !isLogged) {
    navigate("/auth/admin-login")
    return;
  }
  return <>{children}</>;
};

export default ProtectedRoute;