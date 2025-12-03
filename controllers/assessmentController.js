import * as Assessment from "../handlers/assessmentHandlers.js";

export const createAssessment = async (req, res) => {
  const data = req.body;
  const assessment = await Assessment.createAssessment(data);
  return res.status(201).json(assessment);
};

export const getAssessments = async (req, res) => {
  const assessments = await Assessment.getAllAssessments();
  return res.json(assessments);
};

export const getAssessmentById = async (req, res) => {
  const { id } = req.params;
  const assessment = await Assessment.getAssessmentById(id);
  return res.json(assessment);
};

export const updateAssessment = async (req, res) => {
  const { id } = req.params;
  const updated = await Assessment.updateAssessment(id, req.body);
  return res.json(updated);
};

export const deleteAssessment = async (req, res) => {
  const { id } = req.params;
  const result = await Assessment.deleteAssessment(id);
  return res.json({ message: "Assessment deleted", result });
};
