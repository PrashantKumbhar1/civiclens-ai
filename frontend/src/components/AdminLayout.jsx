import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">CivicLens AI</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block hover:text-yellow-400">
            📊 Dashboard
          </Link>
          <Link to="/admin/map" className="block hover:text-yellow-400">
            🗺️ City Map
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
