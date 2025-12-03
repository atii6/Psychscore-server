import * as ExtractHandlers from "../handlers/extractFileHandlers.js";

export const extractDataFromFile = async (req, res) => {
  try {
    const { uploadId } = req.params;

    if (!uploadId)
      return res.status(400).json({ error: "uploadId is required" });

    const parsedData = await ExtractHandlers.extractDataInline(uploadId);

    return res.json({ status: "success", output: parsedData });
  } catch (err) {
    return res.status(500).json({ status: "error", error: err.message });
  }
};
