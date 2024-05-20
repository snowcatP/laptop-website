import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLogged } = useAuth();

  const navigate = useNavigate()
  if (!user || !isLogged) {
    navigate("/auth/login")
    return;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
