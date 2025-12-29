import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    issueType: String,
    severity: String,
    aiSummary: String,
    duplicateGroupId: String,
    priorityScore: Number,
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    status: {
      type: String,
      default: "Reported",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);

