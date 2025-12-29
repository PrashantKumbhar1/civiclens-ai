import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
connectDB();

app.use("/api/complaints", complaintRoutes);

app.use("/api/admin", adminAuthRoutes);

app.get("/", (req, res) => {
  res.send("CivicLens AI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
