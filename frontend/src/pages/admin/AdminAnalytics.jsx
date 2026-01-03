import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import AdminNavbar from "../../components/AdminNavbar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complaints/analytics")
      .then((res) => setData(res.data))
      .catch(() => console.error("Analytics load failed"));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  const severityChart = {
    labels: data.severityStats.map((s) => s._id),
    datasets: [
      {
        data: data.severityStats.map((s) => s.count),
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
      },
    ],
  };

  const issueChart = {
    labels: data.issueTypeStats.map((i) => i._id),
    datasets: [
      {
        label: "Complaints",
        data: data.issueTypeStats.map((i) => i.count),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          📊 Civic Intelligence Analytics
        </h1>

        <p className="mb-6 text-gray-700">
          Total Complaints:{" "}
          <span className="font-bold">{data.total}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-4">
              Severity Distribution
            </h2>
            <Pie data={severityChart} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-4">
              Issue Type Breakdown
            </h2>
            <Bar data={issueChart} />
          </div>
        </div>
      </div>
    </div>
  );
}
