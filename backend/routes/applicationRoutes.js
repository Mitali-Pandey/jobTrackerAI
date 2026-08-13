import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes here are protected — user must be logged in
router.use(protect);

router.route("/")
  .post(createApplication)
  .get(getApplications);

router.route("/:id")
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

export default router;