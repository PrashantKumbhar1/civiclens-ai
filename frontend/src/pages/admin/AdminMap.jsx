import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AdminNavbar from "../../components/AdminNavbar";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Marker color by severity
const getMarkerIcon = (severity) => {
  const color =
    severity === "High"
      ? "red"
      : severity === "Medium"
      ? "orange"
      : "green";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

export default function AdminMap() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complaints")
      .then((res) => setComplaints(res.data.complaints || []))
      .catch(() => console.error("Failed to load complaints"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="relative h-[calc(100vh-64px)]">
        {/* Overlay */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold">🗺️ Civic Priority Map</h2>
          <p className="text-sm text-gray-600">
            Color shows severity • Click markers for details
          </p>
        </div>

        <MapContainer
          center={[19.076, 72.8777]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {complaints.map((c) =>
            c.location?.lat && c.location?.lng ? (
              <Marker
                key={c._id}
                position={[c.location.lat, c.location.lng]}
                icon={getMarkerIcon(c.severity)}
              >
                <Popup>
                  <strong>{c.title}</strong>
                  <br />
                  Severity: {c.severity}
                  <br />
                  Priority: {c.priorityScore}
                  <br />
                  Status: {c.status}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
