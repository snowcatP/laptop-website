import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLogged } = useAuth();

  return isLogged ? (
    <Outlet/>
  ) : (
    <Navigate to="/auth/login" replace/>
  )
};

export default ProtectedRoute;