import express from "express";
import multer from "multer";
import {
  createComplaint,
  getAllComplaints,
  getAdminDashboardData,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

/* multer config */
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// Citizen
router.post("/complaints", upload.single("image"), createComplaint);

// Admin
router.get("/complaints", getAllComplaints);
router.get("/admin/dashboard", getAdminDashboardData); // ✅ THIS
router.patch("/complaints/:id", updateComplaintStatus);

export default router;