import * as GeneratedReportHandlers from "../handlers/generatedReportHandlers.js";

export const createGeneratedReport = async (req, res) => {
  const data = req.body;
  const report = await GeneratedReportHandlers.createGeneratedReport(data);
  return res.status(201).json(report);
};

export const getGeneratedReports = async (req, res) => {
  const reports = await GeneratedReportHandlers.getAllGeneratedReports();
  return res.json(reports);
};

export const getGeneratedReportById = async (req, res) => {
  const { id } = req.params;
  const report = await GeneratedReportHandlers.getGeneratedReportById(id);
  return res.json(report);
};

export const updateGeneratedReport = async (req, res) => {
  const { id } = req.params;
  const updated = await GeneratedReportHandlers.updateGeneratedReport(
    id,
    req.body
  );
  return res.json(updated);
};

export const deleteGeneratedReport = async (req, res) => {
  const { id } = req.params;
  const result = await GeneratedReportHandlers.deleteGeneratedReport(id);
  return res.json({ message: "Generated report deleted", result });
};
