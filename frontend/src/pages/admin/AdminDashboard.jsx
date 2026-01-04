import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`
      );

      setComplaints(res.data.complaints || []);
      setAiSummary(res.data.aiSummary || "No AI summary available");
    } catch (err) {
      console.error("Dashboard load failed", err);
      setAiSummary("Unable to load AI summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          🛠️ CivicLens Admin Dashboard
        </h1>
        
        {/* AI SUMMARY */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-xl mb-8 shadow">
          <h2 className="text-lg font-semibold mb-2">
            🧠 AI City Summary
          </h2>
          <p className="whitespace-pre-line">
            {aiSummary}
          </p>
        </div>

        {loading && <p>Loading complaints...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={c.imageUrl}
                alt="issue"
                className="h-40 w-full object-cover rounded mb-3"
              />

              <h3 className="font-bold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {c.description}
              </p>

              <p className="text-sm">👤 {c.name}</p>
              <p className="text-sm">📞 {c.mobile}</p>
              <p className="text-sm">📍 {c.location?.address}</p>

              <div className="flex justify-between mt-2 text-sm">
                <span>🚦 {c.severity}</span>
                <span>📊 {c.priorityScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
