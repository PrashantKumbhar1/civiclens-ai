import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ReportIssue from "./pages/ReportIssue";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMap from "./pages/admin/AdminMap";

/**
 * 🔐 Protected Route Wrapper
 * Redirects to admin login if JWT is missing
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🧍 Citizen */}
        <Route path="/" element={<ReportIssue />} />

        {/* 🔐 Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🧠 Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🗺 Admin Heatmap */}
        <Route
          path="/admin/map"
          element={
            <ProtectedRoute>
              <AdminMap />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
