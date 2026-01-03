import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMap from "./pages/admin/AdminMap";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* ✅ CITIZEN FLOW */}
        <Route path="/report" element={<ReportIssue />} />

        {/* ✅ ADMIN FLOW */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/map" element={<AdminMap />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* 🔒 SAFETY: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}
