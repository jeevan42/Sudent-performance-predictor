import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/LoginPage.jsx";
import Register from "./pages/Auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import EditStudentForm from "./pages/EditStudentForm.jsx";
import AddStudentForm from "./pages/AddStudentForm.jsx";
import Header from "./pages/Header.jsx";

export default function AppRoutes() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token && <Header />} {/* Show Header only if the user is logged in */}

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
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/students/add" element={<AddStudentForm />} />
            <Route path="/students/edit/:id" element={<EditStudentForm />} />
            {/* Add a fallback for any unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
