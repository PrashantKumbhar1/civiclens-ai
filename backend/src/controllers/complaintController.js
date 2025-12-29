import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";
import { analyzeCivicIssue } from "../services/geminiService.js";
import { findDuplicateGroup } from "../services/duplicateDetector.js";
import { calculatePriority } from "../utils/priorityCalculator.js";
import { v4 as uuidv4 } from "uuid";

/**
 * ===============================
 * CREATE COMPLAINT (Citizen)
 * ===============================
 */
export const createComplaint = async (req, res) => {
  try {
    const { title, description, lat, lng, address } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // 1️⃣ Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    // 2️⃣ AI analysis
    const aiResult = await analyzeCivicIssue(req.file.path);

    // 3️⃣ Duplicate detection
    const duplicates = await findDuplicateGroup(
      aiResult.issueType,
      Number(lat),
      Number(lng)
    );

    let duplicateGroupId;
    let reportCount = 1;

    if (duplicates.length > 0) {
      duplicateGroupId = duplicates[0].duplicateGroupId;
      reportCount = duplicates.length + 1;

      const updatedPriority = calculatePriority(
        aiResult.severity,
        reportCount
      );

      await Complaint.updateMany(
        { duplicateGroupId },
        { priorityScore: updatedPriority }
      );
    } else {
      duplicateGroupId = uuidv4();
    }

    // 4️⃣ Priority calculation
    const priorityScore = calculatePriority(
      aiResult.severity,
      reportCount
    );

    // 5️⃣ Save complaint
    const complaint = await Complaint.create({
      title,
      description,
      imageUrl: uploadResult.secure_url,
      location: {
        lat: Number(lat),
        lng: Number(lng),
        address,
      },
      issueType: aiResult.issueType,
      severity: aiResult.severity,
      aiSummary: aiResult.summary,
      duplicateGroupId,
      priorityScore,
      status: "Reported",
    });

    res.status(201).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Complaint creation failed:", error);
    res.status(500).json({ error: "Failed to create complaint" });
  }
};

/**
 * ===============================
 * GET ALL COMPLAINTS (Admin)
 * ===============================
 */
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      priorityScore: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Fetch complaints failed:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

/**
 * ===============================
 * UPDATE COMPLAINT STATUS (Admin)
 * ===============================
 */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Update status failed:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};
