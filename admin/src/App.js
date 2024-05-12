import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import AdminLogin from "./admin/AdminLogin";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminProfile from "./admin/AdminProfile";
import Error404 from "./admin/Error404";
import AddProduct from "./admin/AddProduct";
import ListProduct from "./admin/ListProduct";
import EditProduct from "./admin/EditProduct";
import ListWarranty from "./admin/ListWarranty";
import AddWarranty from "./admin/AddWarranty";
import ProtectedRoute from "./admin/util/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/admin-login" index element={<AdminLogin />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-product"
          element={
            <ProtectedRoute>
              <ListProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-warranty"
          element={
            <ProtectedRoute>
              <ListWarranty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-warranty"
          element={
            <ProtectedRoute>
              <AddWarranty />
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
