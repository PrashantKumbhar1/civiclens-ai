import express from "express";
import multer from "multer";
import {
  createComplaint,
  getAllComplaints,
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

/* CREATE COMPLAINT */
router.post(
  "/complaints",
  upload.single("image"), // ⚠️ MUST MATCH frontend key
  createComplaint
);

/* GET COMPLAINTS */
router.get("/complaints", getAllComplaints);

export default router;
