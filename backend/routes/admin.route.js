import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import protectAdmin from "../middlewares/protectAdmin.js"; // Assumed admin-only middleware
import {
  getAllUsers,
  getUserById,
  createDepartment,
  getAllDepartments,
  getDashboardStats,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", protectRoute, protectAdmin, getDashboardStats);
router.get("/users", protectRoute, protectAdmin, getAllUsers);
router.get("/users/:id", protectRoute, protectAdmin, getUserById);
router.post("/departments", protectRoute, protectAdmin, createDepartment);
router.get("/departments", protectRoute, protectAdmin, getAllDepartments);

export default router;
