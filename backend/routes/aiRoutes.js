import express from "express";
import { matchResume } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// "resume" is the field name the frontend must use when sending the file
router.post("/match/:applicationId", protect, upload.single("resume"), matchResume);

export default router;