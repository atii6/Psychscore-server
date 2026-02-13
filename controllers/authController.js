import models from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizeUser from "../utils/sanitizeUsers.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );
};

// const setTokenCookie = (res, token) => {
//   // res.cookie("token", token, {
//   //   httpOnly: true,
//   //   secure: process.env.NODE_ENV === "production",
//   //   sameSite: "lax",
//   //   maxAge: 24 * 60 * 60 * 1000,
//   // });
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//   });
// };

export const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await models.User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await models.User.create({
      full_name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = generateToken(user);
    res.json({
      success: true,
      token: token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    // setTokenCookie(res, token);
    res.json({
      success: true,
      token: token,
      user: sanitizeUser(user),
    });

    // res.json({
    //   message: "Login successful",
    //   user: sanitizeUser(user),
    // });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  // res.clearCookie("token", {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   path: "/",
  // });

  res.json({ message: "Logged out successfully" });
};
