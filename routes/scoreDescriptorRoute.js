import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createScoreDescriptor,
  getAllScoreDescriptors,
  getScoreDescriptorById,
  updateScoreDescriptor,
  deleteScoreDescriptor,
} from "../controllers/scoreDescriptorController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getAllScoreDescriptors,
    POST: createScoreDescriptor,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getScoreDescriptorById,
    PATCH: updateScoreDescriptor,
    DELETE: deleteScoreDescriptor,
  })
);

export default router;
