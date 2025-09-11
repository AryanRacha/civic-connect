import mongoose from "mongoose";
const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    status: {
      type: String,
      required: true,
      enum: ["Submitted", "In Progress", "Resolved"],
      default: "Submitted",
    },
    firstReportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    defaultImageUrl: { type: String, trim: true },
    defaultDescription: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
    follows: [{ type: Schema.Types.ObjectId, ref: "User" }],
    assignedTo: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  {
    timestamps: true,
  }
);

issueSchema.index({ location: "2dsphere" });

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
