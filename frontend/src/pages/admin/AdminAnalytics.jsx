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
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  const severityData = {
    labels: data.severityStats.map((s) => s._id),
    datasets: [
      {
        label: "Complaints by Severity",
        data: data.severityStats.map((s) => s.count),
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
      },
    ],
  };

  const issueData = {
    labels: data.issueTypeStats.map((i) => i._id),
    datasets: [
      {
        label: "Issues",
        data: data.issueTypeStats.map((i) => i.count),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 CivicLens AI – Analytics</h1>

      <p>Total Complaints: <strong>{data.total}</strong></p>

      <div style={{ width: "400px" }}>
        <Pie data={severityData} />
      </div>

      <div style={{ width: "600px", marginTop: "40px" }}>
        <Bar data={issueData} />
      </div>
    </div>
  );
}
