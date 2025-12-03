import models from "../models/index.js";

export const createUserScoreDescriptor = async (data) => {
  const { score_type, min_score, max_score, descriptor } = data;

  const isMissingRequiredFields =
    !score_type || !min_score || !max_score || !descriptor;

  if (isMissingRequiredFields) {
    throw new Error("Some required fields are missing");
  }

  return await models.UserScoreDescriptor.create(data);
};

export const getAllUserScoreDescriptors = async () => {
  return await models.UserScoreDescriptor.findAll();
};

export const getUserScoreDescriptorById = async (id) => {
  const descriptor = await models.UserScoreDescriptor.findByPk(id);

  if (!descriptor) {
    throw new Error("User score descriptor not found");
  }

  return descriptor;
};

export const updateUserScoreDescriptor = async (id, data) => {
  const descriptor = await models.UserScoreDescriptor.findByPk(id);

  if (!descriptor) {
    throw new Error("User score descriptor not found");
  }

  return await descriptor.update(data);
};

export const deleteUserScoreDescriptor = async (id) => {
  const descriptor = await models.UserScoreDescriptor.findByPk(id);

  if (!descriptor) {
    throw new Error("User score descriptor not found");
  }

  await descriptor.destroy();
  return true;
};
