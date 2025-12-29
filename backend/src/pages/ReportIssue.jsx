import { useState } from "react";
import axios from "axios";

export default function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    lat: "",
    lng: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));

    await axios.post("http://localhost:5000/api/complaints", data);
    alert("Complaint submitted successfully!");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report an Issue</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <button type="button" onClick={getLocation}>
        Get Location
      </button>

      <button type="submit">Submit Complaint</button>
    </form>
  );
}
