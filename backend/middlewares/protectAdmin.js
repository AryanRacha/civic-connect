import dotenv from "dotenv";
dotenv.config();
import { role } from "../config/enum.js";

const protectAdmin = async (req, res, next) => {
  try {
    const isAdmin = role[req.user.role] === process.env.MUNICIPAL_ADMIN_ID;
    if (isAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Forbidden - No Admin Access" });
    }

    next();
  } catch (error) {
    console.error("Error in protectAdmin middleware:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default protectAdmin;
