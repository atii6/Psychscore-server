import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createReportTemplate,
  getReportTemplate,
  getReportTemplateById,
  updateReportTemplate,
  deleteReportTemplate,
} from "../controllers/reportTemplateController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getReportTemplate,
    POST: createReportTemplate,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getReportTemplateById,
    PATCH: updateReportTemplate,
    DELETE: deleteReportTemplate,
  })
);

export default router;
