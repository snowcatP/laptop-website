import React from "react";
import { useAuth } from "../context/AuthContext";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();
  // const location = useLocation()
  const navigate = useNavigate()

  return isLogged ? (
    <>{children}</>
  ) : (
    // <Navigate to="/auth/admin-login" replace state={{path: location.pathname}}/>
    navigate("/auth/admin-login")
  )
  
};

export default ProtectedRoute;