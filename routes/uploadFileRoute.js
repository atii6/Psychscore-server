import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  removeUploadedFile,
  uploadFile,
} from "../controllers/uploadFileController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.all(
  "/",
  upload.single("file"),
  methodHandler({
    POST: uploadFile,
  })
);

router.all(
  "/:id",
  methodHandler({
    DELETE: removeUploadedFile,
  })
);

export default router;
