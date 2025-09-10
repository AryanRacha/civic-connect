import multer from "multer";
import { storage, ID } from "../config/appwrite.js";
import Report from "../models/report.model.js";

// Multer setup for memory storage (no file size limit)
const upload = multer({ storage: multer.memoryStorage() });

export const addReport = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      // Upload each file to Appwrite Storage
      for (const file of req.files) {
        const appwriteFile = await storage.createFile(
          process.env.APPWRITE_BUCKET_ID,
          ID.unique(),
          file.buffer,
          file.mimetype
        );
        // Construct the public URL (adjust if you use file previews or permissions)
        const url = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${appwriteFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
        imageUrls.push(url);
      }
    }

    const report = await Report.create({
      title,
      description,
      location,
      user_id: req.user._id,
      images: imageUrls,
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Reusable image preview function
/**
 * Converts an image Buffer to a base64 data URL for previewing in the frontend,
 * or returns the input string if it's already a URL or data URL.
 * @example
 * // Usage in frontend (React):
 * <img src={previewImage(buffer)} alt="Preview" />
 */
export const previewImage = (input, mimetype = "image/png") => {
  try {
    if (Buffer.isBuffer(input)) {
      const base64 = input.toString("base64");
      return `data:${mimetype};base64,${base64}`;
    }
    if (typeof input === "string") {
      return input;
    }
    throw new Error(
      "Invalid input for image preview: input must be a Buffer or a string URL"
    );
  } catch (error) {
    throw new Error(`Failed to preview image: ${error.message}`);
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}).populate("user_id");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user_id: req.user._id }).populate(
      "user_id"
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("user_id");
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    console.log("Deleted report:", report);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
