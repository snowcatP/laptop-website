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
import ProtectedRoute from "./client/util/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        <Route path="/store" element={<Store />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>

        {/*
          Protected endpoints
        */}

        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        ></Route>

        

        {/*Error 404 */}
        <Route path="/*" element={<Error404 />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
