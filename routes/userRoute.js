import express from "express";
import methodHandler from "../utils/requestHandler.js";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.all(
  "/",
  methodHandler({
    GET: getAllUsers,
    POST: createUser,
  })
);

router.all(
  "/:id",
  methodHandler({
    GET: getUserById,
    PATCH: updateUser,
    DELETE: deleteUser,
  })
);

export default router;
