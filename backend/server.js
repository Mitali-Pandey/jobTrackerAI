import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ---------- Middleware ----------
app.use(express.json());               // parse JSON body
app.use(cookieParser());               // parse cookies (for JWT)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // frontend URL (Vite default)
    credentials: true,
  })
);

// ---------- Test route ----------
app.get("/", (req, res) => {
  res.json({ message: "JobTrackr AI API is running" });
});

// ---------- Routes (uncomment as you build them) ----------
 import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
 import aiRoutes from "./routes/aiRoutes.js";
 app.use("/api/auth", authRoutes);
 app.use("/api/applications", applicationRoutes);
 app.use("/api/ai", aiRoutes);

// ---------- Error handling (add after building middleware/errorHandler.js) ----------
// import { notFound, errorHandler } from "./middleware/errorHandler.js";
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});