import * as User from "../handlers/userHandlers.js";

export const createUser = async (req, res) => {
  const data = req.body;
  const user = await User.createUser(data);
  return res.status(201).json(user);
};

export const getAllUsers = async (req, res) => {
  const assessments = await User.getAllUsers();
  return res.json(assessments);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.getUserById(id);
  return res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updated = await User.updateUser(id, req.body);
  return res.json(updated);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await User.deleteUser(id);
  return res.json({ message: "User deleted", result });
};
