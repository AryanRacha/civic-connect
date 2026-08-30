import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
const JWT_SECRET = process.env.JWT_SECRET;

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax", // works for localhost:5173 -> localhost:5000
    secure: false, // set to true when using HTTPS
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export default generateTokenAndSetCookie;