import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import protectAdmin from "../middlewares/protectAdmin.js";

import {
  createIssue,
  getAllIssues,
  getIssueById,
  addReportToIssue,
  followIssue,
  unfollowIssue,
  updateIssueStatus,
  assignIssueToDept,
  deleteIssue,
  searchIssues, // Assuming you have this controller
} from "../controllers/issue.controller.js";

const router = express.Router();

// --- Routes for All Logged-in Users ---

router.post("/", protectRoute, createIssue);
router.get("/", protectRoute, getAllIssues);
router.get("/search", protectRoute, searchIssues); // Search route
router.get("/:id", protectRoute, getIssueById);
router.post("/:id/report", protectRoute, addReportToIssue);
router.post("/:id/follow", protectRoute, followIssue);
router.post("/:id/unfollow", protectRoute, unfollowIssue);

// --- Admin Only Routes ---

router.put("/:id/status", protectRoute, protectAdmin, updateIssueStatus);
router.put("/:id/assign", protectRoute, protectAdmin, assignIssueToDept);
router.delete("/:id", protectRoute, protectAdmin, deleteIssue);

export default router;
