import * as TestSubtestDefinition from "../handlers/testSubtestDefinitionHandlers.js";

export const createTestSubtestDefinition = async (req, res) => {
  const data = req.body;
  const testDefinition =
    await TestSubtestDefinition.createTestSubtestDefinition(data);
  return res.status(201).json(testDefinition);
};

export const getAllTestSubtestDefinitions = async (req, res) => {
  const testDefinitions =
    await TestSubtestDefinition.getAllTestSubtestDefinitions();
  return res.json(testDefinitions);
};

export const getTestSubtestDefinitionById = async (req, res) => {
  const { id } = req.params;
  const testDefinition =
    await TestSubtestDefinition.getTestSubtestDefinitionById(id);
  return res.json(testDefinition);
};

export const updateTestSubtestDefinition = async (req, res) => {
  const { id } = req.params;
  const updated = await TestSubtestDefinition.updateTestSubtestDefinition(
    id,
    req.body
  );
  return res.json(updated);
};

export const deleteTestSubtestDefinition = async (req, res) => {
  const { id } = req.params;
  const result = await TestSubtestDefinition.deleteTestSubtestDefinition(id);
  return res.json({ message: "Test definition deleted", result });
};
