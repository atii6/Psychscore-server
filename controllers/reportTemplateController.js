import * as ReportTemplateHandlers from "../handlers/reportTemplateHandlers.js";

export const createReportTemplate = async (req, res) => {
  const data = req.body;
  const report = await ReportTemplateHandlers.createReportTemplate(data);
  return res.status(201).json(report);
};

export const getReportTemplate = async (req, res) => {
  const reports = await ReportTemplateHandlers.getAllReportTemplates();
  return res.json(reports);
};

export const getReportTemplateById = async (req, res) => {
  const { id } = req.params;
  const report = await ReportTemplateHandlers.getReportTemplateById(id);
  return res.json(report);
};

export const updateReportTemplate = async (req, res) => {
  const { id } = req.params;
  const updated = await ReportTemplateHandlers.updateReportTemplate(
    id,
    req.body
  );
  return res.json(updated);
};

export const deleteReportTemplate = async (req, res) => {
  const { id } = req.params;
  const result = await ReportTemplateHandlers.deleteReportTemplate(id);
  return res.json({ message: "Report Tempalate deleted", result });
};
