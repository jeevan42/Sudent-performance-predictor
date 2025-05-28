import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/LoginPage.jsx";
import Register from "./pages/Auth/RegisterPage.jsx";
// import Dashboard from "./pages/Dashboard.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
