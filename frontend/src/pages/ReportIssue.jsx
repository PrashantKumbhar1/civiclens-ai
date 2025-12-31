import { useState } from "react";
import axios from "axios";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ✅ MUST use FormData for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("lat", lat);
      formData.append("lng", lng);
      formData.append("image", image); // 👈 name MUST be "image"

      await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Complaint submitted successfully!");
      setTitle("");
      setDescription("");
      setAddress("");
      setLat("");
      setLng("");
      setImage(null);
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

        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="file"
          accept="image/*"
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
