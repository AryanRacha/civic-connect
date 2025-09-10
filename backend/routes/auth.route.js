import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  loginUser,
  logoutUser,
  signupUser,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// SignUp
router.post("/signup", signupUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", protectRoute, logoutUser);

// Forgot Password
router.post("/forgot-password", protectRoute, forgotPassword);

export default router;
