import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLogged } = useAuth();

  if (user === null|| !isLogged) {
    return <Navigate to={"/auth/login"}/>
  }
  return <>{children}</>;
};

export default ProtectedRoute;