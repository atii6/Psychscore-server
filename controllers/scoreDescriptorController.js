import * as ScoreDescriptor from "../handlers/scoreDescriptorHandlers.js";

export const createScoreDescriptor = async (req, res) => {
  const data = req.body;
  const scoreDescriptor = await ScoreDescriptor.createScoreDescriptor(data);
  return res.status(201).json(scoreDescriptor);
};

export const getAllScoreDescriptors = async (req, res) => {
  const scoreDescriptors = await ScoreDescriptor.getAllScoreDescriptors();
  return res.json(scoreDescriptors);
};

export const getScoreDescriptorById = async (req, res) => {
  const { id } = req.params;
  const scoreDescriptor = await ScoreDescriptor.getScoreDescriptorById(id);
  return res.json(scoreDescriptor);
};

export const updateScoreDescriptor = async (req, res) => {
  const { id } = req.params;
  const updated = await ScoreDescriptor.updateScoreDescriptor(id, req.body);
  return res.json(updated);
};

export const deleteScoreDescriptor = async (req, res) => {
  const { id } = req.params;
  const result = await ScoreDescriptor.deleteScoreDescriptor(id);
  return res.json({ message: "Score descriptor deleted", result });
};
