import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  addReport,
  getAllReports,
  getUserReports,
  getReport,
  updateReport,
  deleteReport,
} from "../controllers/report.controller.js";

const router = express.Router();

// Only use multer for addReport route (file upload)
router.post("/", protectRoute, addReport); //check logic of multer once more
router.get("/", getAllReports);
router.get("/:user_id", protectRoute, getUserReports);
router.get("/:report_id", protectRoute, getReport);
router.put("/:report_id", protectRoute, updateReport);
router.delete("/:report_id", protectRoute, deleteReport);

export default router;
