import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "underline font-semibold"
      : "hover:underline";

  return (
    <>
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          🚨 CivicLens Admin
        </h1>

        <div className="flex gap-6 items-center">
          <Link
            to="/admin/dashboard"
            className={linkClass("/admin/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/map"
            className={linkClass("/admin/map")}
          >
            Map
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
