import * as UserScoreDescriptor from "../handlers/userScoreDescriptorHandlers.js";

export const createUserScoreDescriptor = async (req, res) => {
  const data = req.body;
  const descriptor = await UserScoreDescriptor.createUserScoreDescriptor(data);
  return res.status(201).json(descriptor);
};

export const getAllUserScoreDescriptors = async (req, res) => {
  const assessments = await UserScoreDescriptor.getAllUserScoreDescriptors();
  return res.json(assessments);
};

export const getUserScoreDescriptorById = async (req, res) => {
  const { id } = req.params;
  const descriptor = await UserScoreDescriptor.getUserScoreDescriptorById(id);
  return res.json(descriptor);
};

export const updateUserScoreDescriptor = async (req, res) => {
  const { id } = req.params;
  const updated = await UserScoreDescriptor.updateUserScoreDescriptor(
    id,
    req.body
  );
  return res.json(updated);
};

export const deleteUserScoreDescriptor = async (req, res) => {
  const { id } = req.params;
  const result = await UserScoreDescriptor.deleteUserScoreDescriptor(id);
  return res.json({ message: "User score descriptor deleted", result });
};
