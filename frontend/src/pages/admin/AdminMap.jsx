import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
window.L = L; // 👈 THIS IS THE KEY FIX
import "leaflet.heat";
import AdminNavbar from "../../components/AdminNavbar";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AdminMap() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchComplaints();
    })();
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* 🔥 STEP 10.10 – MAP OVERLAY */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur px-4 py-3 rounded-lg shadow">
        <h2 className="font-bold text-lg">🔥 Priority Map</h2>
        <p className="text-sm text-gray-600">
          Higher priority = urgent action
        </p>
      </div>

    return (
    <div className="min-h-screen">
        <AdminNavbar />
            <div style={{ height: "calc(100vh - 64px)" }}>
            {/* existing map code */}
        </div>
    </div>
    );

      <MapContainer
        center={[19.076, 72.8777]} // Mumbai
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Complaint Markers */}
        {complaints.map((c) => {
          if (!c.location?.lat || !c.location?.lng) return null;

          return (
            <Marker
              key={c._id}
              position={[c.location.lat, c.location.lng]}
            >
              <Popup>
                <strong>{c.issueType}</strong> <br />
                Severity: {c.severity} <br />
                Priority: {c.priorityScore} <br />
                Status: {c.status}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
