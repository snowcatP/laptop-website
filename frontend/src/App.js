import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./client/HomePage";
import Store from "./client/Store";
import Product from "./client/Product";
import Checkout from "./client/Checkout";
import Cart from "./client/Cart";
import Login from "./client/Login";
import Register from "./client/Register";
import ForgotPassword from "./client/ForgotPassword";
import User from "./client/User";
import Admin from "./admin/Admin";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { StyleProvider } from "./context/StyleContext";

function App() {
  return (
    <BrowserRouter>

      <StyleProvider>
        <Routes>
          {/* <Styling> */}
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/user" element={<User />}></Route>
          {/* </Styling> */}

          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </StyleProvider>
    </BrowserRouter>
  );
}

export default App;
