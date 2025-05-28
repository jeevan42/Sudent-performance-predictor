import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/LoginPage.jsx";
import Register from "./pages/Auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function AppRoutes() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!token ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add a fallback for any unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Protected Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/students/:studentId" element={<Dashboard />} />
            {/* Add a fallback for any unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
