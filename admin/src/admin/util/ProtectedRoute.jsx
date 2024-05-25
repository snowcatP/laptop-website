// import React from "react";
import { useAuth } from "../context/AuthContext";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {Outlet, Navigate} from 'react-router-dom'
const ProtectedRoute = () => {
  const { isLogged } = useAuth();

  return isLogged ? (
    <Outlet/>
  ) : (
    <Navigate to="/auth/admin-login" replace/>
  )
  
};

export default ProtectedRoute;