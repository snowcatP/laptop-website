import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import AdminLogin from "./admin/AdminLogin";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="/auth/admin-login" element={<AdminLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
