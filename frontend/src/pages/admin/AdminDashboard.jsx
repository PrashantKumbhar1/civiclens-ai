import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.error("Failed to load complaints", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 📊 Severity counts
  const high = complaints.filter(
    (c) => c.severity === "High"
  ).length;
  const medium = complaints.filter(
    (c) => c.severity === "Medium"
  ).length;
  const low = complaints.filter(
    (c) => c.severity === "Low"
  ).length;

  // 🔁 Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status }
      );
      fetchComplaints(); // refresh data
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          📊 Admin Dashboard
        </h2>

        {/* 🔄 Loading State */}
        {loading && (
          <p className="text-center text-gray-500 mb-6">
            Loading complaints...
          </p>
        )}

        {/* 🔢 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-100 p-4 rounded shadow">
            <h3 className="font-semibold text-red-700">
              High Severity
            </h3>
            <p className="text-2xl font-bold">{high}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="font-semibold text-yellow-700">
              Medium Severity
            </h3>
            <p className="text-2xl font-bold">{medium}</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="font-semibold text-green-700">
              Low Severity
            </h3>
            <p className="text-2xl font-bold">{low}</p>
          </div>
        </div>

        {/* 📋 Complaints Table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border text-left">Issue</th>
                <th className="p-3 border text-left">Severity</th>
                <th className="p-3 border text-left">Priority</th>
                <th className="p-3 border text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border">
                    {c.issueType}
                  </td>

                  <td className="p-3 border">
                    {c.severity}
                  </td>

                  <td className="p-3 border">
                    {c.priorityScore}
                  </td>

                  <td className="p-3 border">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(
                          c._id,
                          e.target.value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Reported">
                        Reported
                      </option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Resolved">
                        Resolved
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📭 Empty State */}
          {!loading && complaints.length === 0 && (
            <p className="text-center p-6 text-gray-500">
              No complaints found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
