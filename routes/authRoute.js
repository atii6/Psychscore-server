import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
import models from "../models/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", auth, async (req, res) => {
  const user = await models.User.findByPk(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user });
});

export default router;
