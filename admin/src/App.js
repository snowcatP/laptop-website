import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import AdminLogin from "./admin/AdminLogin";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddProduct from "./admin/AddProduct";
import ListProduct from "./admin/ListProduct";
import EditProduct from "./admin/EditProduct";
import ListWarranty from "./admin/ListWarranty";
import AddWarranty from "./admin/AddWarranty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/list-product" element={<ListProduct/>} />
        <Route path="/edit-product/:id" element={<EditProduct/>} />
        <Route path="/list-warranty" element={<ListWarranty/>} />
        <Route path="/add-warranty" element={<AddWarranty/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
