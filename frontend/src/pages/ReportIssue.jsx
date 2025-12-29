import { useState } from "react";
import axios from "axios";

export default function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
  });

  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) =>
        data.append(key, form[key])
      );
      data.append("image", image);

      await axios.post("http://localhost:5000/api/complaints", data);

      setStatus("✅ Complaint submitted successfully");
      setForm({
        title: "",
        description: "",
        address: "",
        lat: "",
        lng: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">
          📝 Report Civic Issue
        </h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          name="title"
          placeholder="Issue Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          name="description"
          placeholder="Describe the issue"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          name="address"
          placeholder="Address / Area"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          name="lat"
          placeholder="Latitude"
          value={form.lat}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          name="lng"
          placeholder="Longitude"
          value={form.lng}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        
        <p className="text-sm text-gray-500 mb-4">
            Your report helps city authorities act faster 🚀
        </p>

        {/* 🔘 STEP 10.12 – CLEAN BUTTON */}
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition"
        >
          Submit Complaint
        </button>

        {status && (
          <p className="mt-4 text-sm text-center">{status}</p>
        )}
      </form>
    </div>
  );
}
