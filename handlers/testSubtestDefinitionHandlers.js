import models from "../models/index.js";

export const createTestSubtestDefinition = async (data) => {
  const { test_name } = data;
  if (!test_name) {
    throw new Error("Test name is missing");
  }

  return await models.TestSubtestDefinition.create(data);
};

export const getAllTestSubtestDefinitions = async () => {
  return await models.TestSubtestDefinition.findAll();
};

export const getTestSubtestDefinitionById = async (id) => {
  const testDefinition = await models.TestSubtestDefinition.findByPk(id);

  if (!testDefinition) {
    throw new Error("Test definition not found");
  }

  return testDefinition;
};

export const updateTestSubtestDefinition = async (id, data) => {
  const testDefinition = await models.TestSubtestDefinition.findByPk(id);

  if (!testDefinition) {
    throw new Error("Test definition not found");
  }

  return await testDefinition.update(data);
};

export const deleteTestSubtestDefinition = async (id) => {
  const testDefinition = await models.TestSubtestDefinition.findByPk(id);

  if (!testDefinition) {
    throw new Error("Test definition not found");
  }

  await testDefinition.destroy();
  return true;
};
