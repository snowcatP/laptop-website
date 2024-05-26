import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLogged } = useAuth();
  const navigate = useNavigate()
  if (user === null|| !isLogged) {
    navigate("/auth/login")
  }
  return <>{children}</>;
};

export default ProtectedRoute;