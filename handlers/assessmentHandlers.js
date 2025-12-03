import models from "../models/index.js";

export const createAssessment = async (data) => {
  const { client_first_name, client_last_name } = data;

  if (!client_first_name || !client_last_name) {
    throw new Error("Client first and last name are required");
  }

  return await models.Assessment.create(data);
};

export const getAllAssessments = async () => {
  return await models.Assessment.findAll();
};

export const getAssessmentById = async (id) => {
  const assessment = await models.Assessment.findByPk(id);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  return assessment;
};

export const updateAssessment = async (id, data) => {
  const assessment = await models.Assessment.findByPk(id);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  return await assessment.update(data);
};

export const deleteAssessment = async (id) => {
  const assessment = await models.Assessment.findByPk(id);

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  await assessment.destroy();
  return true;
};
