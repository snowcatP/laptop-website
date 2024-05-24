import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./user/UserProfile";
import UserCart from "./user/UserCart";
import UserBills from "./user/UserBills";
import UserOrders from "./user/UserOrders";
import UserWarranties from "./user/UserWarranties";
import UserChangePassword from "./user/UserChangePassword";
import ProtectedRoute from "./util/ProtectedRoute";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <UserCart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills"
        element={
          <ProtectedRoute>
            <UserBills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warranties"
        element={
          <ProtectedRoute>
            <UserWarranties />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <UserChangePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
