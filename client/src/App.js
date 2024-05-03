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
import Error404 from "./client/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>

        <Route path="/product" element={<Product />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        {/*
          Protected endpoints
        */ }
        <Route path="/user/*" element={<UserRoutes />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>

        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
