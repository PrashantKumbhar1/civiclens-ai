import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";
//import { analyzeCivicIssue } from "../services/geminiService.js";
import { findDuplicateGroup } from "../services/duplicateDetector.js";
import { calculatePriority } from "../utils/priorityCalculator.js";
import { v4 as uuidv4 } from "uuid";
import { generateAdminSummary } from "../services/adminSummaryService.js";
import { analyzeSeverity } from "../services/severityAnalyzer.js";

/**
 * ===============================
 * CREATE COMPLAINT
 * ===============================
 */
export const createComplaint = async (req, res) => {
  try {
    const {
      name,
      mobile,
      title,
      description,
      address,
      lat,
      lng,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // 1️⃣ Upload image
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    // 2️⃣ SAFE AI ANALYSIS (never fail)
    let aiResult = {
      issueType: title || "General Issue",
      severity: "Medium",
      summary: description,
    };

    try {
      const aiResponse = await analyzeCivicIssue(req.file.path);
      if (aiResponse) aiResult = aiResponse;
    } catch (aiError) {
      console.warn("⚠️ Gemini failed, using fallback AI");
    }

    // 3️⃣ Save complaint (NO AI DEPENDENCY)
    const complaint = await Complaint.create({
      name,
      mobile,
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
      priorityScore: 50,
      status: "Reported",
    });

    res.status(201).json({ success: true, complaint });

  } catch (error) {
    console.error("❌ Complaint creation failed:", error);
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
    console.error("❌ Fetch complaints failed:", error);
    res.status(500).json({
      error: "Failed to fetch complaints",
    });
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

    if (!status) {
      return res.status(400).json({
        error: "Status is required",
      });
    }

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
    console.error("❌ Update status failed:", error);
    res.status(500).json({
      error: "Failed to update status",
    });
  }
};

export const getAdminDashboardData = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .sort({ priorityScore: -1 })
      .limit(20);

    const aiSummary = await generateAdminSummary(complaints);

    res.json({
      success: true,
      complaints,
      aiSummary
    });
  } catch (error) {
    console.error("Dashboard data load failed:", error);
    res.status(500).json({
      success: false,
      error: "Unable to load dashboard data"
    });
  }
};
