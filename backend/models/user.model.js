import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone_no: { type: String, required: false, unique: true, trim: true },
    password: { type: String, required: false, select: false },
    role: {
      type: String,
      enum: ["citizen", "municipal_admin", "field_officer"],
      default: "citizen",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
