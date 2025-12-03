import express from "express";
import methodHandler from "../utils/requestHandler.js";
import { extractDataFromFile } from "../controllers/extractFileController.js";

const router = express.Router();

router.get(
  "/:uploadId",
  methodHandler({
    GET: extractDataFromFile,
  })
);

export default router;
