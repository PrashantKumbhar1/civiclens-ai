import express from "express";
import {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.patch("/:id/status", updateComplaintStatus);

export default router;
