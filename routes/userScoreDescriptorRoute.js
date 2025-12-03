import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createUserScoreDescriptor,
  getAllUserScoreDescriptors,
  getUserScoreDescriptorById,
  updateUserScoreDescriptor,
  deleteUserScoreDescriptor,
} from "../controllers/userScoreDescriptorController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getAllUserScoreDescriptors,
    POST: createUserScoreDescriptor,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getUserScoreDescriptorById,
    PATCH: updateUserScoreDescriptor,
    DELETE: deleteUserScoreDescriptor,
  })
);

export default router;
