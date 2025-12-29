import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive
      ? "bg-yellow-400 text-black"
      : "text-gray-200 hover:bg-slate-700 hover:text-white"
  }`;

export default function Navbar() {
  return (
    <nav className="bg-slate-900 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">
        CivicLens <span className="text-yellow-400">AI</span>
      </h1>

      <div className="flex gap-2">
        <NavLink to="/" className={linkClass}>
          Report Issue
        </NavLink>
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/map" className={linkClass}>
          Map
        </NavLink>
        <NavLink to="/admin/analytics" className={linkClass}>
          Analytics
        </NavLink>
      </div>
    </nav>
  );
}
