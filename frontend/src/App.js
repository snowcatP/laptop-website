import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./client/HomePage";
import Store from "./client/Store";
import Product from "./client/Product";
import Checkout from "./client/Checkout";
import Login from "./client/Login";
import Register from "./client/Register";
import ForgotPassword from "./client/ForgotPassword";
import UserRoutes from "./client/UserRoutes";
import Admin from "./admin/Admin";

import AdminLogin from "./admin/AdminLogin";
import ListProduct from "./admin/ListProduct";
import AddProduct from "./admin/AddProduct";
import AddWarranty from "./admin/AddWarranty";
import ListWarranty from "./admin/ListWarranty";
import AddDiscount from "./admin/AddDiscount";
import EditProduct from "./admin/EditProduct";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/user/*" element={<UserRoutes/>}></Route>

        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin/product-list" element={<ListProduct />}></Route>
        <Route path="/admin/add-product" element={<AddProduct />}></Route>
        <Route path="/admin/edit-product/:id" element={<EditProduct />}></Route>
        <Route path="/admin/add-warranty" element={<AddWarranty />}></Route>
        <Route path="/admin/warranty-list" element={<ListWarranty />}></Route>
        <Route path="/admin/add-discount" element={<AddDiscount />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
