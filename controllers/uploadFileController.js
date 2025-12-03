import * as FileHandlers from "../handlers/uploadFileHandlers.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const rec = await FileHandlers.createUploadRecord(file);
    return res.status(201).json(rec);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const removeUploadedFile = async (req, res) => {
  try {
    const { id } = req.params;
    const rec = await FileHandlers.removeUploadRecord(id);
    return res.status(200).json(rec);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
