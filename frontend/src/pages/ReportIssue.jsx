import { useState } from "react";
import axios from "axios";
import MapPicker from "../components/MapPicker";

export default function ReportIssue() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lat || !lng) {
      setMessage("❌ Please select location on map");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("lat", lat);
      formData.append("lng", lng);
      formData.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints`,
        formData
      );

      setMessage("✅ Complaint submitted successfully!");
      setName("");
      setMobile("");
      setTitle("");
      setDescription("");
      setAddress("");
      setImage(null);
      setLat(null);
      setLng(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">📝 Report Civic Issue</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="text"
          placeholder="Address / Area"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <label className="font-semibold mb-2 block">
          📍 Select Issue Location on Map
        </label>

        <MapPicker setLat={setLat} setLng={setLng} />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {message && (
          <p className="mt-4 text-center font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
