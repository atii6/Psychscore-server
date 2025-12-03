import models from "../models/index.js";
import path from "path";
import fs from "fs";

export const createUploadRecord = async (file) => {
  if (!file) throw new Error("File is required.");
  const url = `/uploads/${file.filename}`;

  const rec = await models.Upload.create({
    original_name: file.originalname,
    filename: file.filename,
    mime_type: file.mimetype,
    size: file.size,
    path: file.path,
    url,
    status: "uploaded",
  });

  return rec;
};

export const removeUploadRecord = async (id) => {
  const UPLOAD_DIR = path.join(process.cwd(), "uploads");
  const rec = await models.Upload.findByPk(id);

  if (!rec) {
    throw new Error("Upload record not found");
  }

  const filePath = path.join(UPLOAD_DIR, rec.filename);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log("File removed:", filePath);
    } catch (err) {
      console.error("File deletion failed:", err);
    }
  }

  await rec.destroy();

  return rec;
};
