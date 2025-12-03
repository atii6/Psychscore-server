import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createGeneratedReport,
  getGeneratedReports,
  getGeneratedReportById,
  updateGeneratedReport,
  deleteGeneratedReport,
} from "../controllers/generatedReportController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getGeneratedReports,
    POST: createGeneratedReport,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getGeneratedReportById,
    PATCH: updateGeneratedReport,
    DELETE: deleteGeneratedReport,
  })
);

export default router;
