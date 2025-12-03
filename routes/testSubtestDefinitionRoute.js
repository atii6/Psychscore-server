import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createTestSubtestDefinition,
  getAllTestSubtestDefinitions,
  getTestSubtestDefinitionById,
  updateTestSubtestDefinition,
  deleteTestSubtestDefinition,
} from "../controllers/testSubtestDefinitionController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getAllTestSubtestDefinitions,
    POST: createTestSubtestDefinition,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getTestSubtestDefinitionById,
    PATCH: updateTestSubtestDefinition,
    DELETE: deleteTestSubtestDefinition,
  })
);

export default router;
