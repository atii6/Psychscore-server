import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
} from "../controllers/assessmentController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getAssessments,
    POST: createAssessment,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getAssessmentById,
    PATCH: updateAssessment,
    DELETE: deleteAssessment,
  })
);

export default router;
