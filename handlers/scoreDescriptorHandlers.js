import models from "../models/index.js";

export const createScoreDescriptor = async (data) => {
  const { test_name, score_type, min_score, max_score, descriptor } = data;

  const isMissingRequiredFields =
    !test_name || !score_type || !min_score || !max_score || !descriptor;

  if (isMissingRequiredFields) {
    throw new Error("Some required fields are missing");
  }

  return await models.ScoreDescriptor.create(data);
};

export const getAllScoreDescriptors = async () => {
  return await models.ScoreDescriptor.findAll();
};

export const getScoreDescriptorById = async (id) => {
  const scoreDescriptor = await models.ScoreDescriptor.findByPk(id);

  if (!scoreDescriptor) {
    throw new Error("Score descriptor not found");
  }

  return scoreDescriptor;
};

export const updateScoreDescriptor = async (id, data) => {
  const scoreDescriptor = await models.ScoreDescriptor.findByPk(id);

  if (!scoreDescriptor) {
    throw new Error("Score descriptor not found");
  }

  return await scoreDescriptor.update(data);
};

export const deleteScoreDescriptor = async (id) => {
  const scoreDescriptor = await models.ScoreDescriptor.findByPk(id);

  if (!scoreDescriptor) {
    throw new Error("Score descriptor not found");
  }

  await scoreDescriptor.destroy();
  return true;
};
