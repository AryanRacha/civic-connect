import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import { role } from "../config/enum.js";

// Signup user
export async function signupUser(req, res) {
  try {
    const { name, email, phone_no, password, role_id } = req.body;

    // Validation checks
    if (!name || !email || !phone_no || !password || !role_id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email format" });
    }

    // Phone number regex validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone_no)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid phone number format" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Check if phone_no already exists
    const existingUserByPhone = await User.findOne({ phone_no: phone_no });
    if (existingUserByPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    // Check if role_id is valid
    const validRole =
      role_id === role.citizen ||
      role_id === role.municipal_admin ||
      role_id === role.field_officer;
    if (!validRole) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role ID" });
    }

    const userRole = Object.keys(role).find((key) => role[key] === role_id);

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      name: name,
      email: email,
      phone_no: phone_no,
      password: hashedPassword,
      role: userRole,
    });

    // Generating token and setting cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Saving the new user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account has been successfully created",
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Login user
export async function loginUser(req, res) {
  try {
    const { email, phone_no, password, role_id } = req.body;

    // Validation checks
    if ((!email && !phone_no) || !password || !role_id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Role check
    const validRole =
      role_id === role.citizen ||
      role_id === role.municipal_admin ||
      role_id === role.field_officer;
    if (!validRole) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role ID" });
    }

    // Email or Phone No.
    const authType = email ? "email" : "phone_no";

    // Find user by email
    const user = await User.findOne({
      [authType]: authType === "email" ? email : phone_no,
    }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password match
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generating token and setting cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Logout user
export async function logoutUser(req, res) {
  try {
    // Clearing the authentication cookie
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
